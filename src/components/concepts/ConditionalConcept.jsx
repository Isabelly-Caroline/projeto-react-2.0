import React, { useState } from 'react';
import { CodeBlock } from '../ui/CodeBlock';
import { GitFork, UserCheck, ShieldAlert, LogIn, LogOut, CheckCircle, Loader2 } from 'lucide-react';
import { Button, Badge, Card } from '../ui/UIComponents';

export const ConditionalConcept = () => {
  const [userRole, setUserRole] = useState('guest'); // guest, user, admin
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(true);

  const toggleLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  const codeExample = `// 1. Operador Ternário (condição ? A : B)
const UserProfile = ({ isLoggedIn }) => (
  <div>{isLoggedIn ? <Dashboard /> : <LoginForm />}</div>
);

// 2. Operador Curto-Circuito (condição && <Elemento />)
const Notification = ({ hasUnread }) => (
  <div>{hasUnread && <span className="badge">Novas mensagens!</span>}</div>
);

// 3. Retorno Antecipado (Early Return com Guard Clause)
function AdminPanel({ role }) {
  if (role !== 'admin') {
    return <p>Acesso negado. Apenas administradores.</p>;
  }
  return <AdminDashboard />;
}`;

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <GitFork className="text-violet-400" size={22} />
          06. Renderização Condicional - Exibição Dinâmica
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          Permite mostrar diferentes elementos de UI dependendo das condições de negócio, como autenticação de usuários, estados de carregamento (loading), permissões e notificações ativas.
        </p>

        {/* Live Playground */}
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <label className="block text-xs font-semibold text-slate-400">Papel do Usuário (Nível de Acesso)</label>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={userRole === 'guest' ? 'primary' : 'outline'}
                  onClick={() => setUserRole('guest')}
                >
                  Visitante
                </Button>
                <Button
                  size="sm"
                  variant={userRole === 'user' ? 'primary' : 'outline'}
                  onClick={() => setUserRole('user')}
                >
                  Membro
                </Button>
                <Button
                  size="sm"
                  variant={userRole === 'admin' ? 'gradient' : 'outline'}
                  onClick={() => setUserRole('admin')}
                >
                  Admin
                </Button>
              </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <label className="block text-xs font-semibold text-slate-400">Estado de Carregamento (Loading)</label>
              <Button onClick={toggleLoading} variant="secondary" size="sm" icon={Loader2} className="w-full">
                Simular Carregamento
              </Button>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <label className="block text-xs font-semibold text-slate-400">Notificação Flutuante (&&)</label>
              <Button
                onClick={() => setShowNotification(!showNotification)}
                variant={showNotification ? 'danger' : 'success'}
                size="sm"
                className="w-full"
              >
                {showNotification ? 'Ocultar Notificação' : 'Exibir Notificação'}
              </Button>
            </div>
          </div>

          {/* Rendered Dynamic Views */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white text-sm">Resultado Renderizado Condicionalmente:</h4>

            {/* Notification Banner using && */}
            {showNotification && (
              <div className="p-4 bg-violet-500/10 border border-violet-500/30 rounded-xl text-violet-300 text-sm flex items-center justify-between animate-fade-in">
                <span className="flex items-center gap-2">
                  <CheckCircle size={18} />
                  Operador <code>&&</code>: Notificação visível apenas quando showNotification é verdadeiro!
                </span>
                <Badge variant="purple">Ativo</Badge>
              </div>
            )}

            {/* Loading vs Content using Ternary */}
            {isLoading ? (
              <div className="p-8 bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center justify-center space-y-3">
                <Loader2 className="animate-spin text-violet-400" size={32} />
                <p className="text-sm text-slate-400 font-mono">Carregando dados do servidor...</p>
              </div>
            ) : (
              <div className="p-6 bg-slate-900 rounded-xl border border-slate-800">
                {/* Switch / Early Return Based on Role */}
                {userRole === 'guest' && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <LogIn className="text-amber-400" size={24} />
                      <div>
                        <h5 className="font-bold text-white text-base">Modo Visitante</h5>
                        <p className="text-xs text-slate-400">Faça login para acessar relatórios avançados.</p>
                      </div>
                    </div>
                    <Badge variant="amber">Acesso Restrito</Badge>
                  </div>
                )}

                {userRole === 'user' && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <UserCheck className="text-blue-400" size={24} />
                      <div>
                        <h5 className="font-bold text-white text-base">Bem-vindo, Membro!</h5>
                        <p className="text-xs text-slate-400">Acesso liberado para conteúdos padrão e perfil.</p>
                      </div>
                    </div>
                    <Badge variant="blue">Membro Ativo</Badge>
                  </div>
                )}

                {userRole === 'admin' && (
                  <div className="flex items-center justify-between bg-gradient-to-r from-purple-950/40 to-slate-900 p-4 rounded-lg border border-purple-500/30">
                    <div className="flex items-center gap-3">
                      <ShieldAlert className="text-purple-400" size={24} />
                      <div>
                        <h5 className="font-bold text-white text-base">Painel do Administrador</h5>
                        <p className="text-xs text-slate-400">Acesso completo: Editar, deletar e gerenciar permissões.</p>
                      </div>
                    </div>
                    <Badge variant="purple">Acesso Total</Badge>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <CodeBlock code={codeExample} title="ConditionalRender.jsx" />
      </div>
    </div>
  );
};
