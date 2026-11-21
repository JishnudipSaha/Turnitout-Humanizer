'use client';

import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, Activity, Search, AlertTriangle, Cpu } from 'lucide-react';
import { analyzeEntropy, EntropyAnalysis } from '@/lib/engine/entropy';

const SAMPLE_SUSPECT = `In conclusion, it is important to delve into the comprehensive tapestry of modern neural networks. This study plays a pivotal role in illustrating that artificial intelligence stands as a testament to human innovation. Furthermore, the interplay between stochastic optimization and computational scalability provides a robust framework for subsequent empirical inquiries.`;

export const CheckerTab: React.FC = () => {
  const [text, setText] = useState(SAMPLE_SUSPECT);
  const [analysis, setAnalysis] = useState<EntropyAnalysis | null>(null);

  const handleAudit = () => {
    if (!text.trim()) return;
    const res = analyzeEntropy(text);
    setAnalysis(res);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="gold-card rounded-2xl p-6">
        
        {/* Header */}
        <div className="flex items-center space-x-2 mb-4 pb-3 border-b border-obsidian-800">
          <Activity className="w-5 h-5 text-gold-400" />
          <div>
            <h3 className="text-base font-bold text-white">
              ZipPy Entropic Perplexity & AI Risk Auditor
            </h3>
            <p className="text-xs text-obsidian-400">
              Evaluates token compression ratios and sentence burstiness without sending data to external APIs.
            </p>
          </div>
        </div>

        {/* Input */}
        <div className="space-y-3">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            placeholder="Paste text here to inspect for statistical AI footprints..."
            className="w-full bg-obsidian-950/90 border border-gold-border/30 focus:border-gold-400/80 rounded-xl p-4 text-xs font-mono text-obsidian-200 focus:outline-none leading-relaxed"
          />
          <div className="flex justify-end">
            <button
              onClick={handleAudit}
              className="gold-btn py-2 px-6 text-xs flex items-center space-x-2"
            >
              <Search className="w-3.5 h-3.5 text-obsidian-950" />
              <span>Audit AI Footprints & Entropy</span>
            </button>
          </div>
        </div>

        {/* Audit Report Dashboard */}
        {analysis && (
          <div className="mt-6 pt-5 border-t border-obsidian-800 space-y-5">
            
            {/* Top Score Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Overall Risk Card */}
              <div className="p-4 rounded-xl bg-obsidian-950/90 border border-gold-border/30 flex items-center space-x-4">
                <div className={`p-3 rounded-full ${analysis.compositeAiRisk > 50 ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                  {analysis.compositeAiRisk > 50 ? <ShieldAlert className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
                </div>
                <div>
                  <span className="text-[11px] text-obsidian-400 block">Composite Detection Risk</span>
                  <span className={`text-2xl font-bold font-mono ${analysis.compositeAiRisk > 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {analysis.compositeAiRisk}%
                  </span>
                  <span className="text-[10px] text-obsidian-500 block">
                    {analysis.compositeAiRisk > 50 ? 'High probability of detector flag' : 'Safe / Passes Winnowing'}
                  </span>
                </div>
              </div>

              {/* Compression Ratio Card */}
              <div className="p-4 rounded-xl bg-obsidian-950/90 border border-gold-border/30 flex items-center space-x-4">
                <div className="p-3 rounded-full bg-gold-500/10 text-gold-400">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] text-obsidian-400 block">Lexical Redundancy</span>
                  <span className="text-2xl font-bold font-mono text-gold-300">
                    {analysis.compressionRatio}
                  </span>
                  <span className="text-[10px] text-obsidian-500 block">
                    Lower indicates higher human perplexity
                  </span>
                </div>
              </div>

              {/* Burstiness Score Card */}
              <div className="p-4 rounded-xl bg-obsidian-950/90 border border-gold-border/30 flex items-center space-x-4">
                <div className="p-3 rounded-full bg-gold-500/10 text-gold-400">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] text-obsidian-400 block">Sentence Burstiness</span>
                  <span className="text-2xl font-bold font-mono text-gold-300">
                    {analysis.burstinessScore}/100
                  </span>
                  <span className="text-[10px] text-obsidian-500 block">
                    Higher variance evades Turnitin
                  </span>
                </div>
              </div>

            </div>

            {/* Trilateral Split Bar */}
            <div className="p-4 rounded-xl bg-obsidian-950/90 border border-gold-border/20">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-white">Diagnostic Trilateral Distribution:</span>
                <span className="text-[11px] text-obsidian-400">
                  AI: {analysis.breakdown.aiGenerated}% • Refined: {analysis.breakdown.aiRefined}% • Human: {analysis.breakdown.humanWritten}%
                </span>
              </div>
              <div className="w-full h-3 rounded-full overflow-hidden flex bg-obsidian-800">
                <div className="bg-rose-500 h-full" style={{ width: `${analysis.breakdown.aiGenerated}%` }} title="AI Generated" />
                <div className="bg-amber-400 h-full" style={{ width: `${analysis.breakdown.aiRefined}%` }} title="AI Refined" />
                <div className="bg-emerald-500 h-full" style={{ width: `${analysis.breakdown.humanWritten}%` }} title="Human Written" />
              </div>
            </div>

            {/* Flagged AI Spans */}
            {analysis.flaggedSpans.length > 0 && (
              <div className="p-4 rounded-xl bg-obsidian-950/90 border border-gold-border/20">
                <div className="flex items-center space-x-1.5 text-xs font-semibold text-amber-400 mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Detected High-Probability AI Signatures:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {analysis.flaggedSpans.map((span, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 text-xs rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/30 font-mono"
                    >
                      &quot;{span}&quot;
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
