import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CONCEPTS_DATA } from '../data/conceptsData';

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

import { ArrowLeft, ArrowRight, Code2 } from 'lucide-react';
import { Button, Badge } from '../components/ui/UIComponents';

export const ConceptDetail = () => {
  const { conceptId } = useParams();
  const navigate = useNavigate();

  const concept = CONCEPTS_DATA.find((c) => c.id === conceptId) || CONCEPTS_DATA[0];

  const renderComponent = () => {
    switch (concept.id) {
      case 'jsx': return <JsxConcept />;
      case 'componentes': return <ComponentsConcept />;
      case 'props': return <PropsConcept />;
      case 'virtual-dom': return <VirtualDomConcept />;
      case 'listas-e-keys': return <ListsKeysConcept />;
      case 'renderizacao-condicional': return <ConditionalConcept />;
      case 'state-e-usestate': return <StateConcept />;
      case 'formularios': return <FormsConcept />;
      case 'useeffect': return <UseEffectConcept />;
      case 'consumo-de-apis': return <ApiConsumerConcept />;
      case 'react-router': return <RouterConcept />;
      default: return <JsxConcept />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button onClick={() => navigate('/conceitos')} variant="secondary" size="sm" icon={ArrowLeft}>
          Voltar para a Central de Conceitos
        </Button>

        <Badge variant="purple">Rota URL: /conceito/{concept.id}</Badge>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-mono font-bold px-3 py-1 rounded-lg bg-indigo-600 text-white">
            {concept.number}
          </span>
          <h1 className="text-2xl font-bold text-white">{concept.title}</h1>
        </div>
        <p className="text-slate-400 text-sm">{concept.description}</p>
      </div>

      {renderComponent()}
    </div>
  );
};
