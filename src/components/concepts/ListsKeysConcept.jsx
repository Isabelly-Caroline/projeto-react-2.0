import React, { useState } from 'react';
import { CodeBlock } from '../ui/CodeBlock';
import { ListOrdered, Plus, Trash2, ArrowUpDown, Tag, Info } from 'lucide-react';
import { Button, Badge } from '../ui/UIComponents';

export const ListsKeysConcept = () => {
  const [items, setItems] = useState([
    { id: 'item-1', name: 'Aprender JSX', category: 'Fundamentos', priority: 'Alta' },
    { id: 'item-2', name: 'Criar Componentes Reutilizáveis', category: 'UI', priority: 'Média' },
    { id: 'item-3', name: 'Entender Virtual DOM', category: 'Core', priority: 'Alta' },
    { id: 'item-4', name: 'Dominar Listas e Keys', category: 'Coleções', priority: 'Média' }
  ]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Frontend');
  const [useIndexAsKey, setUseIndexAsKey] = useState(false);

  const addItem = (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    const newItem = {
      id: `item-${Date.now()}`,
      name: newItemName,
      category: newItemCategory,
      priority: 'Normal'
    };
    setItems([newItem, ...items]);
    setNewItemName('');
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const reverseList = () => {
    setItems([...items].reverse());
  };

  const codeExample = `// Exemplo correto de renderização de lista com .map() e key única
function ProjectList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        // KEY ÚNICA e ESTÁVEL baseada no ID real do objeto!
        <li key={item.id} className="item-card">
          <span>{item.name}</span>
          <Badge>{item.category}</Badge>
        </li>
      ))}
    </ul>
  );
}`;

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <ListOrdered className="text-pink-400" size={22} />
          05. Listas e Keys - Iteração Dinâmica de Arrays
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          Para exibir listas de elementos dinâmicos em React, usamos o método <code>.map()</code> do JavaScript. Cada item renderizado precisa de uma propriedade <code>key</code> única para que o React mantenha a identidade dos elementos durante adições, remoções e reordenações.
        </p>

        {/* Live List Manager */}
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h4 className="font-semibold text-white text-sm">Gerenciador de Itens de Lista</h4>

            <div className="flex items-center gap-3">
              <Button onClick={reverseList} variant="outline" size="sm" icon={ArrowUpDown}>
                Inverter Ordem da Lista
              </Button>
              <button
                onClick={() => setUseIndexAsKey(!useIndexAsKey)}
                className={`text-xs px-3 py-1.5 rounded-lg border font-mono transition-colors cursor-pointer ${useIndexAsKey ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'}`}
              >
                Key usada: <strong>{useIndexAsKey ? 'key={index} (Incorreto)' : 'key={item.id} (Recomendado)'}</strong>
              </button>
            </div>
          </div>

          {/* Add Item Form */}
          <form onSubmit={addItem} className="flex flex-wrap gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
            <input
              type="text"
              placeholder="Nome do novo item..."
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="flex-1 min-w-[200px] bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-pink-500"
            />
            <select
              value={newItemCategory}
              onChange={(e) => setNewItemCategory(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="UI/UX">UI/UX</option>
              <option value="DevOps">DevOps</option>
            </select>
            <Button type="submit" variant="gradient" icon={Plus} size="md">
              Adicionar
            </Button>
          </form>

          {/* List Rendering */}
          <div className="space-y-3">
            {items.map((item, index) => {
              const currentKey = useIndexAsKey ? index : item.id;
              return (
                <div
                  key={currentKey}
                  className="flex items-center justify-between bg-slate-900 p-4 rounded-xl border border-slate-800 hover:border-pink-500/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-mono text-xs text-pink-400 font-bold">
                      {index + 1}
                    </span>
                    <div>
                      <h5 className="font-semibold text-white text-sm">{item.name}</h5>
                      <span className="text-xs text-slate-400 font-mono">key="{currentKey}"</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge variant="purple">{item.category}</Badge>
                    <input
                      type="text"
                      placeholder="Input com estado local..."
                      className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-slate-200 hidden sm:block w-36"
                    />
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Remover item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
            <Info size={16} className="text-pink-400 shrink-0 mt-0.5" />
            <span>
              <strong>Dica sobre Keys:</strong> Digite algo no campo "Input com estado local" de um item e inverta a ordem da lista. Quando usamos <code>key={"{item.id}"}</code>, os campos de texto permanecem vinculados ao item correto!
            </span>
          </div>
        </div>

        <CodeBlock code={codeExample} title="ListMapKeys.jsx" />
      </div>
    </div>
  );
};
