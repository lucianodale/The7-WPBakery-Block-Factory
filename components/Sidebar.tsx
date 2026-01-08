
import React from 'react';
import { WPBakeryBlock } from '../types';
import { ICON_TRASH } from '../constants';

interface SidebarProps {
  history: WPBakeryBlock[];
  onSelect: (block: WPBakeryBlock) => void;
  onDelete: (id: string) => void;
  selectedId: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ history, onSelect, onDelete, selectedId }) => {
  return (
    <div className="w-80 h-full bg-slate-900 border-r border-slate-800 flex flex-col overflow-hidden hidden md:flex">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
          Histórico
        </h2>
        <p className="text-slate-400 text-xs mt-1">Sua biblioteca de blocos gerados</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {history.length === 0 ? (
          <div className="text-center py-10 opacity-30 italic text-sm">
            Nenhum bloco gerado ainda.
          </div>
        ) : (
          history.map((block) => (
            <div 
              key={block.id}
              onClick={() => onSelect(block)}
              className={`group p-3 rounded-lg border cursor-pointer transition-all ${
                selectedId === block.id 
                  ? 'bg-blue-600/20 border-blue-500/50' 
                  : 'bg-slate-800/50 border-transparent hover:bg-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-slate-700 text-slate-300">
                  {block.type}
                </span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(block.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-red-400 transition-opacity"
                >
                  {ICON_TRASH}
                </button>
              </div>
              <p className="text-sm font-medium text-slate-200 line-clamp-2 leading-snug">
                {block.prompt}
              </p>
              <p className="text-[10px] text-slate-500 mt-2">
                {new Date(block.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
