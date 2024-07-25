import Sheets from 'node-sheets';

const SPREADSHEET_ID = '106sgh0eCeWVzH3LQdQcQ_CrMkPautXl51sp3TD1jMUk';
const SHEET_NAME = 'Sheet1';

export async function getSheetData() {
  try {
    console.log('Starting getSheetData function');
    const gs = new Sheets(SPREADSHEET_ID);
    console.log('Sheets instance created');
    const authData = {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    };
    
    console.log('Attempting to authorize JWT');
    await gs.authorizeJWT(authData);
    console.log('JWT authorized successfully');
    
    console.log('Attempting to fetch table data');
    const table = await gs.tables(SHEET_NAME);
    console.log('Table data fetched successfully');
    
    return table.rows.map(row => {
      const formattedRow = {};
      for (const [key, value] of Object.entries(row)) {
        // Check if value is defined before accessing its 'value' property
        formattedRow[key.toLowerCase().replace(/\s+/g, '')] = value?.value || '';
      }
      return formattedRow;
    });
  } catch (error) {
    console.error('Detailed error in getSheetData:', error);
    throw error;
  }
}