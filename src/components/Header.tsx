'use client';

import React from 'react';
import { ShieldCheck, Award, Github, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenProfile }) => {
  return (
    <header className="border-b border-gold-border/30 bg-obsidian-950/80 backdrop-blur-md sticky top-0 z-40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 via-gold-500 to-gold-700 p-0.5 shadow-gold-sm flex items-center justify-center">
            <div className="w-full h-full bg-obsidian-950 rounded-[10px] flex items-center justify-center">
              <span className="font-serif font-black text-gold-400 text-xl tracking-tighter">T</span>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight text-white font-serif">
                TURNIT<span className="text-gold-400 font-extrabold">OUT</span>
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded bg-gold-500/10 text-gold-300 border border-gold-500/30">
                Vercel Edition
              </span>
            </div>
            <p className="text-xs text-obsidian-400 hidden sm:block">
              Deterministic AI-Detection Evasion Engine
            </p>
          </div>
        </div>

        {/* Center: System Status */}
        <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-full bg-obsidian-900 border border-gold-border/40 text-xs text-gold-200">
          <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
          <span>Zero Generative AI • 100% Deterministic</span>
        </div>

        {/* Right: Author / Jishnudip Saha Credentials Profile Button */}
        <div className="flex items-center space-x-3">
          <a
            href="https://github.com/JishnudipSaha/Turnitout-Humanizer"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-obsidian-300 hover:text-gold-300 hover:bg-gold-500/10 border border-transparent hover:border-gold-500/30 transition-all"
            title="GitHub Repository"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          {/* Jishnudip Saha Profile Chip */}
          <button
            onClick={onOpenProfile}
            className="flex items-center space-x-2.5 p-1.5 pr-3.5 rounded-full bg-gradient-to-r from-obsidian-900 to-obsidian-850 hover:from-obsidian-850 hover:to-obsidian-800 border border-gold-500/40 hover:border-gold-400 shadow-gold-sm transition-all group"
            title="View Jishnudip Saha's Developer Credentials"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gold-600 via-gold-400 to-gold-200 p-[1.5px] shadow-sm">
                <div className="w-full h-full rounded-full bg-obsidian-950 flex items-center justify-center text-gold-400 font-bold text-xs">
                  JS
                </div>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-obsidian-950" />
            </div>
            <div className="text-left">
              <div className="flex items-center space-x-1">
                <span className="text-xs font-semibold text-gold-200 group-hover:text-gold-100">
                  Jishnudip Saha
                </span>
                <Award className="w-3 h-3 text-gold-400" />
              </div>
              <span className="text-[10px] text-obsidian-400 block -mt-0.5">
                Lead Engineer
              </span>
            </div>
          </button>
        </div>

      </div>
    </header>
  );
};
