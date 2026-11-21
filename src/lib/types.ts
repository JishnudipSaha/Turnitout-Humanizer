export type RegisterStyle = 'academic' | 'executive' | 'casual' | 'technical';

export interface HumanizeOptions {
  intensity: number; // 0 to 100
  style: RegisterStyle;
  protectedTerms: string[];
  enableDiscourseRotation: boolean;
  enableNgramBreak: boolean;
  enableVoiceTransform: boolean;
  enableClicheScrub: boolean;
  enableContractionSwap: boolean;
  enableUnicodePurge: boolean;
  enableClauseReorder: boolean;
}

export interface ReplacementDiff {
  original: string;
  replacement: string;
  index: number;
  reason: string;
}

export interface HumanizeResult {
  originalText: string;
  humanizedText: string;
  diffs: ReplacementDiff[];
  stats: {
    wordsOriginal: number;
    wordsHumanized: number;
    replacementsCount: number;
    originalAiScore: number;
    humanizedAiScore: number;
    perplexityDelta: number;
    executionTimeMs: number;
  };
}

export interface CodeHumanizeOptions {
  language: 'python' | 'javascript' | 'typescript' | 'cpp' | 'java' | 'go' | 'rust';
  persona: 'beginner' | 'intermediate' | 'senior';
  convertDocstrings: boolean;
}

export interface CitationItem {
  key: string;
  discipline: string;
  inlineMarker: string;
  apa: string;
  ieee: string;
  bibtex: string;
}
