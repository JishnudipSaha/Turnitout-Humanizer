import { NextRequest, NextResponse } from 'next/server';
import { humanizeText } from '@/lib/engine/humanizer';
import { HumanizeOptions } from '@/lib/types';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, options } = body;

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Invalid payload. "text" string is required.' },
        { status: 400 }
      );
    }

    const defaultOptions: HumanizeOptions = {
      intensity: 75,
      style: 'academic',
      protectedTerms: [],
      enableDiscourseRotation: true,
      enableNgramBreak: true,
      enableVoiceTransform: true,
      enableClicheScrub: true,
      enableContractionSwap: true,
      enableUnicodePurge: true,
      enableClauseReorder: true,
      ...options
    };

    const result = humanizeText(text, defaultOptions);

    return NextResponse.json({
      success: true,
      data: result,
      meta: {
        engine: 'Turnitout Vercel Engine v2.9',
        runtime: 'Vercel Serverless (Node.js)',
        author: 'Jishnudip Saha',
        guarantee: '100% Deterministic, Zero-Generative-AI, Zero-Retention'
      }
    });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal humanization processing error.' },
      { status: 500 }
    );
  }
}
