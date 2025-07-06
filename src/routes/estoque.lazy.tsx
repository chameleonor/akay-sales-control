import { createLazyFileRoute } from '@tanstack/react-router';
import React from 'react';
import { useAtom } from 'jotai';
import { primarioAtom } from '@stores/primarioAtom';
import { propriedadesAtom } from '@stores/propriedadesAtom';
import { corantesAtom } from '@stores/corantesAtom';
import { essenciasAtom } from '@stores/essenciasAtom';
import { ProdutoForm } from '@components/ProdutoForm';
import type { ProdutoPrimario } from '@types/ProdutoPrimario';

export const Route = createLazyFileRoute('/estoque')({
  component: RouteComponent,
});

const TABS = [
  { key: 'primario', label: 'Primário', atom: primarioAtom },
  { key: 'propriedades', label: 'Propriedades', atom: propriedadesAtom },
  { key: 'corantes', label: 'Corantes', atom: corantesAtom },
  { key: 'essencias', label: 'Essências', atom: essenciasAtom },
];

function RouteComponent() {
  const [activeTab, setActiveTab] = React.useState('primario');
  const tabConfig = TABS.find(t => t.key === activeTab)!;
  const [items] = useAtom(tabConfig.atom as any);
  const [menuOpen, setMenuOpen] = React.useState<number | null>(null);
  const [editId, setEditId] = React.useState<number | null>(null);
  const [showNew, setShowNew] = React.useState(false);
  // Filtros
  const [search, setSearch] = React.useState('');
  const [medida, setMedida] = React.useState('');
  const [periodo, setPeriodo] = React.useState('');

  // Função de filtro
  const itemsArr = items as ProdutoPrimario[];
  const filteredItems = itemsArr.filter((item) => {
    const nome = item.produto || '';
    const matchNome = nome.toLowerCase().includes(search.toLowerCase());
    const matchMedida = medida ? item.medida === medida : true;
    const matchPeriodo = periodo ? (item.periodo || '').includes(periodo) : true;
    return matchNome && matchMedida && matchPeriodo;
  });

  // Atoms setters para cada tipo
  const [, setItemsPrimario] = useAtom(primarioAtom);
  const [, setItemsPropriedades] = useAtom(propriedadesAtom);
  const [, setItemsCorantes] = useAtom(corantesAtom);
  const [, setItemsEssencias] = useAtom(essenciasAtom);

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
          <div key={item.id} className="bg-white rounded shadow flex flex-row p-4 relative group hover:shadow-lg transition min-h-[100px]">
            <div className="w-24 h-24 flex-shrink-0 rounded bg-gray-100 flex items-center justify-center overflow-hidden border mr-4">
              <img
                src={item.imagem && item.imagem.trim() !== '' ? item.imagem : `https://source.unsplash.com/120x120/?${encodeURIComponent(item.produto)}`}
                alt={item.produto}
                className="object-cover w-full h-full"
                onError={e => (e.currentTarget.src = '')}
              />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="font-semibold text-lg text-gray-800">{item.produto}</div>
                <div className="text-gray-500 text-sm mb-1">{item.peso} {item.medida} • {item.quantidade} un.</div>
                <div className="flex flex-wrap gap-2 text-xs text-gray-600 mt-1">
                  <span>Preço: R$ {item.preco.toFixed(2)}</span>
                </div>
              </div>
              <div className="relative self-end mt-2">
                <button
                  className="p-2 rounded-full hover:bg-gray-200"
                  onClick={() => setMenuOpen(menuOpen === item.id ? null : item.id)}
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="5" cy="12" r="2"/>
                    <circle cx="12" cy="12" r="2"/>
                    <circle cx="19" cy="12" r="2"/>
                  </svg>
                </button>
                {menuOpen === item.id && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-10">
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => {
                        setEditId(item.id);
                        setMenuOpen(null);
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                      onClick={() => {
                        if (activeTab === 'primario') {
                          setItemsPrimario((es: ProdutoPrimario[]) => es.filter(e => e.id !== item.id));
                        } else if (activeTab === 'propriedades') {
                          setItemsPropriedades((es: ProdutoPrimario[]) => es.filter(e => e.id !== item.id));
                        } else if (activeTab === 'corantes') {
                          setItemsCorantes((es: ProdutoPrimario[]) => es.filter(e => e.id !== item.id));
                        } else if (activeTab === 'essencias') {
                          setItemsEssencias((es: ProdutoPrimario[]) => es.filter(e => e.id !== item.id));
                        }
                        setMenuOpen(null);
                      }}
                    >
                      Deletar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
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
            {activeTab === 'primario' && (
              <ProdutoForm
                titulo="Primário"
                setItems={setItemsPrimario}
                onCancel={() => setShowNew(false)}
              />
            )}
            {activeTab === 'propriedades' && (
              <ProdutoForm
                titulo="Propriedade"
                setItems={setItemsPropriedades}
                onCancel={() => setShowNew(false)}
              />
            )}
            {activeTab === 'corantes' && (
              <ProdutoForm
                titulo="Corante"
                setItems={setItemsCorantes}
                showImagem
                onCancel={() => setShowNew(false)}
              />
            )}
            {activeTab === 'essencias' && (
              <ProdutoForm
                titulo="Essência"
                setItems={setItemsEssencias}
                onCancel={() => setShowNew(false)}
              />
            )}
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
            {activeTab === 'primario' && (
              <ProdutoForm
                titulo="Primário"
                setItems={setItemsPrimario}
                item={(items as ProdutoPrimario[]).find((i: ProdutoPrimario) => i.id === editId)}
                onSave={item => {
                  setItemsPrimario((prev: ProdutoPrimario[]) => prev.map(i => i.id === item.id ? item : i));
                  setEditId(null);
                  setActiveTab('primario');
                }}
                onCancel={() => setEditId(null)}
              />
            )}
            {activeTab === 'propriedades' && (
              <ProdutoForm
                titulo="Propriedade"
                setItems={setItemsPropriedades}
                item={(items as ProdutoPrimario[]).find((i: ProdutoPrimario) => i.id === editId)}
                onSave={item => {
                  setItemsPropriedades((prev: ProdutoPrimario[]) => prev.map(i => i.id === item.id ? item : i));
                  setEditId(null);
                  setActiveTab('propriedades');
                }}
                onCancel={() => setEditId(null)}
              />
            )}
            {activeTab === 'corantes' && (
              <ProdutoForm
                titulo="Corante"
                setItems={setItemsCorantes}
                showImagem
                item={(items as ProdutoPrimario[]).find((i: ProdutoPrimario) => i.id === editId)}
                onSave={item => {
                  setItemsCorantes((prev: ProdutoPrimario[]) => prev.map(i => i.id === item.id ? item : i));
                  setEditId(null);
                  setActiveTab('corantes');
                }}
                onCancel={() => setEditId(null)}
              />
            )}
            {activeTab === 'essencias' && (
              <ProdutoForm
                titulo="Essência"
                setItems={setItemsEssencias}
                item={(items as ProdutoPrimario[]).find((i: ProdutoPrimario) => i.id === editId)}
                onSave={item => {
                  setItemsEssencias((prev: ProdutoPrimario[]) => prev.map(i => i.id === item.id ? item : i));
                  setEditId(null);
                  setActiveTab('essencias');
                }}
                onCancel={() => setEditId(null)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
