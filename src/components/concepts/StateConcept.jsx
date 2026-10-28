import React, { useState } from 'react';
import { CodeBlock } from '../ui/CodeBlock';
import { Database, Plus, Minus, RotateCcw, Palette, History, User } from 'lucide-react';
import { Button, Badge } from '../ui/UIComponents';

export const StateConcept = () => {
  // Simple state
  const [count, setCount] = useState(0);
  
  // Theme state
  const [activeTheme, setActiveTheme] = useState('indigo');

  // Complex Object State
  const [userProfile, setUserProfile] = useState({
    name: 'Isabelly',
    role: 'Desenvolvedora React',
    level: 1,
    likes: 12
  });

  // History array state
  const [history, setHistory] = useState([]);

  const incrementCount = () => {
    setCount(prev => prev + 1);
    setHistory(prev => [`Incrementou contador para ${count + 1}`, ...prev.slice(0, 4)]);
  };

  const decrementCount = () => {
    setCount(prev => prev - 1);
    setHistory(prev => [`Decrementou contador para ${count - 1}`, ...prev.slice(0, 4)]);
  };

  const levelUpUser = () => {
    setUserProfile(prev => ({
      ...prev,
      level: prev.level + 1,
      likes: prev.likes + 5
    }));
    setHistory(prev => [`Subiu nível do usuário para ${userProfile.level + 1}`, ...prev.slice(0, 4)]);
  };

  const codeExample = `// Declaração do estado com o hook useState
import { useState } from 'react';

function Counter() {
  // Retorna [valorAtual, funcaoParaAtualizar]
  const [count, setCount] = useState(0);

  // Atualizando estado simples
  const handleAdd = () => setCount(prevCount => prevCount + 1);

  // Atualizando objeto mantendo imutabilidade
  const [user, setUser] = useState({ name: 'Isabelly', level: 1 });
  const handleLevelUp = () => {
    setUser(prevUser => ({
      ...prevUser, // Copia propriedades antigas
      level: prevUser.level + 1 // Atualiza propriedade específica
    }));
  };

  return <button onClick={handleAdd}>Contador: {count}</button>;
}`;

  const themeGradients = {
    indigo: 'from-indigo-600 to-blue-600',
    purple: 'from-purple-600 to-pink-600',
    emerald: 'from-emerald-600 to-teal-600',
    amber: 'from-amber-600 to-orange-600'
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <Database className="text-sky-400" size={22} />
          07. State e useState - Estado Reativo
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          O estado (state) é a memória do componente. Ao atualizar o estado com a função retornada por <code>useState</code>, o React dispara automaticamente um re-render para refletir as alterações na interface.
        </p>

        {/* Live Playground */}
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Counter State */}
            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4">
              <h4 className="font-semibold text-white text-sm flex items-center gap-2">
                <Plus size={16} className="text-sky-400" /> 1. Estado Numérico Simples
              </h4>

              <div className="flex items-center justify-center gap-6 py-4 bg-slate-950 rounded-xl border border-slate-800">
                <Button onClick={decrementCount} variant="danger" size="md" icon={Minus}>
                  Subtrair
                </Button>
                <span className="font-mono text-3xl font-bold text-white min-w-[60px] text-center">
                  {count}
                </span>
                <Button onClick={incrementCount} variant="success" size="md" icon={Plus}>
                  Somar
                </Button>
              </div>

              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Estado Reativo React</span>
                <button
                  onClick={() => { setCount(0); setHistory([]); }}
                  className="text-slate-500 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw size={12} /> Resetar
                </button>
              </div>
            </div>

            {/* 2. Complex Object State */}
            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4">
              <h4 className="font-semibold text-white text-sm flex items-center gap-2">
                <User size={16} className="text-purple-400" /> 2. Estado de Objeto Complexo
              </h4>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Desenvolvedor:</span>
                  <span className="font-bold text-white">{userProfile.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Cargo:</span>
                  <span className="text-purple-400 font-medium">{userProfile.role}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                  <span className="text-slate-400">Nível Dev:</span>
                  <Badge variant="purple">Nível {userProfile.level}</Badge>
                </div>
              </div>

              <Button onClick={levelUpUser} variant="gradient" size="sm" className="w-full">
                Evoluir Nível no Estado (+1 Level)
              </Button>
            </div>
          </div>

          {/* Theme Selector State & History */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
            {/* Theme Picker */}
            <div className="space-y-3">
              <h4 className="font-semibold text-white text-sm flex items-center gap-2">
                <Palette size={16} className="text-pink-400" /> 3. Seletor de Tema
              </h4>
              <div className="flex gap-2">
                {Object.keys(themeGradients).map((theme) => (
                  <button
                    key={theme}
                    onClick={() => setActiveTheme(theme)}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r ${themeGradients[theme]} transition-transform cursor-pointer ${activeTheme === theme ? 'ring-2 ring-white scale-105 shadow-lg' : 'opacity-70 hover:opacity-100'}`}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>

            {/* History stack */}
            <div className="space-y-3">
              <h4 className="font-semibold text-white text-sm flex items-center gap-2">
                <History size={16} className="text-amber-400" /> Histórico de Mutação de Estado
              </h4>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 h-24 overflow-y-auto space-y-1 font-mono text-xs text-slate-400">
                {history.length === 0 ? (
                  <p className="text-slate-600 italic">Nenhuma ação registrada ainda...</p>
                ) : (
                  history.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-amber-400">›</span> {item}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <CodeBlock code={codeExample} title="UseStateExamples.jsx" />
      </div>
    </div>
  );
};
