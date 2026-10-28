import React, { useState } from 'react';
import { CodeBlock } from '../ui/CodeBlock';
import { Sparkles, Terminal } from 'lucide-react';

export const JsxConcept = () => {
  const [userName, setUserName] = useState('Dev React');
  const [favoriteTech, setFavoriteTech] = useState('TypeScript');
  const [counter, setCounter] = useState(5);

  const sampleJsxCode = `// Exemplo de JSX no React
function Greeting() {
  const name = "${userName}";
  const tech = "${favoriteTech}";
  const score = ${counter};

  return (
    <div className="card-container">
      <h1>Olá, {name}!</h1>
      <p>Sua tecnologia favorita é <strong>{tech}</strong>.</p>
      <p>Expressão matemática em JSX: {score} * 2 = <strong>{score * 2}</strong></p>
      <button onClick={() => alert('JSX interativo!')}>
        Clique aqui
      </button>
    </div>
  );
}`;

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <Sparkles className="text-blue-400" size={22} />
          01. JSX - JavaScript XML
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          O JSX permite escrever marcações parecidas com HTML dentro do código JavaScript. 
          Você pode interpolar variáveis e expressões diretamente dentro da sintaxe usando chaves <code>{"{ }"}</code>.
        </p>

        {/* Dynamic Playground */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
          <div>
            <h4 className="font-semibold text-slate-200 mb-4 text-sm flex items-center gap-2">
              <Terminal size={16} className="text-cyan-400" /> Playground de Interpolação JSX
            </h4>
            
            <div className="space-y-4 text-sm">
              <div>
                <label className="block text-slate-400 mb-1">Seu Nome ({`{name}`}):</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Tecnologia ({`{tech}`}):</label>
                <input
                  type="text"
                  value={favoriteTech}
                  onChange={(e) => setFavoriteTech(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Número ({`{score}`}):</label>
                <input
                  type="number"
                  value={counter}
                  onChange={(e) => setCounter(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* Rendered output */}
          <div className="flex flex-col justify-between bg-gradient-to-br from-slate-900 to-indigo-950/40 p-5 rounded-xl border border-cyan-500/20 shadow-inner">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-full border border-cyan-800/40">
                Resultado Renderizado pelo JSX
              </span>
              <div className="mt-4 space-y-2">
                <h2 className="text-2xl font-bold text-white">Olá, {userName || 'Dev'}!</h2>
                <p className="text-slate-300">
                  Sua tecnologia favorita é <span className="text-cyan-400 font-semibold">{favoriteTech || 'React'}</span>.
                </p>
                <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-slate-300 font-mono text-xs">
                  Cálculo dinâmico em JSX ({counter} * 2): <span className="text-emerald-400 font-bold">{counter * 2}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => alert(`Olá ${userName}! JSX compila para chamadas React puras.`)}
              className="mt-6 w-full py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium rounded-lg text-sm transition-all shadow-md cursor-pointer"
            >
              Executar Ação de Evento em JSX
            </button>
          </div>
        </div>

        <CodeBlock code={sampleJsxCode} title="Greeting.jsx" />
      </div>
    </div>
  );
};
