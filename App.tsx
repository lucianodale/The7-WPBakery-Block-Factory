
import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import CodeDisplay from './components/CodeDisplay';
import { generateWPBakeryBlock } from './services/geminiService';
import { WPBakeryBlock, AppStatus } from './types';
import { ICON_SPINNER } from './constants';

const App: React.FC = () => {
  const [history, setHistory] = useState<WPBakeryBlock[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<WPBakeryBlock | null>(null);
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('wpbakery_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history");
      }
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('wpbakery_history', JSON.stringify(history));
  }, [history]);

  const handleGenerate = async () => {
    if (!prompt.trim() || status === AppStatus.LOADING) return;

    setStatus(AppStatus.LOADING);
    setError(null);

    try {
      const generatedCode = await generateWPBakeryBlock(prompt);
      
      const newBlock: WPBakeryBlock = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        prompt: prompt.trim(),
        code: generatedCode,
        type: inferType(prompt)
      };

      setHistory(prev => [newBlock, ...prev]);
      setSelectedBlock(newBlock);
      setPrompt('');
      setStatus(AppStatus.IDLE);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Ocorreu um erro ao gerar o bloco. Verifique sua conexão e tente novamente.');
      setStatus(AppStatus.ERROR);
    }
  };

  const inferType = (p: string): WPBakeryBlock['type'] => {
    const l = p.toLowerCase();
    if (l.includes('hero') || l.includes('header')) return 'Hero';
    if (l.includes('cta') || l.includes('conversão') || l.includes('call to action')) return 'CTA';
    if (l.includes('faq') || l.includes('perguntas')) return 'FAQ';
    if (l.includes('card') || l.includes('serviço')) return 'Card';
    if (l.includes('seção') || l.includes('institucional')) return 'Section';
    return 'Other';
  };

  const handleDelete = (id: string) => {
    setHistory(prev => prev.filter(b => b.id !== id));
    if (selectedBlock?.id === id) {
      setSelectedBlock(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleGenerate();
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden font-sans text-slate-200">
      {/* Sidebar Component */}
      <Sidebar 
        history={history} 
        onSelect={setSelectedBlock} 
        onDelete={handleDelete}
        selectedId={selectedBlock?.id || null}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-4 md:p-8 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              WPBakery Block Factory
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              The7 Theme & Ultimate Addons Optimized Generator
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5"><kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700">Ctrl</kbd>+<kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700">Enter</kbd> para gerar</span>
          </div>
        </header>

        {/* Output Area */}
        <div className="flex-1 flex flex-col min-h-0 mb-6">
          <CodeDisplay 
            code={selectedBlock?.code || ''} 
            isLoading={status === AppStatus.LOADING} 
          />
          {error && (
            <div className="mt-4 p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-200 text-sm flex items-center gap-3">
              <span className="text-xl">⚠️</span>
              {error}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-300"></div>
          <div className="relative bg-slate-900 rounded-2xl border border-slate-800 p-2 shadow-2xl">
            <textarea
              ref={textareaRef}
              rows={3}
              placeholder="Descreva o bloco que você precisa... (ex: 'Crie uma hero section clean premium com botão CTA')"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent border-none focus:ring-0 text-slate-100 placeholder-slate-600 resize-none px-4 py-3 text-lg leading-snug"
            />
            <div className="flex items-center justify-between px-4 pb-3 border-t border-slate-800 pt-3 mt-1">
              <div className="flex gap-2">
                <span className="text-[10px] text-slate-600 uppercase font-bold tracking-widest">DeepSeek-R1 / Gemini 3 Pro</span>
              </div>
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || status === AppStatus.LOADING}
                className={`flex items-center gap-3 px-8 py-2.5 rounded-xl font-bold transition-all ${
                  !prompt.trim() || status === AppStatus.LOADING
                    ? 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-50'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-900/40 active:scale-95'
                }`}
              >
                {status === AppStatus.LOADING ? ICON_SPINNER : 'GERAR BLOCO'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
