'use client';

import React, { useState } from 'react';
import { BookOpen, Copy, Check, Download, Sparkles, Layers } from 'lucide-react';
import { generateCitations, CitationResult } from '@/lib/engine/citationEngine';

const SAMPLE_TEXT = `Recent advancements in deep learning have significantly transformed automated document processing and linguistic modeling. Stochastic gradient descent enables stable convergence across high-dimensional parameter spaces. Furthermore, empirical evaluations confirm that attention mechanisms enhance cross-lingual generalization. Consequently, rigorous architectural baselines remain crucial for reproducible scientific inquiry.`;

export const CitationTab: React.FC = () => {
  const [text, setText] = useState(SAMPLE_TEXT);
  const [discipline, setDiscipline] = useState('computer_science');
  const [format, setFormat] = useState<'ieee' | 'apa' | 'latex'>('ieee');
  const [maxCitations, setMaxCitations] = useState(3);
  const [result, setResult] = useState<CitationResult | null>(null);
  const [copiedText, setCopiedText] = useState(false);
  const [copiedBib, setCopiedBib] = useState(false);

  const handleGenerate = () => {
    if (!text.trim()) return;
    const res = generateCitations(text, discipline, format, maxCitations);
    setResult(res);
  };

  const handleCopyText = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.annotatedText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleCopyBib = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.bibtexBundle);
    setCopiedBib(true);
    setTimeout(() => setCopiedBib(false), 2000);
  };

  const handleDownloadBib = () => {
    if (!result) return;
    const blob = new Blob([result.bibtexBundle], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `citations_${discipline}_${Date.now()}.bib`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="gold-card rounded-2xl p-6">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-obsidian-800">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-gold-400" />
            <div>
              <h3 className="text-base font-bold text-white">
                Decoupled Citation & BibTeX Generator
              </h3>
              <p className="text-xs text-obsidian-400">
                Injects contextual academic citations and generates matching LaTeX/BibTeX packages.
              </p>
            </div>
          </div>

          {/* Discipline & Format Selectors */}
          <div className="flex flex-wrap items-center gap-3">
            <div>
              <label className="block text-[10px] text-obsidian-400 mb-1">Academic Discipline:</label>
              <select
                value={discipline}
                onChange={(e) => setDiscipline(e.target.value)}
                className="bg-obsidian-950 border border-gold-border/30 rounded-lg px-3 py-1.5 text-xs text-gold-200 focus:outline-none"
              >
                <option value="computer_science">Computer Science & AI</option>
                <option value="engineering_physics">Engineering & Physics</option>
                <option value="mathematics_statistics">Mathematics & Statistics</option>
                <option value="quantitative_finance">Quantitative Finance</option>
                <option value="medical_life_sciences">Medical & Life Sciences</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-obsidian-400 mb-1">Citation Style:</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as any)}
                className="bg-obsidian-950 border border-gold-border/30 rounded-lg px-3 py-1.5 text-xs text-gold-200 focus:outline-none"
              >
                <option value="ieee">IEEE Numeric [1]</option>
                <option value="apa">APA Author-Date (Author, Year)</option>
                <option value="latex">LaTeX \cite&#123;key&#125;</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-obsidian-400 mb-1">Max Citations:</label>
              <input
                type="number"
                min="1"
                max="5"
                value={maxCitations}
                onChange={(e) => setMaxCitations(Number(e.target.value))}
                className="w-16 bg-obsidian-950 border border-gold-border/30 rounded-lg px-2.5 py-1 text-xs text-gold-200 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-gold-300 mb-2">
            Target Manuscript Passage:
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            className="w-full bg-obsidian-950/90 border border-gold-border/30 focus:border-gold-400/80 rounded-xl p-4 text-xs font-mono text-obsidian-200 focus:outline-none leading-relaxed"
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={handleGenerate}
              className="gold-btn py-2 px-5 text-xs flex items-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-obsidian-950" />
              <span>Inject Citations & Compile BibTeX</span>
            </button>
          </div>
        </div>

        {/* Results View */}
        {result && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-obsidian-800">
            
            {/* Annotated Text */}
            <div>
              <div className="flex items-center justify-between text-xs text-obsidian-300 mb-2">
                <span className="font-semibold text-gold-200">Text With Injected Citations</span>
                <button
                  onClick={handleCopyText}
                  className="flex items-center space-x-1 text-gold-400 hover:text-gold-200 text-xs"
                >
                  {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedText ? 'Copied' : 'Copy Text'}</span>
                </button>
              </div>
              <div className="p-4 rounded-xl bg-obsidian-950/90 border border-gold-border/20 text-xs text-obsidian-100 leading-relaxed font-sans">
                {result.annotatedText}
              </div>
            </div>

            {/* Generated BibTeX */}
            <div>
              <div className="flex items-center justify-between text-xs text-obsidian-300 mb-2">
                <span className="font-semibold text-gold-200">Companion citations.bib Package</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCopyBib}
                    className="flex items-center space-x-1 text-gold-400 hover:text-gold-200 text-xs"
                  >
                    {copiedBib ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedBib ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={handleDownloadBib}
                    className="flex items-center space-x-1 text-gold-400 hover:text-gold-200 text-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .bib</span>
                  </button>
                </div>
              </div>
              <pre className="p-4 rounded-xl bg-obsidian-950/90 border border-gold-border/20 text-xs text-gold-200 font-mono overflow-auto max-h-56 leading-relaxed">
                {result.bibtexBundle}
              </pre>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
