import { NextRequest, NextResponse } from 'next/server';
import { generateCitations } from '@/lib/engine/citationEngine';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, discipline, format, maxCitations } = body;

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Invalid payload. "text" string is required.' },
        { status: 400 }
      );
    }

    const result = generateCitations(
      text,
      discipline || 'computer_science',
      format || 'ieee',
      maxCitations || 3
    );

    return NextResponse.json({
      success: true,
      data: result,
      meta: {
        engine: 'Turnitout Citation Engine',
        author: 'Jishnudip Saha'
      }
    });
  } catch (error: any) {
    console.error('Citation API Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal citation generation error.' },
      { status: 500 }
    );
  }
}
