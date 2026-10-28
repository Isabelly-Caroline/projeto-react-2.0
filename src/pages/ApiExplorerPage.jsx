import React, { useState, useEffect } from 'react';
import { Globe, Search, Star, GitFork, User, ExternalLink, RefreshCw, AlertCircle, Loader2 } from 'lucide-react';
import { Button, Badge, Alert, Card } from '../components/ui/UIComponents';

export const ApiExplorerPage = () => {
  const [searchTerm, setSearchTerm] = useState('facebook');
  const [userInfo, setUserInfo] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGithubData = async (query) => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const userRes = await fetch(`https://api.github.com/users/${query}`);
      if (!userRes.ok) throw new Error(`Usuário ou Organização "${query}" não encontrado.`);
      const userData = await userRes.json();
      setUserInfo(userData);

      const reposRes = await fetch(`https://api.github.com/users/${query}/repos?sort=updated&per_page=6`);
      if (reposRes.ok) {
        const reposData = await reposRes.json();
        setRepos(reposData);
      }
    } catch (err) {
      setError(err.message);
      setUserInfo(null);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGithubData('facebook');
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchGithubData(searchTerm);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <Badge variant="blue">Aplicação Prática • Conceitos 09 e 10</Badge>
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <Globe size={32} className="text-blue-400" />
          GitHub Dev & Tech Explorer
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
          Esta página demonstra na prática o consumo de APIs externas utilizando <code>useEffect</code>, <code>fetch()</code>, tratamento de erros HTTP, filtragem de listas e componentes controlados.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-3 max-w-xl pt-2">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-3 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar usuário ou org no GitHub..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-3 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          <Button type="submit" variant="primary" icon={Search} disabled={loading}>
            {loading ? 'Buscando...' : 'Buscar'}
          </Button>
        </form>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="p-16 bg-slate-900/60 rounded-2xl border border-slate-800 flex flex-col items-center justify-center space-y-4">
          <Loader2 className="animate-spin text-blue-400" size={40} />
          <p className="text-slate-300 font-mono text-sm">Carregando perfil e repositórios do GitHub...</p>
        </div>
      )}

      {/* Error Message */}
      {error && !loading && (
        <Alert type="error" title="Ops! Erro ao consultar a API">
          <p className="text-sm mb-3">{error}</p>
          <Button onClick={() => fetchGithubData(searchTerm)} variant="danger" size="sm" icon={RefreshCw}>
            Tentar Novamente
          </Button>
        </Alert>
      )}

      {/* User Info & Repos Grid */}
      {userInfo && !loading && !error && (
        <div className="space-y-6">
          {/* User Profile Banner */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={userInfo.avatar_url}
              alt={userInfo.name}
              className="w-24 h-24 rounded-full border-2 border-blue-500 shadow-xl"
            />
            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-2xl font-bold text-white">{userInfo.name || userInfo.login}</h2>
                  <p className="text-blue-400 text-sm font-mono">@{userInfo.login}</p>
                </div>
                <a
                  href={userInfo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-medium self-center sm:self-auto"
                >
                  Ver no GitHub <ExternalLink size={14} />
                </a>
              </div>

              <p className="text-slate-300 text-sm">{userInfo.bio || 'Sem biografia disponível.'}</p>

              <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-xs font-mono text-slate-400 pt-2 border-t border-slate-800">
                <span>Repositórios públicos: <strong className="text-white">{userInfo.public_repos}</strong></span>
                <span>Seguidores: <strong className="text-white">{userInfo.followers}</strong></span>
                <span>Seguindo: <strong className="text-white">{userInfo.following}</strong></span>
              </div>
            </div>
          </div>

          {/* Repositories Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Repositórios Recentes ({repos.length})</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {repos.map((repo) => (
                <Card key={repo.id} className="p-5 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-blue-400 text-base truncate">{repo.name}</h4>
                      {repo.language && <Badge variant="purple">{repo.language}</Badge>}
                    </div>
                    <p className="text-slate-400 text-xs line-clamp-2">
                      {repo.description || 'Sem descrição cadastrada.'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-800 font-mono">
                    <span className="flex items-center gap-1"><Star size={14} className="text-amber-400" /> {repo.stargazers_count}</span>
                    <span className="flex items-center gap-1"><GitFork size={14} /> {repo.forks_count}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
