import React from 'react';
import { Link } from 'react-router-dom';
import { CONCEPTS_DATA } from '../data/conceptsData';
import { Code2, ArrowRight, Sparkles, CheckCircle2, Rocket, Layers } from 'lucide-react';
import { Badge, Button, Card } from '../components/ui/UIComponents';

export const Home = () => {
  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-indigo-950/60 via-slate-900 to-slate-950 p-8 sm:p-12 border border-indigo-500/20 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-3xl space-y-6">
          <Badge variant="purple" className="px-3.5 py-1 text-xs gap-2">
            <Sparkles size={14} className="text-purple-400" />
            Projeto React Completo • 11 Conceitos Fundamentais
          </Badge>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Aprenda e Pratique os <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">11 Conceitos Essenciais</span> do React
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Plataforma interativa desenvolvida para explorar, testar e entender em profundidade os 11 pilares do ecossistema React. Cada módulo conta com playgrounds interativos, código fonte comentado e mini-aplicações reais.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link to="/conceitos">
              <Button variant="gradient" size="lg" icon={Rocket}>
                Explorar Todos os 11 Conceitos
              </Button>
            </Link>

            <Link to="/gerenciador">
              <Button variant="secondary" size="lg" icon={Layers}>
                Ver Aplicação de Tarefas (CRUD)
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Concept Grid Matching the attached image */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Code2 className="text-indigo-400" size={24} />
              Os 11 Conceitos do Projeto
            </h2>
            <p className="text-slate-400 text-sm">
              Clique em "Explorar conceito →" em qualquer cartão para ver o playground interativo em funcionamento.
            </p>
          </div>

          <Badge variant="emerald" className="self-start sm:self-auto px-3 py-1">
            <CheckCircle2 size={14} /> Todos os 11 Implementados
          </Badge>
        </div>

        {/* Grid of 11 Cards inspired by the user image */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONCEPTS_DATA.map((concept) => (
            <div
              key={concept.id}
              className="group bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {concept.number}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono uppercase tracking-wider">
                    {concept.subtitle}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {concept.title}
                  </h3>
                  <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                    {concept.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-800/80">
                <Link
                  to={`/conceitos?tab=${concept.id}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-400 hover:text-indigo-300 group-hover:translate-x-1 transition-all"
                >
                  Explorar conceito <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
