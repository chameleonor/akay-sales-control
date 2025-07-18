import React from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { receitasAtom } from '@stores/receitasAtom';
import { primarioAtom } from '@stores/primarioAtom';
import { propriedadesAtom } from '@stores/propriedadesAtom';
import { corantesAtom } from '@stores/corantesAtom';
import { essenciasAtom } from '@stores/essenciasAtom';
import { acabamentosAtom } from '@stores/acabamentosAtom';
import { embalagensAtom } from '@stores/embalagensAtom';

import { API_URL } from 'constants';
import { PedidoForm } from '@components/PedidoForm';


export type PedidoReceita = { receitaId: number };
export type Pedido = { id: number; receitas: PedidoReceita[]; data: string };

export const Route = createLazyFileRoute('/pedidos')({
  component: RouteComponent,
});




function RouteComponent() {
  const [receitas] = useAtom(receitasAtom);
  const [primario, setPrimario] = useAtom(primarioAtom);
  const [propriedades, setPropriedades] = useAtom(propriedadesAtom);
  const [corantes, setCorantes] = useAtom(corantesAtom);
  const [essencias, setEssencias] = useAtom(essenciasAtom);
  const [acabamentos, setAcabamentos] = useAtom(acabamentosAtom);
  const [embalagens, setEmbalagens] = useAtom(embalagensAtom);
  const [pedidos, setPedidos] = React.useState<Pedido[]>([]);
  const [newOpen, setNewOpen] = React.useState(false);
  const [editPedido, setEditPedido] = React.useState<Pedido | null>(null);

  const atoms = { primario, propriedades, corantes, essencias, acabamentos, embalagens };

  // Carrega pedidos da API ao montar
  React.useEffect(() => {
    fetch(`${API_URL}/pedidos`)
      .then(res => res.json())
      .then(setPedidos)
      .catch(() => setPedidos([]));
  }, []);

  function reduzirEstoqueDoPedido(pedido: Pedido) {
    // Map de setters por tipo
    const setters: Record<string, Function> = {
      primario: setPrimario,
      propriedades: setPropriedades,
      corantes: setCorantes,
      essencias: setEssencias,
      acabamentos: setAcabamentos,
      embalagens: setEmbalagens,
    };

    pedido.receitas.forEach(pr => {
      const receita = receitas.find(r => r.id === pr.receitaId);
      if (!receita || !receita.itens) return;
      receita.itens.forEach(item => {
        const setter = setters[item.tipo];
        if (!setter) return;
        setter((produtos: any[]) =>
          produtos.map(prod =>
            prod.id === item.produtoId
              ? { ...prod, quantidade: Math.max(0, prod.quantidade - item.quantidade) }
              : prod
          )
        );
      });
    });
  }

  return (
    <div className="flex max-w-4xl mx-auto mt-8">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Pedidos</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
            onClick={() => setNewOpen(true)}
          >
            Novo Pedido
          </button>
        </div>
        <ul className="divide-y divide-gray-200 bg-white rounded shadow">
          {pedidos.map((pedido) => {
            // Soma total do pedido
            const total = pedido.receitas.reduce((acc: number, pr: PedidoReceita) => {
              const receita = receitas.find(r => r.id === pr.receitaId);
              if (!receita) return acc;
              return acc + (receita.itens || []).reduce((a: number, item: any) => {
                let produtos: any[] = [];
                switch (item.tipo) {
                  case 'primario': produtos = atoms.primario; break;
                  case 'propriedades': produtos = atoms.propriedades; break;
                  case 'corantes': produtos = atoms.corantes; break;
                  case 'essencias': produtos = atoms.essencias; break;
                  case 'acabamentos': produtos = atoms.acabamentos; break;
                  case 'embalagens': produtos = atoms.embalagens; break;
                  default: produtos = [];
                }
                const prod = produtos.find((p: any) => p.id === item.produtoId);
                return a + (prod && typeof prod.preco === 'number' && typeof item.quantidade === 'number' ? prod.preco * item.quantidade : 0);
              }, 0);
            }, 0);
            return (
              <li key={pedido.id} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50">
                <span className="font-semibold">Pedido #{pedido.id}</span>
                <span className="text-xs text-gray-500">{pedido.data ? new Date(pedido.data).toLocaleDateString() : ''}</span>
                <span className="text-xs text-blue-700 font-bold">Total: R$ {total.toFixed(2)}</span>
                <button
                  className="ml-4 px-2 py-1 text-xs bg-yellow-400 rounded hover:bg-yellow-500"
                  onClick={async () => {
                    // Busca o pedido atualizado pelo id na API antes de editar
                    try {
                      const res = await fetch(`${API_URL}/pedidos/${pedido.id}`);
                      if (!res.ok) throw new Error('Erro ao buscar pedido');
                      const pedidoAtualizado = await res.json();
                      setEditPedido(pedidoAtualizado);
                    } catch {
                      setEditPedido(pedido); // fallback para o local se falhar
                    }
                  }}
                >Editar</button>
              </li>
            );
          })}
        </ul>
      </div>
      {(newOpen || editPedido) && (
        <PedidoForm
          receitas={receitas}
          atoms={atoms}
          pedido={editPedido ?? undefined}
          onSave={async p => {
            reduzirEstoqueDoPedido(p);
            if (editPedido) {
              // Atualiza pedido via API
              await fetch(`${API_URL}/pedidos/${p.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(p)
              });
            } else {
              // Salva novo pedido via API
              await fetch(`${API_URL}/pedidos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(p)
              });
            }
            const res = await fetch(`${API_URL}/pedidos`);
            setPedidos(await res.json());
            setNewOpen(false);
            setEditPedido(null);
          }}
          onCancel={() => {
            setNewOpen(false);
            setEditPedido(null);
          }}
        />
      )}
    </div>
  );
}
