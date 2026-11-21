'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProfileModal } from '@/components/ProfileModal';
import { HumanizerTab } from '@/components/HumanizerTab';
import { CodeTab } from '@/components/CodeTab';
import { CitationTab } from '@/components/CitationTab';
import { CheckerTab } from '@/components/CheckerTab';
import { 
  FileText, 
  Terminal, 
  BookOpen, 
  Activity, 
  ShieldCheck, 
  Sparkles, 
  Award, 
  Zap, 
  Lock, 
  ExternalLink 
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'humanizer' | 'code' | 'citations' | 'checker'>('humanizer');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Top Header */}
      <Header onOpenProfile={() => setIsProfileOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          
          {/* Subtle Top Pill */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Vercel-Native Serverless Humanizer Engine</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif tracking-tight text-white leading-tight">
            Turn Any AI Draft Into <br />
            <span className="gold-gradient-text">Human-Grade Prose</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-base sm:text-lg text-obsidian-300 leading-relaxed max-w-2xl mx-auto">
            The world&apos;s first 100% deterministic, zero-generative-AI evasion engine. Mathematically disrupts Turnitin, GPTZero, and CopyLeaks statistical fingerprints without altering facts, equations, or code.
          </p>

          {/* Author Badge Callout */}
          <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-obsidian-400">
            <span>Architected &amp; Engineered by</span>
            <button
              onClick={() => setIsProfileOpen(true)}
              className="text-gold-300 hover:text-gold-100 font-semibold underline flex items-center space-x-1"
            >
              <span>Jishnudip Saha</span>
              <Award className="w-3 h-3 text-gold-400" />
            </button>
          </div>

          {/* Feature Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-mono">
            <span className="px-3 py-1 rounded-lg bg-obsidian-900 border border-gold-border/30 text-gold-200">
              ✓ Zero-Generative AI (No Hallucinations)
            </span>
            <span className="px-3 py-1 rounded-lg bg-obsidian-900 border border-gold-border/30 text-gold-200">
              ✓ In-Place Word &amp; LaTeX Protection
            </span>
            <span className="px-3 py-1 rounded-lg bg-obsidian-900 border border-gold-border/30 text-gold-200">
              ✓ 100% Executable Code Safety
            </span>
          </div>

        </div>

        {/* Tab Navigation Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 rounded-xl bg-obsidian-900 border border-gold-border/30 shadow-gold-sm">
            
            <button
              onClick={() => setActiveTab('humanizer')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'humanizer'
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 shadow-gold-sm'
                  : 'text-obsidian-400 hover:text-gold-200 hover:bg-gold-500/5'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Document Humanizer</span>
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'code'
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 shadow-gold-sm'
                  : 'text-obsidian-400 hover:text-gold-200 hover:bg-gold-500/5'
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>Code Comment Humanizer</span>
            </button>

            <button
              onClick={() => setActiveTab('citations')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'citations'
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 shadow-gold-sm'
                  : 'text-obsidian-400 hover:text-gold-200 hover:bg-gold-500/5'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Citations &amp; BibTeX</span>
            </button>

            <button
              onClick={() => setActiveTab('checker')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'checker'
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 shadow-gold-sm'
                  : 'text-obsidian-400 hover:text-gold-200 hover:bg-gold-500/5'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>AI Risk Auditor</span>
            </button>

          </div>
        </div>

        {/* Tab Content Display */}
        <div className="transition-all duration-300">
          {activeTab === 'humanizer' && <HumanizerTab />}
          {activeTab === 'code' && <CodeTab />}
          {activeTab === 'citations' && <CitationTab />}
          {activeTab === 'checker' && <CheckerTab />}
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="gold-card rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">
              Sub-150ms Vercel Edge Speed
            </h4>
            <p className="text-xs text-obsidian-400 leading-relaxed">
              Processes thousands of words in milliseconds. Built with zero cold starts on Vercel Serverless infrastructure.
            </p>
          </div>

          <div className="gold-card rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-4">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">
              100% In-Memory Privacy
            </h4>
            <p className="text-xs text-obsidian-400 leading-relaxed">
              Zero databases, zero disk caching, zero AI training logs. Your academic research and private code never leave volatile RAM.
            </p>
          </div>

          <div className="gold-card rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">
              Mathematical N-Gram Disruption
            </h4>
            <p className="text-xs text-obsidian-400 leading-relaxed">
              Shatters Winnowing and token hashing models used by Turnitin, GPTZero, and CopyLeaks with syntactic clause permutation.
            </p>
          </div>

        </div>

      </main>

      {/* Profile Modal */}
      <ProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
      />

      {/* Global Footer */}
      <Footer onOpenProfile={() => setIsProfileOpen(true)} />

    </div>
  );
}
