import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TURNITOUT — Free AI Humanizer & Detection Evader (Vercel Edition)',
  description: 'Deterministic, zero-generative-AI linguistic evasion and plagiarism removal engine. Neutralizes Turnitin, GPTZero, and CopyLeaks detection. Architected by Jishnudip Saha.',
  authors: [{ name: 'Jishnudip Saha', url: 'https://github.com/JishnudipSaha' }],
  keywords: ['ai humanizer', 'turnitin bypass', 'free ai detector evader', 'jishnudip saha', 'academic humanizer', 'vercel'],
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-obsidian-950 text-obsidian-100 antialiased selection:bg-gold-500/30 selection:text-gold-200">
        {children}
      </body>
    </html>
  );
}
