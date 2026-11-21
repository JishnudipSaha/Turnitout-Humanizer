/**
 * Linguistic Rules and Dictionaries for Turnitout Deterministic Evasion Engine
 * Zero generative AI - pure deterministic transformations.
 */

// Common LLM Clichés and Tell-Tale Markers
export const CLICHE_REPLACEMENTS: Array<{ pattern: RegExp; replace: string; reason: string }> = [
  { pattern: /\bIn conclusion,?\b/gi, replace: "To wrap up,", reason: "Overused AI conclusion opener" },
  { pattern: /\bIt is important to delve into\b/gi, replace: "we look closely at", reason: "Standard ChatGPT filler" },
  { pattern: /\bdelve deep into\b/gi, replace: "thoroughly examine", reason: "LLM buzzword 'delve'" },
  { pattern: /\bdelve into\b/gi, replace: "explore", reason: "LLM buzzword 'delve'" },
  { pattern: /\bdelving into\b/gi, replace: "examining", reason: "LLM buzzword 'delve'" },
  { pattern: /\bcomprehensive tapestry of\b/gi, replace: "broad spectrum of", reason: "AI metaphor cliché" },
  { pattern: /\brich tapestry of\b/gi, replace: "diverse collection of", reason: "AI metaphor cliché" },
  { pattern: /\btapestry of\b/gi, replace: "mosaic of", reason: "AI metaphor cliché" },
  { pattern: /\bplays a pivotal role in illustrating\b/gi, replace: "clearly shows", reason: "Formulaic passive expansion" },
  { pattern: /\bplays a pivotal role in\b/gi, replace: "is essential for", reason: "Formulaic AI trope" },
  { pattern: /\bplays a pivotal role\b/gi, replace: "is critical", reason: "Formulaic AI trope" },
  { pattern: /\bstands as a testament to\b/gi, replace: "clearly reflects", reason: "Classic Claude/GPT trope" },
  { pattern: /\bserves as a testament to\b/gi, replace: "demonstrates", reason: "Classic Claude/GPT trope" },
  { pattern: /\ba testament to\b/gi, replace: "evidence of", reason: "Classic Claude/GPT trope" },
  { pattern: /\bFurthermore, the interplay between\b/gi, replace: "Also, balancing", reason: "Formulaic compound opener" },
  { pattern: /\bintricate interplay between\b/gi, replace: "direct relationship between", reason: "AI adjective stacking" },
  { pattern: /\bdelicate interplay between\b/gi, replace: "interaction between", reason: "AI adjective stacking" },
  { pattern: /\binterplay between\b/gi, replace: "connection between", reason: "Overused AI noun" },
  { pattern: /\bprovides a robust framework for\b/gi, replace: "gives a solid basis for", reason: "Overused AI corporate speak" },
  { pattern: /\bprovides a robust framework\b/gi, replace: "offers a sound basis", reason: "AI corporate speak" },
  { pattern: /\brobust framework\b/gi, replace: "reliable structure", reason: "Overused technical buzzword" },
  { pattern: /\bMoreover, in today's fast-paced digital era,?\b/gi, replace: "Today,", reason: "Formulaic essay cliché" },
  { pattern: /\bin today's fast-paced world,?\b/gi, replace: "currently,", reason: "Formulaic introductory trope" },
  { pattern: /\bin today's digital landscape,?\b/gi, replace: "in contemporary environments,", reason: "Corporate AI cliché" },
  { pattern: /\bserves as a critical milestone in\b/gi, replace: "marks a key turning point in", reason: "Dramatic AI inflation" },
  { pattern: /\bcannot be overlooked\b/gi, replace: "demands direct attention", reason: "Passive evasion trope" },
  { pattern: /\bcannot be overstated\b/gi, replace: "is vital", reason: "Hyperbolic AI emphasis" },
  { pattern: /\bdelve deep into the multifaceted dimensions of\b/gi, replace: "closely inspect the details of", reason: "Complex AI padding" },
  { pattern: /\bmultifaceted dimensions of\b/gi, replace: "various aspects of", reason: "AI padding phrase" },
  { pattern: /\bmultifaceted nature of\b/gi, replace: "complexity of", reason: "AI padding phrase" },
  { pattern: /\bmultifaceted\b/gi, replace: "varied", reason: "Overused AI adjective" },
  { pattern: /\bUltimately, this paradigm shift\b/gi, replace: "In the end, this change", reason: "Dramatic AI cliché" },
  { pattern: /\bparadigm shift\b/gi, replace: "structural transition", reason: "Overused buzzword" },
  { pattern: /\bbeacon of hope\b/gi, replace: "promising signal", reason: "Poetic AI flourish" },
  { pattern: /\bIt is worth noting that\b/gi, replace: "Notably,", reason: "Wordy AI padding" },
  { pattern: /\bIt should be noted that\b/gi, replace: "Specifically,", reason: "Wordy AI padding" },
  { pattern: /\bIt is imperative to understand that\b/gi, replace: "We must realize that", reason: "High-handed AI opener" },
  { pattern: /\bIn summary, it can be argued that\b/gi, replace: "Overall, the data suggests", reason: "Hedged academic passive" },
  { pattern: /\bAt the end of the day,?\b/gi, replace: "Ultimately,", reason: "Conversational cliché" },
  { pattern: /\bby leaps and bounds\b/gi, replace: "rapidly", reason: "Idiomatic padding" },
  { pattern: /\bnavigating the complexities of\b/gi, replace: "handling", reason: "Corporate/AI metaphor" },
  { pattern: /\bunlocking the potential of\b/gi, replace: "leveraging", reason: "Marketing AI cliché" },
  { pattern: /\bharnessing the power of\b/gi, replace: "using", reason: "Marketing AI cliché" },
  { pattern: /\ba plethora of\b/gi, replace: "numerous", reason: "Pretentious AI vocabulary" },
  { pattern: /\bmyriad of\b/gi, replace: "wide variety of", reason: "Formulaic AI vocabulary" },
  { pattern: /\bconsequently\b/gi, replace: "as a result", reason: "Lexical rotation" },
  { pattern: /\bnotwithstanding\b/gi, replace: "despite", reason: "Archaic academic padding" }
];

// PDTB 2.0 Discourse Connective Alternates
export const DISCOURSE_ROTATIONS: Record<string, string[]> = {
  "furthermore": ["in addition", "alongside this", "additionally", "what is more", "also"],
  "moreover": ["concurrently", "equally important", "on top of that", "further"],
  "consequently": ["as a direct consequence", "therefore", "thus", "accordingly"],
  "nevertheless": ["even so", "still", "yet", "all the same", "regardless"],
  "however": ["on the other hand", "conversely", "that being said", "yet"],
  "subsequently": ["afterward", "following this", "later on"],
  "specifically": ["in particular", "more precisely", "to illustrate"],
  "indeed": ["in fact", "certainly", "truly", "as observed"]
};

// Style-specific Register Adjustments
export const REGISTER_VOCABULARY: Record<string, Array<{ pattern: RegExp; replace: string }>> = {
  academic: [
    { pattern: /\ba lot of\b/gi, replace: "substantial volumes of" },
    { pattern: /\bshows\b/gi, replace: "demonstrates" },
    { pattern: /\bproves\b/gi, replace: "provides strong empirical support for" },
    { pattern: /\bbig\b/gi, replace: "significant" },
    { pattern: /\bgood\b/gi, replace: "beneficial" }
  ],
  executive: [
    { pattern: /\bIn conclusion\b/gi, replace: "Executive Summary:" },
    { pattern: /\bwe believe that\b/gi, replace: "The projected outcome indicates that" },
    { pattern: /\bdo our best\b/gi, replace: "optimize strategic execution" },
    { pattern: /\btry to\b/gi, replace: "aim to" }
  ],
  casual: [
    { pattern: /\bIn conclusion,?\b/gi, replace: "To sum it all up," },
    { pattern: /\bFurthermore,?\b/gi, replace: "Plus," },
    { pattern: /\bMoreover,?\b/gi, replace: "On top of that," },
    { pattern: /\bConsequently,?\b/gi, replace: "So basically," },
    { pattern: /\bdemonstrates\b/gi, replace: "shows" },
    { pattern: /\bsignificant\b/gi, replace: "big" }
  ],
  technical: [
    { pattern: /\bfast\b/gi, replace: "low-latency" },
    { pattern: /\bslow\b/gi, replace: "compute-bound" },
    { pattern: /\bworks with\b/gi, replace: "interfaces seamlessly with" },
    { pattern: /\bsetup\b/gi, replace: "provision" }
  ]
};

// Contractions Dictionary
export const CONTRACTIONS_EXPAND: Record<string, string> = {
  "don't": "do not",
  "doesn't": "does not",
  "didn't": "did not",
  "can't": "cannot",
  "won't": "will not",
  "isn't": "is not",
  "aren't": "are not",
  "wasn't": "was not",
  "weren't": "were not",
  "haven't": "have not",
  "hasn't": "has not",
  "hadn't": "had not",
  "it's": "it is",
  "they're": "they are",
  "we're": "we are",
  "you're": "you are"
};

// Developer Personas for Code Comment Humanizing
export const CODE_PERSONAS: Record<string, Array<{ find: RegExp; replace: string }>> = {
  beginner: [
    { find: /\binitializes\b/gi, replace: "sets up" },
    { find: /\binstantiates\b/gi, replace: "creates new" },
    { find: /\bvalidates\b/gi, replace: "checks" },
    { find: /\bterminates\b/gi, replace: "stops" },
    { find: /\bcomputes\b/gi, replace: "calculates" },
    { find: /\bretrieves\b/gi, replace: "gets" }
  ],
  intermediate: [
    { find: /\bsets up\b/gi, replace: "initializes" },
    { find: /\bchecks if\b/gi, replace: "validates whether" },
    { find: /\bgets\b/gi, replace: "fetches" },
    { find: /\bstops\b/gi, replace: "exits cleanly on" }
  ],
  senior: [
    { find: /\bsets up\b/gi, replace: "provisions invariant state for" },
    { find: /\bchecks\b/gi, replace: "enforces boundary constraint on" },
    { find: /\bcalculates\b/gi, replace: "evaluates heuristic for" },
    { find: /\bgets data\b/gi, replace: "hydrates memory buffer from" },
    { find: /\bloops through\b/gi, replace: "executes sequential traversal over" }
  ]
};

// Discipline Citation Taxonomy
export const CITATION_DATABASE: Record<string, Array<{ author: string; year: number; title: string; journal: string; doi: string }>> = {
  computer_science: [
    { author: "Vaswani et al.", year: 2017, title: "Attention Is All You Need", journal: "Advances in Neural Information Processing Systems (NeurIPS)", doi: "10.48550/arXiv.1706.03762" },
    { author: "Devlin et al.", year: 2018, title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding", journal: "NAACL-HLT", doi: "10.18653/v1/N19-1423" },
    { author: "He et al.", year: 2016, title: "Deep Residual Learning for Image Recognition", journal: "IEEE Conference on Computer Vision and Pattern Recognition (CVPR)", doi: "10.1109/CVPR.2016.90" }
  ],
  engineering_physics: [
    { author: "Shannon, C. E.", year: 1948, title: "A Mathematical Theory of Communication", journal: "The Bell System Technical Journal", doi: "10.1002/j.1538-7305.1948.tb01338.x" },
    { author: "Feynman et al.", year: 1965, title: "The Feynman Lectures on Physics", journal: "Addison-Wesley", doi: "10.1063/1.3051743" }
  ],
  mathematics_statistics: [
    { author: "Hastings, W. K.", year: 1970, title: "Monte Carlo sampling methods using Markov chains and their applications", journal: "Biometrika", doi: "10.1093/biomet/57.1.97" },
    { author: "Dempster et al.", year: 1977, title: "Maximum Likelihood from Incomplete Data via the EM Algorithm", journal: "Journal of the Royal Statistical Society", doi: "10.1111/j.2517-6161.1977.tb01600.x" }
  ],
  quantitative_finance: [
    { author: "Black, F. & Scholes, M.", year: 1973, title: "The Pricing of Options and Corporate Liabilities", journal: "Journal of Political Economy", doi: "10.1086/260062" },
    { author: "Markowitz, H.", year: 1952, title: "Portfolio Selection", journal: "The Journal of Finance", doi: "10.1111/j.1540-6261.1952.tb01525.x" }
  ],
  medical_life_sciences: [
    { author: "Doudna, J. A. & Charpentier, E.", year: 2014, title: "The new frontier of genome engineering with CRISPR-Cas9", journal: "Science", doi: "10.1126/science.1258096" },
    { author: "Venter et al.", year: 2001, title: "The Sequence of the Human Genome", journal: "Science", doi: "10.1126/science.1058040" }
  ]
};
