import React, { useState, useEffect } from 'react';
import { CheckSquare, Plus, Trash2, CheckCircle2, Clock, Filter, Sparkles, RefreshCw } from 'lucide-react';
import { Button, Badge, Card, Alert } from '../components/ui/UIComponents';

export const TaskManagerPage = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('reactmaster_tasks');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [
      { id: '1', title: 'Estudar JSX e interpolação', category: 'Estudos', priority: 'Alta', completed: true },
      { id: '2', title: 'Criar componentes reutilizáveis', category: 'Desenvolvimento', priority: 'Média', completed: true },
      { id: '3', title: 'Testar re-renders com Virtual DOM', category: 'Prática', priority: 'Alta', completed: false },
      { id: '4', title: 'Consumir API REST do GitHub', category: 'Projetos', priority: 'Alta', completed: false }
    ];
  });

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Estudos');
  const [priority, setPriority] = useState('Média');
  const [filter, setFilter] = useState('all'); // all, pending, completed

  // Sync tasks to localStorage with useEffect (Concept 09)
  useEffect(() => {
    localStorage.setItem('reactmaster_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      title,
      category,
      priority,
      completed: false
    };

    setTasks([newTask, ...tasks]);
    setTitle('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'pending') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <Badge variant="emerald">Projeto Prático Completo • Integração dos 11 Conceitos</Badge>
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <CheckSquare size={32} className="text-emerald-400" />
          Gerenciador de Tarefas & Projetos
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
          Aplicação interativa que utiliza <strong>State (useState)</strong>, <strong>Efeitos (useEffect + localStorage)</strong>, <strong>Formulários Controlados</strong>, <strong>Renderização Condicional</strong>, <strong>Listas com Keys</strong> e <strong>Componentes UI</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Panel */}
        <Card hover={false} className="space-y-4 self-start">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Plus size={18} className="text-emerald-400" /> Nova Tarefa
          </h2>

          <form onSubmit={handleAddTask} className="space-y-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Título da Tarefa *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Implementar React Router..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Categoria</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:border-emerald-500"
              >
                <option value="Estudos">Estudos React</option>
                <option value="Desenvolvimento">Desenvolvimento</option>
                <option value="Projetos">Projetos</option>
                <option value="Prática">Prática</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Prioridade</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:border-emerald-500"
              >
                <option value="Baixa">Baixa</option>
                <option value="Média">Média</option>
                <option value="Alta">Alta</option>
              </select>
            </div>

            <Button type="submit" variant="gradient" size="md" className="w-full" icon={Plus}>
              Criar Tarefa
            </Button>
          </form>

          {/* Stats card */}
          <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Total de tarefas:</span>
              <strong className="text-white">{tasks.length}</strong>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Concluídas:</span>
              <strong className="text-emerald-400">{completedCount} / {tasks.length}</strong>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${tasks.length ? (completedCount / tasks.length) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </Card>

        {/* Task List Panel */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
              <Filter size={14} /> Filtro:
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={filter === 'all' ? 'primary' : 'outline'}
                onClick={() => setFilter('all')}
              >
                Todas ({tasks.length})
              </Button>
              <Button
                size="sm"
                variant={filter === 'pending' ? 'primary' : 'outline'}
                onClick={() => setFilter('pending')}
              >
                Pendente ({tasks.length - completedCount})
              </Button>
              <Button
                size="sm"
                variant={filter === 'completed' ? 'primary' : 'outline'}
                onClick={() => setFilter('completed')}
              >
                Concluídas ({completedCount})
              </Button>
            </div>
          </div>

          {/* Task Items */}
          {filteredTasks.length === 0 ? (
            <div className="p-12 bg-slate-900/60 rounded-xl border border-slate-800 text-center space-y-2">
              <p className="text-slate-400 text-sm">Nenhuma tarefa encontrada neste filtro.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                    task.completed
                      ? 'bg-slate-950/60 border-slate-800/80 opacity-70'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                        task.completed
                          ? 'bg-emerald-500 text-slate-950 font-bold'
                          : 'border border-slate-700 hover:border-emerald-500'
                      }`}
                    >
                      {task.completed && <CheckCircle2 size={16} />}
                    </button>

                    <div className="min-w-0 flex-1">
                      <h4 className={`text-sm font-semibold truncate ${task.completed ? 'line-through text-slate-500' : 'text-white'}`}>
                        {task.title}
                      </h4>
                      <div className="flex gap-2 items-center text-[11px] text-slate-400 mt-1">
                        <Badge variant="purple">{task.category}</Badge>
                        <Badge variant={task.priority === 'Alta' ? 'rose' : task.priority === 'Média' ? 'amber' : 'slate'}>
                          Prioridade {task.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-slate-500 hover:text-rose-400 p-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Excluir tarefa"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
