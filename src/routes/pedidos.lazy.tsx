import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Don't forget to import the CSS!
import { createLazyFileRoute } from '@tanstack/react-router';
import { useAtom } from 'jotai';

import { API_URL } from 'constants';
import { PedidoForm } from '@components/PedidoForm';

export type PedidoReceita = { receitaId: number };
export type Pedido = { id: number; receitas: PedidoReceita[]; data: string };

export const Route = createLazyFileRoute('/pedidos')({
  component: RouteComponent,
});

// Custom Toast component for confirmation
const ConfirmToast: React.FC<{
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ message, onConfirm, onCancel }) => (
  <div className="flex flex-col items-center">
    <p className="mb-3 text-black">{message}</p>
    <div className="flex gap-4">
      <button
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={onConfirm}
      >
        Sim
      </button>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={onCancel}
      >
        Não
      </button>
    </div>
  </div>
);

function RouteComponent() {
  const [receitas, setReceitas] = React.useState<any[]>([]);
  const [produtosPorTipo, setProdutosPorTipo] = React.useState<Record<string, any[]>>({});
  const [pedidos, setPedidos] = React.useState<Pedido[]>([]);
  const [newOpen, setNewOpen] = React.useState(false);
  const [editPedido, setEditPedido] = React.useState<Pedido | null>(null);

  // Carrega receitas, produtos e pedidos da API ao montar
  React.useEffect(() => {
    fetch(`${API_URL}/receitas`)
      .then(res => res.json())
      .then(data => setReceitas(Array.isArray(data) ? data.map(r => ({ ...r, itens: typeof r.itens === 'string' ? JSON.parse(r.itens) : r.itens })) : []));
    const tipos = ['primario', 'propriedades', 'corantes', 'essencias', 'acabamentos', 'embalagens'];
    Promise.all(
      tipos.map(tipo =>
        fetch(`${API_URL}/estoque?tipo=${tipo}`)
          .then(res => res.json())
          .then(arr => [tipo, arr])
          .catch(() => [tipo, []])
      )
    ).then(results => {
      const obj: Record<string, any[]> = {};
      results.forEach(([tipo, arr]) => { obj[tipo] = arr; });
      setProdutosPorTipo(obj);
    });
    fetch(`${API_URL}/pedidos`)
      .then(res => res.json())
      .then(setPedidos)
      .catch(() => setPedidos([]));
  }, []);

  // Reduz estoque via API
  async function reduzirEstoqueDoPedido(pedido: Pedido) {
    for (const pr of pedido.receitas) {
      const receita = receitas.find(r => r.id === pr.receitaId);
      if (!receita || !receita.itens) continue;
      for (const item of receita.itens) {
        await fetch(`${API_URL}/estoque/${item.produtoId}/reduzir`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantidade: item.quantidade })
        });
      }
    }
  }

  // Função para reverter estoque via API
  const reverterEstoqueDoPedido = React.useCallback(
    async (pedido: Pedido) => {
      for (const pr of pedido.receitas) {
        const receita = receitas.find(r => r.id === pr.receitaId);
        if (!receita || !receita.itens) continue;
        for (const item of receita.itens) {
          await fetch(`${API_URL}/estoque/${item.produtoId}/repor`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantidade: item.quantidade })
          });
        }
      }
    },
    [receitas]
  );

  const handleDeletePedido = React.useCallback(
    async (pedidoToDelete: Pedido) => {
      // Show the confirmation toast
      toast.dismiss(); // Dismiss any existing toasts
      toast(
        ({ closeToast }) => (
          <ConfirmToast
            message={`Deseja realmente deletar este item?`}
            onConfirm={async () => {
              closeToast(); // Close the toast
              try {
                // Reverte estoque antes de deletar
                reverterEstoqueDoPedido(pedidoToDelete);
                // Deleta pedido na API
                const response = await fetch(`${API_URL}/pedidos/${pedidoToDelete.id}`, { method: 'DELETE' });

                if (!response.ok) {
                  throw new Error('Failed to delete order.');
                }

                // Atualiza lista de pedidos
                const res = await fetch(`${API_URL}/pedidos`);
                setPedidos(await res.json());
                toast.success('Pedido deletado com sucesso!');
              } catch (error) {
                console.error('Error deleting order:', error);
                toast.error('Erro ao deletar pedido.');
              }
            }}
            onCancel={() => {
              closeToast(); // Close the toast if cancelled
              toast.info('Operação cancelada.');
            }}
          />
        ),
        {
          autoClose: false, // Don't auto-close, let the buttons handle it
          closeButton: false, // Don't show the default close button
          draggable: false, // Prevent dragging
          position: 'top-center',
          className: 'bg-blue-600 rounded-lg shadow-lg p-4', // Tailwind classes for styling
          bodyClassName: 'flex justify-center items-center', // Center content
          hideProgressBar: true,
        }
      );
    },
    [reverterEstoqueDoPedido]
  );

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
                  case 'primario': produtos = produtosPorTipo.primario; break;
                  case 'propriedades': produtos = produtosPorTipo.propriedades; break;
                  case 'corantes': produtos = produtosPorTipo.corantes; break;
                  case 'essencias': produtos = produtosPorTipo.essencias; break;
                  case 'acabamentos': produtos = produtosPorTipo.acabamentos; break;
                  case 'embalagens': produtos = produtosPorTipo.embalagens; break;
                  default: produtos = [];
                }
                const prod = produtos.find((p: any) => p.id === item.produtoId);
                return a + (prod && typeof prod.preco === 'number' && typeof item.quantidade === 'number' ? prod.preco * item.quantidade : 0);
              }, 0);
            }, 0);
            return (
              <li key={pedido.id} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 gap-2">
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
                      toast.error('Erro ao buscar pedido para edição. Usando dados locais.');
                    }
                  }}
                >Editar</button>
                <button
                  className="ml-2 px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                  title="Deletar pedido"
                  onClick={() => handleDeletePedido(pedido)} // Call the new handler
                >Deletar</button>
              </li>
            );
          })}
        </ul>
      </div>
      {(newOpen || editPedido) && (
        <PedidoForm
          receitas={receitas}
          atoms={produtosPorTipo}
          pedido={editPedido ?? undefined}
          onSave={async p => {
            reduzirEstoqueDoPedido(p);
            // Atualiza quantidadeAtual dos produtos das receitas selecionadas
            p.receitas.forEach(pr => {
              const receita = receitas.find(r => r.id === pr.receitaId);
              if (!receita || !receita.itens) return;
              receita.itens.forEach(item => {
                // Atualiza quantidadeAtual do produto correspondente
                const setter = produtosPorTipo[item.tipo];
                if (!setter) return;
                setter((produtos: any[]) =>
                  produtos.map(prod =>
                    prod.id === item.produtoId
                      ? { ...prod, quantidadeAtual: Math.max(0, (prod.quantidadeAtual ?? 0) - (item.quantidade ?? 0)) }
                      : prod
                  )
                );
              });
            });
            if (editPedido) {
              // Atualiza pedido via API
              await fetch(`${API_URL}/pedidos/${p.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(p)
              });
              toast.success('Pedido atualizado com sucesso!');
            } else {
              // Salva novo pedido via API
              await fetch(`${API_URL}/pedidos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(p)
              });
              toast.success('Pedido criado com sucesso!');
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
      <ToastContainer /> {/* Add ToastContainer here */}
    </div>
  );
}