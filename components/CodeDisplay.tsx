
import React, { useState } from 'react';
import { ICON_COPY } from '../constants';

interface CodeDisplayProps {
  code: string;
  isLoading: boolean;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ code, isLoading }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col bg-slate-950 rounded-xl border border-slate-800 overflow-hidden min-h-[400px]">
        <div className="h-1 bg-blue-500/20">
          <div className="h-full bg-blue-500 animate-[loading_1.5s_infinite]"></div>
        </div>
        <div className="flex-1 flex items-center justify-center space-y-4 flex-col opacity-50">
          <div className="w-12 h-12 rounded-full border-4 border-t-blue-500 border-slate-800 animate-spin"></div>
          <p className="text-lg font-medium animate-pulse">Compilando Shortcodes...</p>
        </div>
        <style>{`@keyframes loading { 0% { width: 0; margin-left: 0; } 50% { width: 40%; } 100% { width: 0; margin-left: 100%; } }`}</style>
      </div>
    );
  }

  if (!code) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-950 rounded-xl border border-slate-800 border-dashed p-12 text-center">
        <div className="max-w-md">
          <div className="text-4xl mb-4 opacity-20">⚡</div>
          <h3 className="text-xl font-semibold text-slate-400 mb-2">Pronto para Gerar</h3>
          <p className="text-slate-500">
            Digite sua solicitação abaixo para gerar blocos WPBakery perfeitos para o tema The7.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
          </div>
          <span className="ml-4 text-xs font-mono text-slate-400 uppercase tracking-widest">WPBakery Output</span>
        </div>
        <button 
          onClick={handleCopy}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            copied 
              ? 'bg-green-600 text-white' 
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'
          }`}
        >
          {copied ? 'Copiado!' : (
            <>
              {ICON_COPY}
              Copiar Código
            </>
          )}
        </button>
      </div>
      
      <div className="flex-1 p-6 overflow-auto bg-[#0a0f1b]">
        <pre className="code-font text-sm leading-relaxed text-blue-100/90 selection:bg-blue-500/30 whitespace-pre-wrap break-words">
          {code}
        </pre>
      </div>
    </div>
  );
};

export default CodeDisplay;
