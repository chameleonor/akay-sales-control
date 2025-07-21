import { createLazyFileRoute } from '@tanstack/react-router';
import React from 'react';
import { ProdutoForm } from '@components/ProdutoForm';
import { ProdutoCard } from '@components/ProdutoCard';
import type { ProdutoPrimario } from '@types/ProdutoPrimario';
import { API_URL } from '@constants';

export const Route = createLazyFileRoute('/estoque')({
  component: RouteComponent,
});

const TABS = [
  { key: 'primario', label: 'Primário', tipo: 'primario' },
  { key: 'propriedades', label: 'Propriedades', tipo: 'propriedades' },
  { key: 'corantes', label: 'Corantes', tipo: 'corantes' },
  { key: 'essencias', label: 'Essências', tipo: 'essencias' },
  { key: 'acabamentos', label: 'Acabamentos', tipo: 'acabamentos' },
  { key: 'embalagens', label: 'Embalagens', tipo: 'embalagens' },
];


function RouteComponent() {
  const [activeTab, setActiveTab] = React.useState('primario');
  const tabConfig = TABS.find(t => t.key === activeTab)!;
  const [estoque, setEstoque] = React.useState<ProdutoPrimario[]>([]);
  const [menuOpen, setMenuOpen] = React.useState<number | null>(null);
  const [editId, setEditId] = React.useState<string | null>(null);
  const [showNew, setShowNew] = React.useState(false);
  // Filtros
  const [search, setSearch] = React.useState('');
  const [medida, setMedida] = React.useState('');
  const [periodo, setPeriodo] = React.useState('');

  React.useEffect(() => {
    fetch(`${API_URL}/estoque`)
      .then(res => res.json())
      .then(data => setEstoque(data));
  }, []);

  // Função de filtro
  const itemsArr = estoque.filter(item => item.tipo === tabConfig.tipo);
  const filteredItems = itemsArr.filter((item) => {
    const nome = item.produto || '';
    const matchNome = nome.toLowerCase().includes(search.toLowerCase());
    const matchMedida = medida ? item.medida === medida : true;
    const matchPeriodo = periodo ? (item.periodo || '').includes(periodo) : true;
    return matchNome && matchMedida && matchPeriodo;
  });


  return (
    <div className="w-full px-4 mt-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4">
          {TABS.map(tab => (
            <button
              key={tab.key}
              className={`px-4 py-2 rounded-t font-semibold border-b-2 transition-all ${activeTab === tab.key ? 'border-blue-600 text-blue-600 bg-white' : 'border-transparent text-gray-500 bg-gray-100 hover:text-blue-600'}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {/* Novo menu para escolher tipo de item */}
        <div className="relative">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => setMenuOpen(menuOpen === -1 ? null : -1)}
          >
            Novo
          </button>
          {menuOpen === -1 && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-20">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  setActiveTab('primario');
                  setShowNew(true);
                  setMenuOpen(null);
                }}
              >
                Primário
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  setActiveTab('propriedades');
                  setShowNew(true);
                  setMenuOpen(null);
                }}
              >
                Propriedade
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  setActiveTab('corantes');
                  setShowNew(true);
                  setMenuOpen(null);
                }}
              >
                Corante
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  setActiveTab('essencias');
                  setShowNew(true);
                  setMenuOpen(null);
                }}
              >
                Essência
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  setActiveTab('acabamentos');
                  setShowNew(true);
                  setMenuOpen(null);
                }}
              >
                Acabamento
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  setActiveTab('embalagens');
                  setShowNew(true);
                  setMenuOpen(null);
                }}
              >
                Embalagem
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-6 items-end">
        <div className="flex flex-col">
          <label className="text-xs text-gray-600 mb-1">Buscar</label>
          <input
            type="text"
            className="border rounded px-2 py-1 min-w-[180px]"
            placeholder="Nome ou produto..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs text-gray-600 mb-1">Medida</label>
          <select
            className="border rounded px-2 py-1 min-w-[90px]"
            value={medida}
            onChange={e => setMedida(e.target.value)}
          >
            <option value="">Todas</option>
            <option value="g">g</option>
            <option value="Kg">Kg</option>
            <option value="L">L</option>
            <option value="ml">ml</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-xs text-gray-600 mb-1">Período</label>
          <input
            type="text"
            className="border rounded px-2 py-1 min-w-[110px]"
            placeholder="Ex: 04/2025"
            value={periodo}
            onChange={e => setPeriodo(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredItems.map((item: ProdutoPrimario) => (
          <ProdutoCard
            key={item.id}
            item={item}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            onEdit={id => setEditId(id)}
            onDelete={id => {
              fetch(`${API_URL}/estoque/${id}`, { method: 'DELETE' })
                .then(() => setEstoque(prev => prev.filter(i => i.id !== id)));
              setMenuOpen(null);
            }}
          />
        ))}
      </div>
      {showNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded shadow-lg p-6 relative w-full max-w-lg flex flex-col items-center">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
              onClick={() => setShowNew(false)}
              aria-label="Fechar"
            >
              ×
            </button>
            <ProdutoForm
              titulo={tabConfig.label}
              onSave={item => {
                if (!item.id) {
                  fetch(`${API_URL}/estoque`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...item, tipo: tabConfig.tipo })
                  })
                    .then(res => res.json())
                    .then(newItem => setEstoque(prev => [...prev, newItem]));
                } else {
                  fetch(`${API_URL}/estoque/${item.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(item)
                  })
                    .then(res => res.json())
                    .then(updated => setEstoque(prev => prev.map(i => i.id === item.id ? updated : i)));
                }
                setShowNew(false);
                setEditId(null);
              }}
              onCancel={() => {
                setShowNew(false);
                setEditId(null);
              }}
              item={editId ? estoque.find(i => i.id === editId) : undefined}
              showImagem={activeTab === 'corantes'}
            />
          </div>
        </div>
      )}
      {editId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded shadow-lg p-6 relative w-full max-w-lg flex flex-col items-center">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
              onClick={() => setEditId(null)}
              aria-label="Fechar"
            >
              ×
            </button>
            <ProdutoForm
              titulo={tabConfig.label}
              item={editId ? estoque.find(i => i.id === editId) : undefined}
              showImagem={activeTab === 'corantes'}
              onSave={item => {
                if (!item.id) {
                  fetch('${API_URL}/estoque', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...item, tipo: tabConfig.tipo })
                  })
                    .then(res => res.json())
                    .then(newItem => setEstoque(prev => [...prev, newItem]));
                } else {
                  fetch(`${API_URL}/estoque/${item.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(item)
                  })
                    .then(res => res.json())
                    .then(updated => setEstoque(prev => prev.map(i => i.id === item.id ? updated : i)));
                }
                setShowNew(false);
                setEditId(null);
              }}
              onCancel={() => {
                setShowNew(false);
                setEditId(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
