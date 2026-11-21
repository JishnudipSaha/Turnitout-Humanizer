'use client';

import React from 'react';
import { X, Award, Github, ShieldCheck, CheckCircle2, Terminal, Code2, Globe, Cpu } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-xl bg-obsidian-900 border border-gold-500/40 rounded-2xl p-6 sm:p-8 shadow-gold-lg text-obsidian-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle decorative gold glow in corner */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-obsidian-400 hover:text-gold-300 hover:bg-gold-500/10 transition-colors"
          title="Close profile modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Header */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-gold-600 via-gold-400 to-gold-200 p-1 shadow-gold-md">
              <div className="w-full h-full rounded-full bg-obsidian-950 flex items-center justify-center text-gold-400 font-bold text-2xl font-serif">
                JS
              </div>
            </div>
            <div className="absolute bottom-0 right-0 p-1 bg-emerald-500 rounded-full border-2 border-obsidian-950" title="Active Engineer" />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Jishnudip Saha
              </h3>
              <CheckCircle2 className="w-5 h-5 text-gold-400 fill-gold-400/20" />
            </div>
            <p className="text-sm font-medium text-gold-300">
              Lead Software Engineer & Architecture Lead
            </p>
            <div className="flex items-center space-x-2 mt-1.5">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-gold-500/10 text-gold-400 border border-gold-500/30">
                Verified Maintainer
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Turnitout Vercel Edition
              </span>
            </div>
          </div>
        </div>

        {/* Developer Bio */}
        <p className="text-sm text-obsidian-300 leading-relaxed mb-6 border-y border-obsidian-800 py-3">
          Architect behind the modern Vercel-native deployment of Turnitout. Dedicated to privacy-first, zero-generative-AI mathematical pattern disruption, empowering researchers, students, and engineers with deterministic plagiarism evasion.
        </p>

        {/* Core Credentials & Competencies */}
        <div className="space-y-3 mb-6">
          <h4 className="text-xs font-mono uppercase tracking-wider text-gold-400 flex items-center space-x-1.5">
            <Award className="w-4 h-4" />
            <span>Developer Credentials & Highlights</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-obsidian-850 border border-gold-500/15 flex items-start space-x-2.5">
              <Terminal className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
              <div>
                <span className="text-xs font-semibold text-white block">Full-Stack Cloud Architect</span>
                <span className="text-[11px] text-obsidian-400">Next.js, Vercel Serverless & Distributed APIs</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-obsidian-850 border border-gold-500/15 flex items-start space-x-2.5">
              <ShieldCheck className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
              <div>
                <span className="text-xs font-semibold text-white block">Zero-AI Evasion Engine</span>
                <span className="text-[11px] text-obsidian-400">100% Deterministic NLP & AST Analysis</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-obsidian-850 border border-gold-500/15 flex items-start space-x-2.5">
              <Code2 className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
              <div>
                <span className="text-xs font-semibold text-white block">Code & LaTeX Preservation</span>
                <span className="text-[11px] text-obsidian-400">String-aware AST docstring parser</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-obsidian-850 border border-gold-500/15 flex items-start space-x-2.5">
              <Cpu className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
              <div>
                <span className="text-xs font-semibold text-white block">Stateless Security</span>
                <span className="text-[11px] text-obsidian-400">Zero database storage, in-memory execution</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <a
            href="https://github.com/JishnudipSaha"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-1/2 gold-btn flex items-center justify-center space-x-2 py-2.5 text-xs font-bold"
          >
            <Github className="w-4 h-4" />
            <span>Visit GitHub Profile</span>
          </a>

          <a
            href="https://github.com/JishnudipSaha/Turnitout-Humanizer"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-1/2 gold-btn-secondary flex items-center justify-center space-x-2 py-2.5 text-xs font-semibold"
          >
            <Globe className="w-4 h-4" />
            <span>Explore Repository</span>
          </a>
        </div>

      </div>
    </div>
  );
};
