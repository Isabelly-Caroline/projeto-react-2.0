import React, { useState } from 'react';
import { CodeBlock } from '../ui/CodeBlock';
import { ArrowRightLeft, User, ShieldCheck, Mail, Sparkles } from 'lucide-react';
import { Badge } from '../ui/UIComponents';

// Child component that receives props
const UserProfileCard = ({ name, role, email, status, avatarBg, onStatusToggle, children }) => {
  return (
    <div className="bg-slate-900 border border-slate-700/80 rounded-xl p-5 shadow-lg space-y-4">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full ${avatarBg} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
          {name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h4 className="font-bold text-white text-base">{name}</h4>
          <p className="text-xs text-slate-400 flex items-center gap-1">
            <Mail size={12} /> {email}
          </p>
        </div>
        <div className="ml-auto">
          <Badge variant={status === 'Ativo' ? 'emerald' : 'rose'}>{status}</Badge>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs border-t border-slate-800 pt-3">
        <span className="text-slate-400 flex items-center gap-1">
          <ShieldCheck size={14} className="text-amber-400" /> Papel (Role Prop): <strong>{role}</strong>
        </span>
        <button
          onClick={onStatusToggle}
          className="text-indigo-400 hover:text-indigo-300 font-medium underline cursor-pointer"
        >
          Alternar Status (Callback Prop)
        </button>
      </div>

      {/* Children Prop Section */}
      {children && (
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs text-slate-300">
          <span className="text-purple-400 font-semibold block mb-1">Passado via prop "children":</span>
          {children}
        </div>
      )}
    </div>
  );
};

export const PropsConcept = () => {
  const [name, setName] = useState('Isabelly Pardim');
  const [role, setRole] = useState('Engenheira Frontend');
  const [email, setEmail] = useState('isabelly@exemplo.com');
  const [status, setStatus] = useState('Ativo');
  const [avatarColor, setAvatarColor] = useState('bg-gradient-to-r from-indigo-500 to-purple-500');

  const codeExample = `// Componente Filho recebendo Props via desestruturação
function UserProfileCard({ name, role, email, status, onStatusToggle, children }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{email}</p>
      <span>{role}</span>
      <button onClick={onStatusToggle}>Mudar Status</button>
      <div>{children}</div>
    </div>
  );
}

// Componente Pai passando Props para o Filho
function ParentComponent() {
  const handleToggle = () => alert('Status alterado!');

  return (
    <UserProfileCard
      name="${name}"
      role="${role}"
      email="${email}"
      status="${status}"
      onStatusToggle={handleToggle}
    >
      <p>Conteúdo enviado via children prop!</p>
    </UserProfileCard>
  );
}`;

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <ArrowRightLeft className="text-amber-400" size={22} />
          03. Props - Passagem de Informações
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          Props são os argumentos passados para os componentes React. Elas permitem que dados e funções de callback fluam dos componentes pais para os componentes filhos de forma unidirecional.
        </p>

        {/* Interactive Parent-Child Playground */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
          {/* Parent Form Controls */}
          <div className="space-y-4 text-sm">
            <h4 className="font-semibold text-amber-400 flex items-center gap-1.5">
              <User size={16} /> Componente Pai (Altera as Props)
            </h4>
            
            <div>
              <label className="block text-slate-400 mb-1">Prop `name`:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Prop `role`:</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Prop `email`:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Cor do Avatar (Prop `avatarBg`):</label>
              <select
                value={avatarColor}
                onChange={(e) => setAvatarColor(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white"
              >
                <option value="bg-gradient-to-r from-indigo-500 to-purple-500">Roxo / Índigo</option>
                <option value="bg-gradient-to-r from-amber-500 to-rose-500">Laranja / Rosa</option>
                <option value="bg-gradient-to-r from-emerald-500 to-teal-500">Verde Esmeralda</option>
              </select>
            </div>
          </div>

          {/* Child Component Instance */}
          <div className="space-y-3">
            <h4 className="font-semibold text-emerald-400 flex items-center gap-1.5">
              <Sparkles size={16} /> Componente Filho (Recebe as Props)
            </h4>

            <UserProfileCard
              name={name || 'Usuário'}
              role={role || 'Membro'}
              email={email || 'email@exemplo.com'}
              status={status}
              avatarBg={avatarColor}
              onStatusToggle={() => setStatus((prev) => (prev === 'Ativo' ? 'Inativo' : 'Ativo'))}
            >
              🚀 Esta mensagem é uma tag JSX injetada dentro da prop especial <code className="text-amber-400 font-bold">children</code>!
            </UserProfileCard>
          </div>
        </div>

        <CodeBlock code={codeExample} title="ParentAndChildProps.jsx" />
      </div>
    </div>
  );
};
