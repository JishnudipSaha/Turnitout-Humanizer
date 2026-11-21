'use client';

import React, { useState } from 'react';
import { Code2, Copy, Check, Terminal, Play, Sparkles } from 'lucide-react';
import { humanizeCodeComments } from '@/lib/engine/codeHumanizer';
import { CodeHumanizeOptions } from '@/lib/types';

const SAMPLE_CODE = `import torch
import torch.nn as nn

class TransformerModel(nn.Module):
    """
    Initializes the multi-head self-attention neural network architecture.
    This study plays a pivotal role in validating stochastic optimization.
    """
    def __init__(self, d_model=512, nhead=8):
        super(TransformerModel, self).__init__()
        # Sets up the invariant self-attention mechanism
        self.attn = nn.MultiheadAttention(d_model, nhead)
        # Initializes the feed-forward sublayer
        self.linear = nn.Linear(d_model, d_model)

    def forward(self, x):
        # Loops through and computes the forward tensor representation
        out, _ = self.attn(x, x, x)
        # Checks if tensor requires residual connection
        return self.linear(out) + x
`;

export const CodeTab: React.FC = () => {
  const [code, setCode] = useState(SAMPLE_CODE);
  const [language, setLanguage] = useState<'python' | 'javascript' | 'typescript' | 'cpp' | 'java'>('python');
  const [persona, setPersona] = useState<'beginner' | 'intermediate' | 'senior'>('senior');
  const [convertDocstrings, setConvertDocstrings] = useState(true);
  const [humanizedCode, setHumanizedCode] = useState<string>('');
  const [commentsTransformed, setCommentsTransformed] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  const handleHumanizeCode = () => {
    if (!code.trim()) return;

    const options: CodeHumanizeOptions = {
      language,
      persona,
      convertDocstrings
    };

    const res = humanizeCodeComments(code, options);
    setHumanizedCode(res.humanizedCode);
    setCommentsTransformed(res.commentsCount + res.docstringsConverted);
  };

  const handleCopy = () => {
    if (!humanizedCode) return;
    navigator.clipboard.writeText(humanizedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="gold-card rounded-2xl p-6">
        
        {/* Header & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5 pb-4 border-b border-obsidian-800">
          <div className="flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-gold-400" />
            <div>
              <h3 className="text-base font-bold text-white">
                Code Docstring & Comment Humanizer
              </h3>
              <p className="text-xs text-obsidian-400">
                Isolates natural language comments while protecting 100% of executable code logic.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Language Selector */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="bg-obsidian-950 border border-gold-border/30 rounded-lg px-3 py-1.5 text-xs text-gold-200 focus:outline-none focus:border-gold-400"
            >
              <option value="python">Python (.py)</option>
              <option value="javascript">JavaScript / TypeScript</option>
              <option value="cpp">C / C++</option>
              <option value="java">Java / C#</option>
            </select>

            {/* Persona Selector */}
            <select
              value={persona}
              onChange={(e) => setPersona(e.target.value as any)}
              className="bg-obsidian-950 border border-gold-border/30 rounded-lg px-3 py-1.5 text-xs text-gold-200 focus:outline-none focus:border-gold-400"
            >
              <option value="beginner">Beginner Developer Persona</option>
              <option value="intermediate">Mid-Level Engineer Persona</option>
              <option value="senior">Senior Architect Persona</option>
            </select>

            {/* Docstrings Toggle */}
            {language === 'python' && (
              <label className="flex items-center space-x-1.5 text-xs text-obsidian-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={convertDocstrings}
                  onChange={(e) => setConvertDocstrings(e.target.checked)}
                  className="rounded accent-gold-500"
                />
                <span>Convert &quot;&quot;&quot; → #</span>
              </label>
            )}
          </div>
        </div>

        {/* Dual Code Workspaces */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Input Code */}
          <div>
            <div className="flex items-center justify-between text-xs text-obsidian-400 mb-2">
              <span>Source Source Code (Raw Comments)</span>
              <button
                onClick={() => setCode(SAMPLE_CODE)}
                className="text-gold-400 hover:underline"
              >
                Reset Sample
              </button>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={14}
              className="w-full bg-obsidian-950/90 border border-gold-border/30 focus:border-gold-400/80 rounded-xl p-4 text-xs font-mono text-obsidian-200 focus:outline-none leading-relaxed"
            />
          </div>

          {/* Output Code */}
          <div>
            <div className="flex items-center justify-between text-xs text-obsidian-400 mb-2">
              <span className="text-gold-300 font-semibold">
                Transformed Code ({commentsTransformed} comments altered)
              </span>
              {humanizedCode && (
                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-1 text-gold-400 hover:text-gold-200 text-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Code'}</span>
                </button>
              )}
            </div>
            <div className="w-full h-[278px] bg-obsidian-950/90 border border-gold-border/20 rounded-xl p-4 overflow-auto text-xs font-mono text-obsidian-100 whitespace-pre leading-relaxed">
              {humanizedCode || (
                <div className="h-full flex flex-col items-center justify-center text-obsidian-500">
                  <Code2 className="w-8 h-8 text-gold-500/20 mb-2" />
                  <p>Click &quot;Humanize Comments&quot; to transform code commentary</p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Transform Button */}
        <div className="mt-5 flex justify-end">
          <button
            onClick={handleHumanizeCode}
            className="gold-btn py-2.5 px-6 text-xs flex items-center space-x-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-obsidian-950" />
            <span>Humanize Code Comments & Docstrings</span>
          </button>
        </div>

      </div>
    </div>
  );
};
