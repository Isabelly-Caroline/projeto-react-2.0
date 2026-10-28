import React, { useState, useEffect } from 'react';
import { CodeBlock } from '../ui/CodeBlock';
import { RefreshCw, Clock, Monitor, Play, Pause, RotateCcw } from 'lucide-react';
import { Button, Badge } from '../ui/UIComponents';

export const UseEffectConcept = () => {
  // Demo 1: Timer effect with cleanup
  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Demo 2: Window resize listener effect with cleanup
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Demo 3: Dependency trigger effect
  const [searchTerm, setSearchTerm] = useState('React');
  const [effectLogs, setEffectLogs] = useState([]);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
    // Cleanup function executed on unmount or re-run
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  // Window resize effect
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Search dependency effect
  useEffect(() => {
    const timestamp = new Date().toLocaleTimeString();
    setEffectLogs(prev => [`[${timestamp}] Efeito executado para a dependência: "${searchTerm}"`, ...prev.slice(0, 4)]);
  }, [searchTerm]);

  const codeExample = `// Efeito com 3 variações de dependências e função de Limpeza (Cleanup)

// 1. Executa apenas na MONTAGEM do componente ([])
useEffect(() => {
  console.log('Componente montado!');
}, []);

// 2. Executa na montagem E quando 'searchTerm' for alterado ([searchTerm])
useEffect(() => {
  console.log('Buscar dados para:', searchTerm);
}, [searchTerm]);

// 3. Efeito com Limpeza / Cleanup (Timer ou Event Listener)
useEffect(() => {
  const timer = setInterval(() => {
    setSeconds(s => s + 1);
  }, 1000);

  // Função de Limpeza disparada antes de re-executar ou desmontar
  return () => clearInterval(timer);
}, [isTimerRunning]);`;

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <RefreshCw className="text-teal-400" size={22} />
          09. useEffect - Efeitos Colaterais e Sincronização
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          O hook <code>useEffect</code> permite sincronizar o componente com sistemas externos: realizar chamadas a APIs, registrar event listeners globais, configurar cronômetros e persistir dados no localStorage.
        </p>

        {/* Live Playground */}
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Demo 1: Timer with Cleanup */}
            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-3">
              <h4 className="font-semibold text-teal-400 text-sm flex items-center gap-2">
                <Clock size={16} /> Timer & Cleanup
              </h4>
              <div className="p-4 bg-slate-950 rounded-xl text-center border border-slate-800">
                <span className="font-mono text-3xl font-bold text-teal-400">{seconds}s</span>
                <p className="text-[10px] text-slate-500 mt-1">clearInterval executado no Cleanup</p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  variant={isTimerRunning ? 'danger' : 'success'}
                  size="sm"
                  className="flex-1"
                  icon={isTimerRunning ? Pause : Play}
                >
                  {isTimerRunning ? 'Pausar' : 'Iniciar'}
                </Button>
                <Button onClick={() => setSeconds(0)} variant="secondary" size="sm" icon={RotateCcw}>
                  Reset
                </Button>
              </div>
            </div>

            {/* Demo 2: Window Resize Event Listener */}
            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-3">
              <h4 className="font-semibold text-blue-400 text-sm flex items-center gap-2">
                <Monitor size={16} /> Listener de Janela
              </h4>
              <div className="p-4 bg-slate-950 rounded-xl text-center border border-slate-800">
                <span className="font-mono text-2xl font-bold text-white">{windowWidth} px</span>
                <p className="text-[10px] text-slate-500 mt-1">Redimensione a janela do navegador</p>
              </div>
              <p className="text-xs text-slate-400 text-center">
                <code>removeEventListener</code> limpa o listener quando o componente é desmontado.
              </p>
            </div>

            {/* Demo 3: Dependency Array */}
            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-3">
              <h4 className="font-semibold text-amber-400 text-sm flex items-center gap-2">
                <RefreshCw size={16} /> Array de Dependências
              </h4>
              <div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  placeholder="Digite para disparar efeito..."
                />
              </div>
              <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 h-20 overflow-y-auto space-y-1 text-[11px] font-mono text-slate-400">
                {effectLogs.map((log, i) => (
                  <p key={i}>{log}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <CodeBlock code={codeExample} title="UseEffectLifecycle.jsx" />
      </div>
    </div>
  );
};
