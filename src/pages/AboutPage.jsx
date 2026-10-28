import React from 'react';
import { CONCEPTS_DATA } from '../data/conceptsData';
import { Code2, CheckCircle2, Layers, Cpu, ShieldCheck } from 'lucide-react';
import { Badge, Card } from '../components/ui/UIComponents';

export const AboutPage = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <Badge variant="purple">Sobre o Projeto React 2.0</Badge>
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <Code2 size={32} className="text-indigo-400" />
          Arquitetura e Mapeamento dos 11 Conceitos
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
          Este projeto foi meticulosamente estruturado para cobrir 100% dos 11 conceitos apresentados no mapa de conhecimentos de React.
        </p>
      </div>

      {/* Concept Checklist Matrix */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <CheckCircle2 size={22} className="text-emerald-400" />
          Mapeamento dos 11 Conceitos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CONCEPTS_DATA.map((c) => (
            <Card key={c.id} hover={false} className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="blue">{c.number}</Badge>
                <span className="text-[10px] text-emerald-400 font-mono font-bold">100% IMPLEMENTADO</span>
              </div>
              <h3 className="font-bold text-white text-base">{c.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{c.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
