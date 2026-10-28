import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';
import { Button, Badge } from '../components/ui/UIComponents';

export const NotFoundPage = () => {
  return (
    <div className="py-20 text-center space-y-6 max-w-md mx-auto">
      <div className="w-20 h-20 mx-auto rounded-3xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
        <Compass size={40} />
      </div>

      <Badge variant="rose">Erro 404 • Rota Não Encontrada</Badge>

      <h1 className="text-3xl font-extrabold text-white">Página Não Encontrada</h1>

      <p className="text-slate-400 text-sm">
        O caminho acessado na URL não corresponde a nenhuma rota mapeada no <code>React Router</code>.
      </p>

      <Link to="/" className="inline-block pt-2">
        <Button variant="gradient" size="md" icon={Home}>
          Voltar para a Página Inicial
        </Button>
      </Link>
    </div>
  );
};
