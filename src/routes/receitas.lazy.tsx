import React from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { ReceitaForm, Receita } from '@components/ReceitaForm';
import { useAtom } from 'jotai';
import { receitasAtom } from '@stores/receitasAtom';
import { primarioAtom } from '@stores/primarioAtom';
import { propriedadesAtom } from '@stores/propriedadesAtom';
import { corantesAtom } from '@stores/corantesAtom';
import { essenciasAtom } from '@stores/essenciasAtom';
import { acabamentosAtom } from '@stores/acabamentosAtom';
import { embalagensAtom } from '@stores/embalagensAtom';

export const Route = createLazyFileRoute('/receitas')({
  component: RouteComponent,
})

function RouteComponent() {
  const [receitas, setReceitas] = useAtom(receitasAtom);
  const [primario] = useAtom(primarioAtom);
  const [propriedades] = useAtom(propriedadesAtom);
  const [corantes] = useAtom(corantesAtom);
  const [essencias] = useAtom(essenciasAtom);
  const [acabamentos] = useAtom(acabamentosAtom);
  const [embalagens] = useAtom(embalagensAtom);
  const [menuOpen, setMenuOpen] = React.useState<number | null>(null);
  const [editId, setEditId] = React.useState<number | null>(null);
  const [newOpen, setNewOpen] = React.useState(false);

  function handleSaveEdit(updated: Receita) {
    setReceitas(rs => rs.map(r => (r.id === updated.id ? updated : r)));
    setEditId(null);
  }

  function handleSaveNew(nova: Receita) {
    setReceitas(rs => [
      { ...nova, id: Date.now(), data: new Date().toISOString() },
      ...rs
    ]);
    setNewOpen(false);
  }

  function getProdutos(tipo: string) {
    switch (tipo) {
      case 'primario': return primario;
      case 'propriedades': return propriedades;
      case 'corantes': return corantes;
      case 'essencias': return essencias;
      case 'acabamentos': return acabamentos;
      case 'embalagens': return embalagens;
      default: return [];
    }
  }

  return (
    <div className="flex max-w-4xl mx-auto mt-8">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Receitas</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
            onClick={() => setNewOpen(true)}
          >
            Nova Receita
          </button>
        </div>
        <ul className="divide-y divide-gray-200 bg-white rounded shadow">
          {receitas.map((receita) => {
            // Calcular o total da receita
            const total = (receita.itens || []).reduce((acc, item) => {
              const produtos = getProdutos(item.tipo);
              const prod = produtos.find((p: any) => p.id === item.produtoId);
              if (!prod || typeof prod.preco !== 'number' || typeof item.quantidade !== 'number') return acc;
              return acc + (prod.preco * item.quantidade);
            }, 0);
            return (
              <li key={receita.id} className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-gray-50">
                <span className="font-semibold flex-1 text-left">
                  {receita.nome}
                </span>
                <div className="flex items-center gap-6 flex-shrink-0">
                  <span className="text-xs text-gray-500 font-semibold min-w-[80px] text-right">
                    {total > 0 ? `R$ ${total.toFixed(2)}` : ''}
                  </span>
                  <span className="text-xs text-gray-400 font-medium min-w-[90px] text-right">
                    {receita.data ? new Date(receita.data).toLocaleDateString() : ''}
                  </span>
                  <div className="relative flex items-center">
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
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {editId !== null && (
        <ReceitaForm
          receita={receitas.find(r => r.id === editId)!}
          onSave={handleSaveEdit}
          onCancel={() => setEditId(null)}
        />
      )}
      {newOpen && (
        <ReceitaForm
          receita={{ id: 0, nome: '', itens: [] }}
          onSave={handleSaveNew}
          onCancel={() => setNewOpen(false)}
        />
      )}
    </div>
  );
}
