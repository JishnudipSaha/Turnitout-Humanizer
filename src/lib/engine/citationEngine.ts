import { CitationItem } from '../types';
import { CITATION_DATABASE } from './rules';

export interface CitationResult {
  annotatedText: string;
  citations: CitationItem[];
  bibtexBundle: string;
}

export function generateCitations(
  text: string, 
  discipline: string = 'computer_science', 
  format: 'ieee' | 'apa' | 'latex' = 'ieee',
  maxCitations: number = 3
): CitationResult {
  const pool = CITATION_DATABASE[discipline] || CITATION_DATABASE.computer_science;
  const sentences = text.split(/(?<=[.?!])\s+/);
  const citations: CitationItem[] = [];

  let count = 0;
  const annotatedSentences = sentences.map((sentence, idx) => {
    // Add citation on every 2nd or 3rd sentence up to maxCitations
    if (idx > 0 && idx % 2 === 0 && count < maxCitations && sentence.length > 30) {
      const cite = pool[count % pool.length];
      count++;
      const key = `${cite.author.split(' ')[0].toLowerCase()}${cite.year}`;
      const inlineMarker = format === 'ieee' 
        ? ` [${count}]` 
        : format === 'apa' 
        ? ` (${cite.author}, ${cite.year})` 
        : ` \\cite{${key}}`;

      const bibEntry = `@article{${key},
  author    = {${cite.author}},
  title     = {${cite.title}},
  journal   = {${cite.journal}},
  year      = {${cite.year}},
  doi       = {${cite.doi}}
}`;

      citations.push({
        key,
        discipline,
        inlineMarker,
        apa: `(${cite.author}, ${cite.year})`,
        ieee: `[${count}]`,
        bibtex: bibEntry
      });

      // Strip period, inject marker, restore period
      if (sentence.endsWith('.')) {
        return sentence.slice(0, -1) + inlineMarker + '.';
      }
      return sentence + inlineMarker;
    }
    return sentence;
  });

  const bibtexHeader = `% Turnitout Academic Citation Bundle
% Generated for Discipline: ${discipline}
% Format: ${format.toUpperCase()}
% Instructions: Copy this into your reference manager or LaTeX .bib file.
`;

  const bibtexBundle = bibtexHeader + '\n' + citations.map(c => c.bibtex).join('\n\n');

  return {
    annotatedText: annotatedSentences.join(' '),
    citations,
    bibtexBundle
  };
}
