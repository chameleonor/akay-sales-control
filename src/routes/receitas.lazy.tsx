import React from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { ReceitaForm, Receita } from '@components/ReceitaForm';
import { useAtom } from 'jotai';
import { receitasAtom } from '@stores/receitasAtom';

export const Route = createLazyFileRoute('/receitas')({
  component: RouteComponent,
})

function RouteComponent() {
  const [receitas, setReceitas] = useAtom(receitasAtom);
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
