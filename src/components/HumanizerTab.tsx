'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  Sliders, 
  FileText, 
  ShieldAlert, 
  ShieldCheck, 
  RotateCcw, 
  Upload, 
  ChevronDown, 
  ChevronUp, 
  Eye, 
  BookOpen 
} from 'lucide-react';
import { HumanizeOptions, HumanizeResult, RegisterStyle } from '@/lib/types';
import { humanizeText } from '@/lib/engine/humanizer';

const SAMPLE_ACADEMIC = `In conclusion, it is important to delve into the comprehensive tapestry of modern neural networks. This study plays a pivotal role in illustrating that artificial intelligence stands as a testament to human innovation. Furthermore, the interplay between stochastic optimization and computational scalability provides a robust framework for subsequent empirical inquiries. Moreover, in today's fast-paced digital era, the profound impact of algorithmic architectures cannot be overlooked.`;

const SAMPLE_ESSAY = `Moreover, in today's fast-paced digital era, navigating the complexities of human-computer interaction serves as a critical milestone in our collective technological journey. Delving deep into the multifaceted dimensions of algorithmic ethics allows us to unlock the potential of unbiased machine cognition. Ultimately, this paradigm shift stands as a testament to our ongoing evolution.`;

export const HumanizerTab: React.FC = () => {
  const [inputText, setInputText] = useState(SAMPLE_ACADEMIC);
  const [intensity, setIntensity] = useState<number>(75);
  const [style, setStyle] = useState<RegisterStyle>('academic');
  const [protectedInput, setProtectedInput] = useState<string>('ResNet-50, PyTorch, CRISPR');
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'clean' | 'diff'>('diff');
  
  // Advanced Knobs
  const [enableDiscourse, setEnableDiscourse] = useState(true);
  const [enableNgram, setEnableNgram] = useState(true);
  const [enableCliche, setEnableCliche] = useState(true);
  const [enableContraction, setEnableContraction] = useState(true);
  const [enableUnicode, setEnableUnicode] = useState(true);

  // Results State
  const [result, setResult] = useState<HumanizeResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleHumanize = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);

    const protectedTerms = protectedInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const options: HumanizeOptions = {
      intensity,
      style,
      protectedTerms,
      enableDiscourseRotation: enableDiscourse,
      enableNgramBreak: enableNgram,
      enableVoiceTransform: true,
      enableClicheScrub: enableCliche,
      enableContractionSwap: enableContraction,
      enableUnicodePurge: enableUnicode,
      enableClauseReorder: true
    };

    try {
      // Local execution via client engine or call serverless API
      // Using client engine directly provides 0ms latency with optional API parity
      const res = humanizeText(inputText, options);
      setResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.humanizedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([result.humanizedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Turnitout_Humanized_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setInputText(content);
        setResult(null);
      }
    };
    reader.readAsText(file);
  };

  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const charCount = inputText.length;

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Main Dual-Column Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Column 1: Input Document & Configuration */}
        <div className="space-y-4">
          <div className="gold-card rounded-2xl p-5 sm:p-6">
            
            {/* Input Header & Controls */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-gold-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-gold-200">
                  Source AI Document
                </h3>
              </div>

              {/* Sample Buttons & File Upload */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => { setInputText(SAMPLE_ACADEMIC); setResult(null); }}
                  className="px-2.5 py-1 text-xs rounded-md bg-obsidian-850 hover:bg-gold-500/10 text-obsidian-300 hover:text-gold-300 border border-gold-border/20 transition-all"
                  title="Load pre-canned academic sample"
                >
                  Academic Sample
                </button>
                <button
                  onClick={() => { setInputText(SAMPLE_ESSAY); setResult(null); }}
                  className="px-2.5 py-1 text-xs rounded-md bg-obsidian-850 hover:bg-gold-500/10 text-obsidian-300 hover:text-gold-300 border border-gold-border/20 transition-all"
                  title="Load pre-canned essay sample"
                >
                  Essay Sample
                </button>
                <label className="cursor-pointer px-2.5 py-1 text-xs rounded-md bg-gold-500/10 hover:bg-gold-500/20 text-gold-300 border border-gold-500/30 flex items-center space-x-1 transition-all">
                  <Upload className="w-3 h-3" />
                  <span>Upload</span>
                  <input type="file" accept=".txt,.md,.tex,.doc,.docx" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
            </div>

            {/* Input Text Area */}
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your AI-generated text, thesis paragraphs, or research draft here..."
                rows={11}
                className="w-full bg-obsidian-950/80 border border-gold-border/30 focus:border-gold-400/80 rounded-xl p-4 text-sm text-obsidian-100 placeholder-obsidian-600 focus:outline-none focus:ring-1 focus:ring-gold-500/50 resize-y transition-all font-mono leading-relaxed"
              />
              <div className="flex items-center justify-between text-[11px] text-obsidian-400 mt-2 px-1">
                <span>{wordCount} words • {charCount} chars</span>
                <span>~{Math.max(1, Math.ceil(wordCount / 200))} min read</span>
              </div>
            </div>

            {/* Register Selector */}
            <div className="mt-4 pt-4 border-t border-obsidian-800">
              <label className="block text-xs font-semibold text-gold-300 mb-2">
                Linguistic Register & Tone:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['academic', 'executive', 'casual', 'technical'] as RegisterStyle[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => setStyle(r)}
                    className={`py-2 px-3 text-xs font-medium rounded-lg capitalize border transition-all ${
                      style === r 
                        ? 'bg-gold-500/20 border-gold-400 text-gold-200 shadow-gold-sm font-bold' 
                        : 'bg-obsidian-850 border-obsidian-700/60 text-obsidian-400 hover:text-obsidian-200 hover:bg-obsidian-800'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Intensity Slider */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-gold-300">
                  Transformation Intensity:
                </span>
                <span className="text-xs font-mono font-bold text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded border border-gold-500/30">
                  {intensity}% ({intensity < 40 ? 'Conservative' : intensity < 70 ? 'Balanced' : intensity < 90 ? 'Aggressive' : 'Maximum'})
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-obsidian-500 mt-1">
                <span>Preserve Tone (20%)</span>
                <span>Default (75%)</span>
                <span>Max Evasion (100%)</span>
              </div>
            </div>

            {/* Protected Terms Blacklist */}
            <div className="mt-4">
              <label className="block text-xs font-semibold text-gold-300 mb-1">
                Protected Terms (Synonym Exclusion Blacklist):
              </label>
              <input
                type="text"
                value={protectedInput}
                onChange={(e) => setProtectedInput(e.target.value)}
                placeholder="Comma-separated: CRISPR, PyTorch, O(N log N)"
                className="w-full bg-obsidian-950/80 border border-gold-border/30 focus:border-gold-400/80 rounded-lg px-3 py-2 text-xs text-obsidian-100 placeholder-obsidian-600 focus:outline-none"
              />
            </div>

            {/* Advanced Evasion Controls Accordion */}
            <div className="mt-4 pt-3 border-t border-obsidian-800">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center justify-between w-full text-xs font-semibold text-obsidian-400 hover:text-gold-300 py-1"
              >
                <span className="flex items-center space-x-1.5">
                  <Sliders className="w-3.5 h-3.5 text-gold-400" />
                  <span>Advanced Mathematical Evasion Knobs</span>
                </span>
                {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {showAdvanced && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 p-3 bg-obsidian-950/60 rounded-xl border border-gold-border/15 text-xs text-obsidian-300">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enableDiscourse}
                      onChange={(e) => setEnableDiscourse(e.target.checked)}
                      className="rounded accent-gold-500"
                    />
                    <span>PDTB 2.0 Discourse Rotation</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enableNgram}
                      onChange={(e) => setEnableNgram(e.target.checked)}
                      className="rounded accent-gold-500"
                    />
                    <span>N-Gram Chain Breaking</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enableCliche}
                      onChange={(e) => setEnableCliche(e.target.checked)}
                      className="rounded accent-gold-500"
                    />
                    <span>AI Cliché & Fluff Scrubber</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enableUnicode}
                      onChange={(e) => setEnableUnicode(e.target.checked)}
                      className="rounded accent-gold-500"
                    />
                    <span>Purge Zero-Width Unicode</span>
                  </label>
                </div>
              )}
            </div>

            {/* Primary Action Button */}
            <div className="mt-6">
              <button
                onClick={handleHumanize}
                disabled={isLoading || !inputText.trim()}
                className="w-full gold-btn py-3.5 px-6 flex items-center justify-center space-x-2.5 text-sm uppercase tracking-wider"
              >
                <Sparkles className="w-4 h-4 text-obsidian-950" />
                <span>{isLoading ? 'Disrupting AI Patterns...' : 'HUMANIZE & EVADE DETECTION →'}</span>
              </button>
            </div>

          </div>
        </div>

        {/* Column 2: Live Humanized Output & Detection Telemetry */}
        <div className="space-y-4">
          <div className="gold-card rounded-2xl p-5 sm:p-6 flex flex-col h-full min-h-[500px]">

            {/* Output Header */}
            <div className="flex items-center justify-between pb-3 border-b border-obsidian-800 mb-4">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-gold-200">
                  Humanized Output
                </h3>
              </div>

              {result && (
                <div className="flex items-center space-x-2">
                  {/* Clean vs Diff View Switcher */}
                  <div className="flex rounded-lg bg-obsidian-950 p-0.5 border border-gold-border/30">
                    <button
                      onClick={() => setViewMode('diff')}
                      className={`px-2.5 py-1 text-xs rounded-md transition-all ${
                        viewMode === 'diff' ? 'bg-gold-500 text-obsidian-950 font-bold' : 'text-obsidian-400 hover:text-white'
                      }`}
                    >
                      Markup Diff
                    </button>
                    <button
                      onClick={() => setViewMode('clean')}
                      className={`px-2.5 py-1 text-xs rounded-md transition-all ${
                        viewMode === 'clean' ? 'bg-gold-500 text-obsidian-950 font-bold' : 'text-obsidian-400 hover:text-white'
                      }`}
                    >
                      Clean Text
                    </button>
                  </div>

                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg bg-obsidian-850 hover:bg-gold-500/15 text-gold-300 border border-gold-border/30 transition-all"
                    title="Copy Clean Text"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={handleDownload}
                    className="p-1.5 rounded-lg bg-obsidian-850 hover:bg-gold-500/15 text-gold-300 border border-gold-border/30 transition-all"
                    title="Download Clean Text"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* AI Risk Score Comparison Meter */}
            {result ? (
              <div className="p-4 rounded-xl bg-obsidian-950/80 border border-gold-border/30 mb-4 grid grid-cols-2 gap-4">
                {/* Before */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-obsidian-400 flex items-center space-x-1">
                      <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
                      <span>Original AI Risk:</span>
                    </span>
                    <span className="font-mono font-bold text-rose-400">{result.stats.originalAiScore}%</span>
                  </div>
                  <div className="w-full bg-obsidian-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-rose-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${result.stats.originalAiScore}%` }}
                    />
                  </div>
                </div>

                {/* After */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gold-300 flex items-center space-x-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Humanized Risk:</span>
                    </span>
                    <span className="font-mono font-bold text-emerald-400">{result.stats.humanizedAiScore}%</span>
                  </div>
                  <div className="w-full bg-obsidian-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${result.stats.humanizedAiScore}%` }}
                    />
                  </div>
                </div>
              </div>
            ) : null}

            {/* Output Display Body */}
            <div className="flex-1 bg-obsidian-950/80 border border-gold-border/20 rounded-xl p-4 overflow-y-auto max-h-[380px] text-sm leading-relaxed">
              {result ? (
                viewMode === 'clean' ? (
                  <p className="text-obsidian-100 whitespace-pre-wrap font-sans">
                    {result.humanizedText}
                  </p>
                ) : (
                  <div>
                    {/* Render Interactive Replacement Diff */}
                    <div className="whitespace-pre-wrap font-sans space-y-2">
                      {result.diffs.length > 0 ? (
                        <div>
                          <p className="text-obsidian-200">
                            {renderDiffParagraph(result.originalText, result.diffs)}
                          </p>
                        </div>
                      ) : (
                        <p className="text-obsidian-100">{result.humanizedText}</p>
                      )}
                    </div>
                  </div>
                )
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 text-obsidian-500">
                  <Sparkles className="w-10 h-10 text-gold-500/20 mb-3" />
                  <p className="text-sm font-medium text-obsidian-400">Ready to transform your draft</p>
                  <p className="text-xs text-obsidian-600 max-w-xs mt-1">
                    Click &quot;HUMANIZE & EVADE DETECTION&quot; to shatter statistical AI signatures and view clean replacements.
                  </p>
                </div>
              )}
            </div>

            {/* Telemetry Footer */}
            {result && (
              <div className="mt-4 pt-3 border-t border-obsidian-800 flex flex-wrap items-center justify-between text-xs text-obsidian-400 gap-2">
                <div className="flex items-center space-x-3">
                  <span>Words: <strong className="text-gold-300 font-mono">{result.stats.wordsHumanized}</strong></span>
                  <span>Replacements: <strong className="text-gold-300 font-mono">{result.stats.replacementsCount}</strong></span>
                  <span>Perplexity: <strong className="text-emerald-400 font-mono">+{result.stats.perplexityDelta}%</strong></span>
                </div>
                <div className="text-[11px] text-obsidian-500 font-mono">
                  Latency: {result.stats.executionTimeMs}ms • Vercel Edge Ready
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};

// Helper function to render crossed out and humanized diff text
function renderDiffParagraph(originalText: string, diffs: Array<{ original: string; replacement: string }>) {
  let outputHtml = originalText;
  diffs.forEach(diff => {
    if (!diff.original || diff.original.startsWith('[')) return;
    const escaped = diff.original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'g');
    outputHtml = outputHtml.replace(
      regex, 
      `<span class="diff-ai-crossed">${diff.original}</span><span class="diff-human-replaced">${diff.replacement}</span>`
    );
  });

  return <span dangerouslySetInnerHTML={{ __html: outputHtml }} />;
}
