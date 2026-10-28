import React from 'react';
import { Code2, Heart, Github } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 py-8 mt-16 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-white">
            <Code2 size={14} />
          </div>
          <span className="font-semibold text-slate-200">ReactMaster Studio</span>
          <span>• Todos os 11 conceitos de React integrados</span>
        </div>

        <div className="flex items-center gap-1 text-slate-500">
          <span>Desenvolvido com</span>
          <Heart size={12} className="text-rose-500 fill-rose-500" />
          <span>usando React 19, Vite & Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
};
