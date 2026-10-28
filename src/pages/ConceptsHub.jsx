import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CONCEPTS_DATA } from '../data/conceptsData';

// Concept Components
import { JsxConcept } from '../components/concepts/JsxConcept';
import { ComponentsConcept } from '../components/concepts/ComponentsConcept';
import { PropsConcept } from '../components/concepts/PropsConcept';
import { VirtualDomConcept } from '../components/concepts/VirtualDomConcept';
import { ListsKeysConcept } from '../components/concepts/ListsKeysConcept';
import { ConditionalConcept } from '../components/concepts/ConditionalConcept';
import { StateConcept } from '../components/concepts/StateConcept';
import { FormsConcept } from '../components/concepts/FormsConcept';
import { UseEffectConcept } from '../components/concepts/UseEffectConcept';
import { ApiConsumerConcept } from '../components/concepts/ApiConsumerConcept';
import { RouterConcept } from '../components/concepts/RouterConcept';

import { Code2, CheckCircle2, BookOpen, Layers } from 'lucide-react';
import { Badge } from '../components/ui/UIComponents';

export const ConceptsHub = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'jsx';
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleTabChange = (id) => {
    setActiveTab(id);
    setSearchParams({ tab: id });
  };

  const currentConcept = CONCEPTS_DATA.find((c) => c.id === activeTab) || CONCEPTS_DATA[0];

  const renderConceptComponent = () => {
    switch (activeTab) {
      case 'jsx':
        return <JsxConcept />;
      case 'componentes':
        return <ComponentsConcept />;
      case 'props':
        return <PropsConcept />;
      case 'virtual-dom':
        return <VirtualDomConcept />;
      case 'listas-e-keys':
        return <ListsKeysConcept />;
      case 'renderizacao-condicional':
        return <ConditionalConcept />;
      case 'state-e-usestate':
        return <StateConcept />;
      case 'formularios':
        return <FormsConcept />;
      case 'useeffect':
        return <UseEffectConcept />;
      case 'consumo-de-apis':
        return <ApiConsumerConcept />;
      case 'react-router':
        return <RouterConcept />;
      default:
        return <JsxConcept />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <Badge variant="purple" className="mb-2">Painel de Aprendizado Interativo</Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
            <Code2 size={28} className="text-indigo-400" />
            Central dos 11 Conceitos do React
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Selecione qualquer conceito abaixo para interagir com o código e testar a demonstração na prática.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 font-mono text-xs">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span className="text-slate-300">Progresso do Módulo:</span>
          <span className="text-emerald-400 font-bold">11/11 Concluídos</span>
        </div>
      </div>

      {/* Concept Selector Tabs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {CONCEPTS_DATA.map((c) => {
          const isActive = activeTab === c.id;
          return (
            <button
              key={c.id}
              onClick={() => handleTabChange(c.id)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400/50'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${isActive ? 'bg-indigo-800 text-white' : 'bg-slate-800 text-indigo-400'}`}>
                  {c.number}
                </span>
              </div>
              <span className="text-xs font-bold truncate block">{c.title}</span>
            </button>
          );
        })}
      </div>

      {/* Summary Box for active concept */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold font-mono px-3 py-1 rounded-lg bg-indigo-600 text-white">
            {currentConcept.number}
          </span>
          <h2 className="text-xl font-bold text-white">{currentConcept.title} - {currentConcept.subtitle}</h2>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">{currentConcept.summary}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
          {currentConcept.keyPoints.map((point, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0"></span>
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Concept Component */}
      <div className="transition-all duration-300">
        {renderConceptComponent()}
      </div>
    </div>
  );
};
