import React from 'react';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/receitas')({
  component: RouteComponent,
})

type Receita = { id: number; nome: string; itens?: ReceitaItem[] };
type ReceitaItem = { id: number; nome: string; quantidade: number };

function ReceitaForm({
  receita,
  onSave,
  onCancel,
}: {
  receita: Receita;
  onSave: (r: Receita) => void;
  onCancel: () => void;
}) {
  const [nome, setNome] = React.useState(receita.nome);
  const [itens, setItens] = React.useState<ReceitaItem[]>(receita.itens ?? []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({ ...receita, nome, itens });
  }

  function handleAddItem() {
    setItens([
      ...itens,
      { id: Date.now(), nome: '', quantidade: 1 }
    ]);
  }

  function handleItemChange(idx: number, field: keyof ReceitaItem, value: string | number) {
    setItens(itens =>
      itens.map((item, i) =>
        i === idx ? { ...item, [field]: value } : item
      )
    );
  }

  function handleRemoveItem(idx: number) {
    setItens(itens => itens.filter((_, i) => i !== idx));
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded shadow p-4 ml-8 w-96">
      <h2 className="text-lg font-bold mb-2">Editar Receita</h2>
      <label className="block mb-2">
        Nome:
        <input
          className="border rounded px-2 py-1 w-full mt-1"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />
      </label>
      <div className="mb-2 flex items-center justify-between">
        <span className="font-semibold">Itens da Receita</span>
        <button
          type="button"
          className="text-green-600 hover:bg-green-100 rounded-full p-1"
          title="Adicionar item"
          onClick={handleAddItem}
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <line x1="12" y1="5" x2="12" y2="19" strokeWidth="2" stroke="currentColor"/>
            <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2" stroke="currentColor"/>
          </svg>
        </button>
      </div>
      <ul>
        {itens.map((item, idx) => (
          <li key={item.id} className="flex gap-2 items-center mb-2">
            <input
              className="border rounded px-2 py-1 flex-1"
              placeholder="Nome do item"
              value={item.nome}
              onChange={e => handleItemChange(idx, 'nome', e.target.value)}
            />
            <input
              className="border rounded px-2 py-1 w-20"
              type="number"
              min={1}
              placeholder="Qtd"
              value={item.quantidade}
              onChange={e => handleItemChange(idx, 'quantidade', Number(e.target.value))}
            />
            <button
              type="button"
              className="text-red-600 hover:bg-red-100 rounded-full p-1"
              title="Remover item"
              onClick={() => handleRemoveItem(idx)}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" stroke="currentColor"/>
                <line x1="6" y1="18" x2="18" y2="6" strokeWidth="2" stroke="currentColor"/>
              </svg>
            </button>
          </li>
        ))}
      </ul>
      <div className="flex gap-2 mt-4">
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">Salvar</button>
        <button type="button" className="bg-gray-200 px-3 py-1 rounded" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
}

function RouteComponent() {
  // Mock de receitas
  const [receitas, setReceitas] = React.useState<Receita[]>([
    { id: 1, nome: 'Bolo de Chocolate' },
    { id: 2, nome: 'Pão de Queijo' },
    { id: 3, nome: 'Torta de Frango' },
  ]);
  const [menuOpen, setMenuOpen] = React.useState<number | null>(null);
  const [editId, setEditId] = React.useState<number | null>(null);

  function handleSaveEdit(updated: Receita) {
    setReceitas(rs => rs.map(r => (r.id === updated.id ? updated : r)));
    setEditId(null);
  }

  return (
    <div className="flex max-w-4xl mx-auto mt-8">
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4">Receitas</h1>
        <ul className="divide-y divide-gray-200 bg-white rounded shadow">
          {receitas.map((receita) => (
            <li key={receita.id} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50">
              <span>{receita.nome}</span>
              <div className="relative">
                <button
                  className="p-2 rounded-full hover:bg-gray-200"
                  onClick={() => setMenuOpen(menuOpen === receita.id ? null : receita.id)}
                >
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="5" cy="12" r="2"/>
                    <circle cx="12" cy="12" r="2"/>
                    <circle cx="19" cy="12" r="2"/>
                  </svg>
                </button>
                {menuOpen === receita.id && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-10">
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => {
                        setEditId(receita.id);
                        setMenuOpen(null);
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                      onClick={() => {
                        setReceitas(rs => rs.filter(r => r.id !== receita.id));
                        setMenuOpen(null);
                      }}
                    >
                      Deletar
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      {editId !== null && (
        <ReceitaForm
          receita={receitas.find(r => r.id === editId)!}
          onSave={handleSaveEdit}
          onCancel={() => setEditId(null)}
        />
      )}
    </div>
  );
}
