import React, { useState } from 'react';
import { Button, Badge, Card, Alert } from '../ui/UIComponents';
import { CodeBlock } from '../ui/CodeBlock';
import { Boxes, Heart, Star, CheckCircle, Info } from 'lucide-react';

export const ComponentsConcept = () => {
  const [btnVariant, setBtnVariant] = useState('primary');
  const [btnSize, setBtnSize] = useState('md');
  const [clickCount, setClickCount] = useState(0);

  const sampleCode = `// 1. Definição do Componente Reutilizável
function CustomButton({ variant, size, children, onClick }) {
  return (
    <button className={\`btn btn-\${variant} btn-\${size}\`} onClick={onClick}>
      {children}
    </button>
  );
}

// 2. Reutilização do Componente em múltiplos lugares com configurações diferentes
function App() {
  return (
    <div>
      <CustomButton variant="primary" size="md">Salvar</CustomButton>
      <CustomButton variant="danger" size="sm">Excluir</CustomButton>
    </div>
  );
}`;

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <Boxes className="text-purple-400" size={22} />
          02. Componentes - Partes Reutilizáveis de UI
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          Componentes são funções independentes que retornam JSX. Eles dividem a interface do usuário em partes isoladas e facilmente testáveis e reutilizáveis.
        </p>

        {/* Live Interactive Catalog of Components */}
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
          <h4 className="font-semibold text-slate-200 text-sm">Controle de Propriedades do Componente de Exemplo</h4>
          
          <div className="flex flex-wrap gap-4 items-center bg-slate-900 p-4 rounded-xl border border-slate-800 text-sm">
            <div>
              <span className="text-slate-400 mr-2">Variante:</span>
              <select
                value={btnVariant}
                onChange={(e) => setBtnVariant(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-white"
              >
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="outline">Outline</option>
                <option value="danger">Danger</option>
                <option value="success">Success</option>
                <option value="gradient">Gradient</option>
              </select>
            </div>

            <div>
              <span className="text-slate-400 mr-2">Tamanho:</span>
              <select
                value={btnSize}
                onChange={(e) => setBtnSize(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-white"
              >
                <option value="sm">Pequeno (sm)</option>
                <option value="md">Médio (md)</option>
                <option value="lg">Grande (lg)</option>
              </select>
            </div>

            <span className="ml-auto text-xs text-purple-400 font-mono">
              Cliques acumulados no componente: <strong>{clickCount}</strong>
            </span>
          </div>

          <div className="p-6 bg-slate-900/60 border border-purple-500/20 rounded-xl flex flex-wrap items-center justify-center gap-4 min-h-[100px]">
            <Button
              variant={btnVariant}
              size={btnSize}
              icon={Star}
              onClick={() => setClickCount((prev) => prev + 1)}
            >
              Componente Button Reutilizável
            </Button>
          </div>

          {/* Component Showcase Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
            <Card hover={false} className="p-4">
              <h5 className="font-semibold text-white text-sm mb-2 flex items-center gap-1.5">
                <CheckCircle size={16} className="text-emerald-400" /> Componente Badge
              </h5>
              <div className="flex flex-wrap gap-2">
                <Badge variant="blue">React 19</Badge>
                <Badge variant="purple">Vite</Badge>
                <Badge variant="emerald">Tailwind</Badge>
              </div>
            </Card>

            <Card hover={false} className="p-4">
              <h5 className="font-semibold text-white text-sm mb-2 flex items-center gap-1.5">
                <Info size={16} className="text-blue-400" /> Componente Alert
              </h5>
              <Alert type="info" message="Este alerta é um componente reutilizável." />
            </Card>

            <Card hover={false} className="p-4">
              <h5 className="font-semibold text-white text-sm mb-2 flex items-center gap-1.5">
                <Heart size={16} className="text-rose-400" /> Componente Card
              </h5>
              <p className="text-xs text-slate-400">
                Os cartões contêm estilos estruturados e isolados para conter outros elementos.
              </p>
            </Card>
          </div>
        </div>

        <CodeBlock code={sampleCode} title="CustomButton.jsx" />
      </div>
    </div>
  );
};
