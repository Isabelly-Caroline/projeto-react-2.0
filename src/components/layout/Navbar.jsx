import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Code2, LayoutGrid, Globe, CheckSquare, Info, Sparkles } from 'lucide-react';
import { Badge } from '../ui/UIComponents';

export const Navbar = () => {
  const navItems = [
    { path: '/', label: 'Início', icon: LayoutGrid },
    { path: '/conceitos', label: '11 Conceitos', icon: Code2 },
    { path: '/api-explorer', label: 'API Explorer', icon: Globe },
    { path: '/gerenciador', label: 'Gerenciador', icon: CheckSquare },
    { path: '/sobre', label: 'Sobre', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            <Code2 size={22} />
          </div>
          <div>
            <h1 className="font-bold text-white text-base leading-tight group-hover:text-indigo-400 transition-colors">
              ReactMaster <span className="text-xs bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded border border-indigo-500/30">2.0</span>
            </h1>
            <p className="text-[10px] text-slate-400">Guia Prático dos 11 Conceitos</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                  }`
                }
              >
                <Icon size={15} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Status Badge */}
        <div className="flex items-center gap-3">
          <Badge variant="emerald" className="hidden sm:inline-flex gap-1.5 px-3 py-1">
            <Sparkles size={12} />
            <span>11 / 11 Conceitos OK</span>
          </Badge>
        </div>
      </div>
    </header>
  );
};
