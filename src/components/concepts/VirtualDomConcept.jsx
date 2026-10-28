import React, { useState, useEffect } from 'react';
import { CodeBlock } from '../ui/CodeBlock';
import { Zap, Activity, RefreshCw, Cpu, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/UIComponents';

export const VirtualDomConcept = () => {
  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(10);
  const [titleText, setTitleText] = useState('Painel Reativo');
  const [renderStats, setRenderStats] = useState({ totalRenders: 0, nodeAUpdates: 0, nodeBUpdates: 0, titleUpdates: 0 });
  const [lastUpdatedNode, setLastUpdatedNode] = useState(null);

  const triggerNodeA = () => {
    setCountA(prev => prev + 1);
    setLastUpdatedNode('nodeA');
    setRenderStats(prev => ({
      ...prev,
      totalRenders: prev.totalRenders + 1,
      nodeAUpdates: prev.nodeAUpdates + 1
    }));
  };

  const triggerNodeB = () => {
    setCountB(prev => prev + 5);
    setLastUpdatedNode('nodeB');
    setRenderStats(prev => ({
      ...prev,
      totalRenders: prev.totalRenders + 1,
      nodeBUpdates: prev.nodeBUpdates + 1
    }));
  };

  const updateTitle = (val) => {
    setTitleText(val);
    setLastUpdatedNode('titleNode');
    setRenderStats(prev => ({
      ...prev,
      totalRenders: prev.totalRenders + 1,
      titleUpdates: prev.titleUpdates + 1
    }));
  };

  useEffect(() => {
    if (lastUpdatedNode) {
      const timer = setTimeout(() => setLastUpdatedNode(null), 1200);
      return () => clearTimeout(timer);
    }
  }, [lastUpdatedNode, countA, countB, titleText]);

  const codeExample = `// O algoritmo do Virtual DOM do React (Fiber):
// 1. Quando o estado muda, o React constrói uma nova árvore Virtual DOM.
// 2. Compara a árvore antiga e a nova árvore (Algoritmo Diffing).
// 3. Calcula o menor número de mutações necessárias no DOM Real.
// 4. Aplica em um único "batch" apenas nos elementos alterados.

function VirtualDomDemo() {
  const [count, setCount] = useState(0);

  // Apenas o <span>{count}</span> será atualizado no DOM real pelo React!
  return (
    <div>
      <h2>Título Estático (Nenhum Re-render no DOM Real)</h2>
      <p>Contador Dinâmico: <span>{count}</span></p>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>
    </div>
  );
}`;

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <Zap className="text-emerald-400" size={22} />
          04. Virtual DOM - Reconciliação Eficiente
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          O Virtual DOM é uma representação em memória da árvore DOM. Em vez de alterar o navegador diretamente a cada mudança, o React compara (Diffing) a árvore antiga com a nova e atualiza apenas os nós que realmente mudaram.
        </p>

        {/* Live Diffing Simulator */}
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center gap-3">
              <Cpu className="text-emerald-400" size={24} />
              <div>
                <h4 className="font-bold text-white text-sm">Monitor em Tempo Real do Virtual DOM</h4>
                <p className="text-xs text-slate-400">Clique nos botões para disparar atualizações e observe o algoritmo Fiber re-renderizar apenas o nó específico.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-emerald-400">
                Total Re-renders: <span className="font-bold text-base">{renderStats.totalRenders}</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
              <label className="block text-xs font-semibold text-slate-400">Alterar Nó A (Contador A)</label>
              <Button onClick={triggerNodeA} variant="success" size="sm" className="w-full">
                Mudar Estado A (+1)
              </Button>
              <p className="text-xs text-slate-500">Renderizou {renderStats.nodeAUpdates}x</p>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
              <label className="block text-xs font-semibold text-slate-400">Alterar Nó B (Contador B)</label>
              <Button onClick={triggerNodeB} variant="primary" size="sm" className="w-full">
                Mudar Estado B (+5)
              </Button>
              <p className="text-xs text-slate-500">Renderizou {renderStats.nodeBUpdates}x</p>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
              <label className="block text-xs font-semibold text-slate-400">Alterar Nó Título</label>
              <input
                type="text"
                value={titleText}
                onChange={(e) => updateTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-1.5 text-xs text-white"
              />
              <p className="text-xs text-slate-500">Renderizou {renderStats.titleUpdates}x</p>
            </div>
          </div>

          {/* DOM Tree Representation Visualizer */}
          <div className="p-6 bg-slate-900/80 rounded-xl border border-slate-800">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <Activity size={16} className="text-emerald-400" /> Árvore Virtual DOM vs Atualização no DOM Real
            </h5>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Title Node */}
              <div className={`p-4 rounded-xl border transition-all duration-300 ${lastUpdatedNode === 'titleNode' ? 'bg-emerald-500/20 border-emerald-400 shadow-lg shadow-emerald-500/20 scale-[1.02]' : 'bg-slate-950 border-slate-800'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-purple-400">{`<h3 id="title">`}</span>
                  {lastUpdatedNode === 'titleNode' && <span className="text-[10px] bg-emerald-400 text-slate-950 px-2 py-0.5 rounded font-bold animate-pulse">DOM MUTADO</span>}
                </div>
                <p className="font-bold text-white text-sm">{titleText}</p>
              </div>

              {/* Node A */}
              <div className={`p-4 rounded-xl border transition-all duration-300 ${lastUpdatedNode === 'nodeA' ? 'bg-emerald-500/20 border-emerald-400 shadow-lg shadow-emerald-500/20 scale-[1.02]' : 'bg-slate-950 border-slate-800'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-blue-400">{`<span id="nodeA">`}</span>
                  {lastUpdatedNode === 'nodeA' && <span className="text-[10px] bg-emerald-400 text-slate-950 px-2 py-0.5 rounded font-bold animate-pulse">DOM MUTADO</span>}
                </div>
                <p className="font-mono text-xl font-bold text-emerald-400">{countA}</p>
              </div>

              {/* Node B */}
              <div className={`p-4 rounded-xl border transition-all duration-300 ${lastUpdatedNode === 'nodeB' ? 'bg-emerald-500/20 border-emerald-400 shadow-lg shadow-emerald-500/20 scale-[1.02]' : 'bg-slate-950 border-slate-800'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-amber-400">{`<span id="nodeB">`}</span>
                  {lastUpdatedNode === 'nodeB' && <span className="text-[10px] bg-emerald-400 text-slate-950 px-2 py-0.5 rounded font-bold animate-pulse">DOM MUTADO</span>}
                </div>
                <p className="font-mono text-xl font-bold text-cyan-400">{countB}</p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-slate-950/60 rounded-lg text-xs text-slate-400 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <span>O React economiza poder de processamento atualizando pontualmente no navegador apenas a caixa destacada.</span>
            </div>
          </div>
        </div>

        <CodeBlock code={codeExample} title="VirtualDomDiffing.jsx" />
      </div>
    </div>
  );
};
