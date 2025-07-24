import { API_URL } from '@constants';
import React from 'react';
function getProdutos(tipo: string, atoms: any) {
  switch (tipo) {
    case 'primario': return atoms.primario;
    case 'propriedades': return atoms.propriedades;
    case 'corantes': return atoms.corantes;
    case 'essencias': return atoms.essencias;
    case 'acabamentos': return atoms.acabamentos;
    case 'embalagens': return atoms.embalagens;
    default: return [];
  }
}
export function PedidoForm({ receitas, atoms, onSave, onCancel, pedido }: {
  receitas: any[];
  atoms: any;
  onSave: (p: any) => void;
  onCancel: () => void;
  pedido?: { id: number; receitas: { receitaId: number }[]; data: string };
}) {
  const [selected, setSelected] = React.useState<number[]>(
    pedido ? pedido.receitas.map(r => r.receitaId) : []
  );
  const [data, setData] = React.useState(
    pedido ? pedido.data.slice(0, 10) : new Date().toISOString().slice(0, 10)
  );

  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onCancel();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const pedidoData = {
      id: pedido ? pedido.id : Date.now(),
      receitas: selected.map(id => ({ receitaId: id })),
      data
    };

    // Atualizar estoque dos produtos usados nas receitas selecionadas
    for (const receitaId of selected) {
      const receita = receitas.find(r => r.id === receitaId);
      if (!receita || !receita.itens) continue;
      for (const item of receita.itens) {
        const produtos = getProdutos(item.tipo, atoms);
        const prod = produtos.find((p: any) => p.id === item.produtoId);
        if (!prod) continue;
        // Reduzir quantidadeAtual do produto via API
        const novoValor = Math.max(0, (prod.quantidadeAtual ?? 0) - (item.quantidade ?? 0));
        console.log(`Atualizando produto ${prod.id} de ${prod.quantidadeAtual} para ${novoValor}`);
        await fetch(`${API_URL}/estoque/${prod.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...prod, quantidadeAtual: novoValor })
        });
      }
    }

    onSave(pedidoData);
  }

  // Calcula o total do pedido
  const total = selected.reduce((acc, id) => {
    const receita = receitas.find(r => r.id === id);
    if (!receita) return acc;
    return acc + (receita.itens || []).reduce((a: number, item: any) => {
      const produtos = getProdutos(item.tipo, atoms);
      const prod = produtos.find((p: any) => p.id === item.produtoId);
      return a + (prod && typeof prod.preco === 'number' && typeof item.quantidade === 'number' ? prod.preco * item.quantidade : 0);
    }, 0);
  }, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 w-[96vw] max-w-lg flex flex-col">
        <h2 className="text-lg font-bold mb-4">Novo Pedido</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="data-pedido">Data</label>
          <input
            id="data-pedido"
            type="date"
            className="border rounded px-3 py-2 w-full"
            value={data}
            onChange={e => setData(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Receitas</label>
          <ul className="space-y-2">
            {receitas.map(r => {
              const receitaTotal = (r.itens || []).reduce((acc: number, item: any) => {
                const produtos = getProdutos(item.tipo, atoms);
                const prod = produtos.find((p: any) => p.id === item.produtoId);
                return acc + (prod && typeof prod.preco === 'number' && typeof item.quantidade === 'number' ? prod.preco * item.quantidade : 0);
              }, 0);
              return (
                <li key={r.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selected.includes(r.id)}
                    onChange={e => {
                      setSelected(sel =>
                        e.target.checked ? [...sel, r.id] : sel.filter(id => id !== r.id)
                      );
                    }}
                  />
                  <span>{r.nome}</span>
                  <span className="text-xs text-gray-500">{r.itens ? `R$ ${receitaTotal.toFixed(2)}` : ''}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="mb-4 text-right font-bold text-blue-700">Total: R$ {total.toFixed(2)}</div>
        <div className="flex gap-2 justify-end">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">Salvar</button>
          <button type="button" className="bg-gray-200 px-4 py-2 rounded shadow" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
