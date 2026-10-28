import React, { useState, useEffect } from 'react';
import { CodeBlock } from '../ui/CodeBlock';
import { Globe, Search, RefreshCw, AlertTriangle, ExternalLink, Loader2 } from 'lucide-react';
import { Button, Badge, Alert } from '../ui/UIComponents';

export const ApiConsumerConcept = () => {
  const [username, setSearchQuery] = useState('reactjs');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGithubRepo = async (query) => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.github.com/orgs/${query}/repos?per_page=4`);
      if (!response.ok) {
        throw new Error(`Organização "${query}" não encontrada no GitHub (HTTP ${response.status}).`);
      }
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGithubRepo(username);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchGithubRepo(username);
  };

  const codeExample = `// Consumo de API REST com useEffect e 3 Estados (Loading, Data, Error)
function ApiFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await fetch('https://api.github.com/orgs/reactjs/repos?per_page=4');
        if (!res.ok) throw new Error('Falha na requisição');
        const result = await res.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <p>Carregando dados da API...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <ul>
      {data.map(repo => <li key={repo.id}>{repo.name}</li>)}
    </ul>
  );
}`;

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <Globe className="text-indigo-400" size={22} />
          10. Consumo de APIs - Integração HTTP Assíncrona
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          Aplicações React modernas interagem com servidores externos consumindo serviços de API REST ou GraphQL. Gerenciar os estados de <strong>Carregando (Loading)</strong>, <strong>Sucesso (Data)</strong> e <strong>Erro (Error)</strong> garante uma experiência de usuário profissional.
        </p>

        {/* Live API Fetcher Playground */}
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-3 text-slate-500" />
              <input
                type="text"
                value={username}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Digite o nome de uma organização GitHub (ex: reactjs, facebook, google)..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <Button type="submit" variant="gradient" icon={Search} disabled={loading}>
              {loading ? 'Buscando...' : 'Buscar API'}
            </Button>
          </form>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400">Sugestões rápidas:</span>
            {['reactjs', 'facebook', 'vercel', 'vercel-labs', 'invalid-org-test'].map((org) => (
              <button
                key={org}
                onClick={() => { setSearchQuery(org); fetchGithubRepo(org); }}
                className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:border-indigo-500 hover:text-white transition-colors cursor-pointer"
              >
                {org}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="p-12 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col items-center justify-center space-y-3">
              <Loader2 className="animate-spin text-indigo-400" size={36} />
              <p className="text-sm text-slate-300 font-medium">Requisitando API do GitHub via <code>fetch()</code>...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <Alert type="error" title="Erro no Consumo de API">
              <p className="text-sm mb-3">{error}</p>
              <Button onClick={() => fetchGithubRepo(username)} variant="danger" size="sm" icon={RefreshCw}>
                Tentar Novamente
              </Button>
            </Alert>
          )}

          {/* Data Success State */}
          {data && !loading && !error && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-white text-sm">Repositórios Retornados da API ({data.length})</h4>
                <Badge variant="emerald">200 OK HTTP</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.map((repo) => (
                  <div key={repo.id} className="p-4 bg-slate-900 rounded-xl border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="font-bold text-indigo-400 text-sm">{repo.name}</h5>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-500 hover:text-white"
                        >
                          <ExternalLink size={14} />
                        </a>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2">
                        {repo.description || 'Sem descrição cadastrada neste repositório.'}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-800/80 font-mono">
                      <span>★ {repo.stargazers_count} stars</span>
                      <span>Forks: {repo.forks_count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <CodeBlock code={codeExample} title="FetchApiRest.jsx" />
      </div>
    </div>
  );
};
