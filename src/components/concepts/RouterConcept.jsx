import React, { useState } from 'react';
import { CodeBlock } from '../ui/CodeBlock';
import { Compass, Link as LinkIcon, ExternalLink, ArrowRight, CornerDownRight } from 'lucide-react';
import { Button, Badge } from '../ui/UIComponents';

export const RouterConcept = () => {
  const [simulatedPath, setSimulatedPath] = useState('/conceito/01-jsx');
  const [queryParams, setQueryParams] = useState('sort=asc&filter=react');

  const simulatedRoutes = [
    { path: '/', label: 'Início / Dashboard' },
    { path: '/conceitos', label: 'Hub dos 11 Conceitos' },
    { path: '/conceito/01-jsx', label: 'Detalhe do Conceito ID' },
    { path: '/api-explorer', label: 'Consumo de API Real' },
    { path: '/gerenciador', label: 'Gerenciador de Tarefas' },
    { path: '/pagina-inexistente', label: 'Rota 404 (Not Found)' }
  ];

  const codeExample = `// Configuração do React Router DOM (v6 / v7)
import { BrowserRouter, Routes, Route, NavLink, useParams, useNavigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      {/* Menu de Navegação SPA */}
      <nav>
        <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
        <NavLink to="/conceito/jsx">JSX</NavLink>
      </nav>

      {/* Mapeamento de Rotas */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/conceito/:conceptId" element={<ConceptDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

// Lendo parâmetros de URL dinâmicos com useParams()
function ConceptDetailPage() {
  const { conceptId } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h2>Conceito Atual: {conceptId}</h2>
      <button onClick={() => navigate('/')}>Voltar para Home</button>
    </div>
  );
}`;

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <Compass className="text-rose-400" size={22} />
          11. React Router - Organização de Páginas e Navegação SPA
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          O React Router permite transformar o aplicativo em uma aplicação de página única (Single Page Application - SPA). Ele escuta alterações na URL e troca os componentes renderizados instantaneamente sem recarregar o navegador.
        </p>

        {/* Live Router Simulator */}
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
          {/* Virtual Browser Address Bar */}
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            </div>
            
            <div className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 font-mono text-xs text-slate-300 flex items-center gap-1">
              <span className="text-slate-500">https://reactmaster.dev</span>
              <span className="text-rose-400 font-bold">{simulatedPath}</span>
              {queryParams && <span className="text-amber-400">?{queryParams}</span>}
            </div>
          </div>

          {/* Navigation Links Simulator */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white text-sm">Simulador de Clique em {`<NavLink>`}:</h4>
            <div className="flex flex-wrap gap-2">
              {simulatedRoutes.map((route) => {
                const isActive = simulatedPath === route.path;
                return (
                  <button
                    key={route.path}
                    onClick={() => setSimulatedPath(route.path)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${isActive ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30' : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'}`}
                  >
                    <LinkIcon size={12} />
                    {route.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Route Matching Inspection */}
          <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
            <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <CornerDownRight size={14} className="text-rose-400" /> Resolução de Rota Ativa
            </h5>

            <div className="font-mono text-xs space-y-2">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Componente Renderizado:</span>
                <span className="text-emerald-400 font-bold">
                  {simulatedPath === '/' && '<HomePage />'}
                  {simulatedPath === '/conceitos' && '<ConceptsHubPage />'}
                  {simulatedPath.startsWith('/conceito/') && '<ConceptDetailPage />'}
                  {simulatedPath === '/api-explorer' && '<ApiExplorerPage />'}
                  {simulatedPath === '/gerenciador' && '<TaskManagerPage />'}
                  {simulatedPath === '/pagina-inexistente' && '<NotFound404Page />'}
                </span>
              </div>

              {simulatedPath.startsWith('/conceito/') && (
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex justify-between items-center text-amber-400">
                  <span>useParams():</span>
                  <span>{`{ conceptId: "${simulatedPath.replace('/conceito/', '')}" }`}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <CodeBlock code={codeExample} title="ReactRouterSetup.jsx" />
      </div>
    </div>
  );
};
