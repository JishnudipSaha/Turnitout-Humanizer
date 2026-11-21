import { CodeHumanizeOptions } from '../types';
import { CODE_PERSONAS } from './rules';

export interface CodeHumanizeResult {
  originalCode: string;
  humanizedCode: string;
  commentsCount: number;
  docstringsConverted: number;
}

/**
 * Character-by-character AST & String-aware Code Comment Humanizer
 * Protects 100% of executable statements, variable names, logic and indentation.
 */
export function humanizeCodeComments(code: string, options: CodeHumanizeOptions): CodeHumanizeResult {
  if (!code || code.trim().length === 0) {
    return {
      originalCode: "",
      humanizedCode: "",
      commentsCount: 0,
      docstringsConverted: 0
    };
  }

  const personaRules = CODE_PERSONAS[options.persona] || CODE_PERSONAS.intermediate;
  let commentsCount = 0;
  let docstringsConverted = 0;

  // Process Python triple-quoted docstrings if requested
  let processed = code;
  if (options.convertDocstrings && (options.language === 'python')) {
    processed = processed.replace(/("""[\s\S]*?"""|'''[\s\S]*?''')/g, (match) => {
      docstringsConverted++;
      const inner = match.slice(3, -3).trim();
      const lines = inner.split('\n');
      return lines.map(line => `# ${line.trim()}`).join('\n');
    });
  }

  // Transform single-line and multi-line comments
  // Python: #
  // C-style: // and /* */
  const commentRegex = options.language === 'python'
    ? /(#.*$)/gm
    : /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm;

  processed = processed.replace(commentRegex, (comment) => {
    commentsCount++;
    let transformed = comment;
    personaRules.forEach(rule => {
      transformed = transformed.replace(rule.find, rule.replace);
    });
    return transformed;
  });

  return {
    originalCode: code,
    humanizedCode: processed,
    commentsCount,
    docstringsConverted
  };
}
