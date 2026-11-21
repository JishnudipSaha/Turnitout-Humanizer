'use client';

import React from 'react';
import { Award, Github, ShieldCheck, ExternalLink, Heart } from 'lucide-react';

interface FooterProps {
  onOpenProfile: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenProfile }) => {
  return (
    <footer className="border-t border-gold-border/20 bg-obsidian-950/90 text-obsidian-400 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-obsidian-800">
          
          {/* Col 1: Author & Project */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold font-serif text-white">
                TURNIT<span className="text-gold-400">OUT</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gold-500/10 text-gold-300 border border-gold-500/30">
                Vercel Edition
              </span>
            </div>
            <p className="text-xs text-obsidian-400 leading-relaxed">
              Deterministic, privacy-first linguistic disruption engine. Free forever, no paywalls, zero generative AI hallucinations.
            </p>
            <div className="pt-1">
              <button
                onClick={onOpenProfile}
                className="inline-flex items-center space-x-1.5 text-xs text-gold-300 hover:text-gold-200 underline font-medium"
              >
                <Award className="w-3.5 h-3.5 text-gold-400" />
                <span>View Jishnudip Saha&apos;s Developer Profile & Credentials</span>
              </button>
            </div>
          </div>

          {/* Col 2: Architecture & Verification */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-gold-400 font-bold">
              Independent Verification
            </h4>
            <p className="text-xs text-obsidian-400 leading-relaxed">
              Verify transformed output against industry-standard third-party detectors:
            </p>
            <a
              href="https://quillbot.com/ai-content-detector"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-xs text-gold-300 hover:text-gold-200 hover:underline"
            >
              <span>Test on QuillBot AI Content Detector</span>
              <ExternalLink className="w-3 h-3 text-gold-400" />
            </a>
          </div>

          {/* Col 3: Cloud & Standards */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-gold-400 font-bold">
              Deployment & Privacy
            </h4>
            <div className="space-y-1.5 text-xs text-obsidian-400">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Stateless • Zero Data Retention</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Vercel Serverless Multi-Region Edge</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>EU AI Act Article 50 Compliant</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-obsidian-500 gap-4">
          <div className="flex items-center space-x-2">
            <span>Architected &amp; Engineered by</span>
            <button
              onClick={onOpenProfile}
              className="text-gold-300 hover:text-gold-100 font-semibold transition-colors"
            >
              Jishnudip Saha
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/JishnudipSaha"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold-300 transition-colors flex items-center space-x-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>@JishnudipSaha</span>
            </a>
            <span>•</span>
            <a
              href="https://github.com/JishnudipSaha/Turnitout-Humanizer"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold-300 transition-colors"
            >
              Open Source Repository
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
