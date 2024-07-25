import { NextResponse } from 'next/server';
import { getSheetData } from '../../lib/sheets';

export async function GET() {
  try {
    const data = await getSheetData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in getSheetData API route:', error);
    return NextResponse.json({ error: 'Failed to fetch sheet data', details: error.message }, { status: 500 });
  }
}