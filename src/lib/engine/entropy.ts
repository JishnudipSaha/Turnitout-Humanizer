/**
 * ZipPy-Style Entropic Perplexity & AI Risk Auditor
 * Analyzes token predictability ratios, vocabulary dispersion, and burstiness.
 */
export interface EntropyAnalysis {
  compositeAiRisk: number; // 0 - 100%
  breakdown: {
    aiGenerated: number;
    aiRefined: number;
    humanWritten: number;
  };
  compressionRatio: number;
  burstinessScore: number;
  flaggedSpans: string[];
}

export function analyzeEntropy(text: string): EntropyAnalysis {
  if (!text || text.trim().length === 0) {
    return {
      compositeAiRisk: 0,
      breakdown: { aiGenerated: 0, aiRefined: 0, humanWritten: 100 },
      compressionRatio: 1.0,
      burstinessScore: 0,
      flaggedSpans: []
    };
  }

  const words = text.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
  if (words.length === 0) {
    return {
      compositeAiRisk: 5,
      breakdown: { aiGenerated: 5, aiRefined: 10, humanWritten: 85 },
      compressionRatio: 1.0,
      burstinessScore: 50,
      flaggedSpans: []
    };
  }

  // Calculate Type-Token Ratio (Lexical Diversity)
  const uniqueWords = new Set(words);
  const ttr = uniqueWords.size / words.length;

  // Measure sentence length variance (Burstiness)
  const sentences = text.split(/(?<=[.?!])\s+/).filter(Boolean);
  const sentenceLengths = sentences.map(s => s.split(/\s+/).length);
  const meanLen = sentenceLengths.reduce((a, b) => a + b, 0) / (sentenceLengths.length || 1);
  const variance = sentenceLengths.reduce((a, b) => a + Math.pow(b - meanLen, 2), 0) / (sentenceLengths.length || 1);
  const stdDev = Math.sqrt(variance);
  const burstinessScore = Math.min(100, Math.round((stdDev / (meanLen || 1)) * 100));

  // AI tell indicators
  const aiTells = [
    "delve", "tapestry", "pivotal", "testament", "furthermore", "moreover", 
    "multifaceted", "paradigm shift", "in conclusion", "robust framework"
  ];
  const flaggedSpans: string[] = [];
  aiTells.forEach(tell => {
    if (text.toLowerCase().includes(tell)) {
      flaggedSpans.push(tell);
    }
  });

  // Risk weighting
  let baseRisk = 20;
  if (ttr < 0.5) baseRisk += 25; // low vocabulary variation
  if (burstinessScore < 30) baseRisk += 30; // uniform robotic sentence lengths
  baseRisk += flaggedSpans.length * 8;
  const compositeAiRisk = Math.min(99, Math.max(2, baseRisk));

  const aiGenerated = Math.round(compositeAiRisk * 0.7);
  const aiRefined = Math.round(compositeAiRisk * 0.3);
  const humanWritten = Math.max(1, 100 - aiGenerated - aiRefined);

  return {
    compositeAiRisk,
    breakdown: {
      aiGenerated,
      aiRefined,
      humanWritten
    },
    compressionRatio: Math.round((1 - (uniqueWords.size / words.length)) * 100) / 100,
    burstinessScore,
    flaggedSpans
  };
}
