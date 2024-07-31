import { NextResponse } from 'next/server';
import { getSheetData } from '../../lib/sheets';

export async function GET() {
  try {
    const data = await getSheetData();
    
    // Add cache control headers
    const headers = new Headers();
    headers.append('Cache-Control', 'no-store, max-age=0');
    headers.append('Pragma', 'no-cache');
    headers.append('Expires', '0');
    
    // Log the data for debugging
    console.log('API Data:', JSON.stringify(data));

    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: headers,
    });
  } catch (error) {
    console.error('Error in getSheetData API route:', error);
    return NextResponse.json({ error: 'Failed to fetch sheet data', details: error.message }, { status: 500 });
  }
}