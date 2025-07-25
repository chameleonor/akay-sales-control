import React from "react";
import type { ProdutoPrimario } from '@types/ProdutoPrimario';
import { v4 as uuidv4 } from 'uuid';
import { API_URL } from "@constants";

interface ProdutoFormProps {
  item?: ProdutoPrimario;
  onSave?: (item: ProdutoPrimario) => void;
  onCancel?: () => void;
  titulo: string;
  tipo: string;
  showImagem?: boolean;
}


export function ProdutoForm({ item, onSave, onCancel, titulo, tipo, showImagem = false }: ProdutoFormProps) {
  const [form, setForm] = React.useState<ProdutoPrimario>({
    id: '',
    produto: '',
    medida: '',
    quantidadeAtual: 0,
    periodo: '',
    tipo: tipo,
    imagem: '',
  });

  React.useEffect(() => {
    if (item) {
      setForm(item);
    }
  }, [item]);

  React.useEffect(() => {
    if (item) {
      setForm({ ...item });
    } else {
      setForm({
        id: '',
        produto: '',
        medida: '',
        quantidadeAtual: 0,
        periodo: '',
        tipo: tipo,
        imagem: '',
      });
    }
  }, [item, tipo]);

  function handleChange(field: keyof ProdutoPrimario, value: string | number) {
    setForm(f => ({ ...f, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.produto) return;
    if (onSave) {
      if (item && item.id) {
        // Editar: PUT
        fetch(`${API_URL}/estoque/${item.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        })
          .then(res => res.json())
          .then(data => onSave(data));
      } else {
        // Novo: POST
        fetch(`${API_URL}/estoque`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, tipo })
        })
          .then(res => res.json())
          .then(data => onSave(data));
      }
    }
    if (onCancel) onCancel();
  }

  React.useEffect(() => {
    function handleEsc(event: KeyboardEvent) {
      if (event.key === 'Escape' && onCancel) {
        onCancel();
      }
    }
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onCancel]);

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded shadow p-4 w-full max-w-lg mx-auto">
      <h2 className="text-lg font-bold mb-4">{item ? 'Editar' : 'Adicionar'} {titulo}</h2>
      <div className="text-xs text-gray-500 mb-2">Tipo: <span className="font-semibold">{tipo}</span></div>
      <div className="flex flex-wrap gap-4 justify-between mb-4">
        <label className="flex flex-col flex-1 min-w-[120px]">
          <span className="text-xs text-gray-600 mb-1">Produto</span>
          <input
            type="text"
            className="border rounded px-2 py-1"
            value={form.produto}
            onChange={e => handleChange('produto', e.target.value)}
            required
          />
        </label>
        <label className="flex flex-col w-24 min-w-[70px]">
          <span className="text-xs text-gray-600 mb-1">Peso</span>
          <input
            type="number"
            className="border rounded px-2 py-1"
            value={form.peso === 0 ? '' : form.peso}
            onChange={e => handleChange('peso', e.target.value === '' ? 0 : Number(e.target.value))}
            min={0}
          />
        </label>
        <label className="flex flex-col w-24 min-w-[70px]">
          <span className="text-xs text-gray-600 mb-1">Medida</span>
          <select
            className="border rounded px-2 py-1"
            value={form.medida}
            onChange={e => handleChange('medida', e.target.value)}
          >
            <option value="g">g</option>
            <option value="L">L</option>
            <option value="ml">ml</option>
            <option value="Kg">Kg</option>
          </select>
        </label>
        <label className="flex flex-col w-24 min-w-[90px]">
          <span className="text-xs text-gray-600 mb-1">Preço</span>
          <input
            type="number"
            step="0.01"
            className="border rounded px-2 py-1"
            value={form.preco === 0 ? '' : form.preco}
            onChange={e => handleChange('preco', e.target.value === '' ? 0 : Number(e.target.value))}
            min={0}
          />
        </label>
        <label className="flex flex-col w-24 min-w-[90px]">
          <span className="text-xs text-gray-600 mb-1">Quantidade</span>
          <input
            type="number"
            className="border rounded px-2 py-1"
            value={form.quantidade === 0 ? '' : form.quantidade}
            onChange={e => handleChange('quantidade', e.target.value === '' ? 0 : Number(e.target.value))}
            min={0}
          />
        </label>
        <label className="flex flex-col w-28 min-w-[110px]">
          <span className="text-xs text-gray-600 mb-1">Quantidade Atual</span>
          <input
            type="number"
            className="border rounded px-2 py-1"
            value={form.quantidadeAtual}
            onChange={e => handleChange('quantidadeAtual', Number(e.target.value))}
          />
        </label>
        <label className="flex flex-col w-32 min-w-[110px]">
          <span className="text-xs text-gray-600 mb-1">Período</span>
          <input
            type="text"
            className="border rounded px-2 py-1"
            value={form.periodo}
            onChange={e => handleChange('periodo', e.target.value)}
            placeholder="MM/AAAA"
          />
        </label>
        <label className="flex flex-col w-32 min-w-[110px]">
          <span className="text-xs text-gray-600 mb-1">Vencimento</span>
          <input
            type="text"
            className="border rounded px-2 py-1"
            value={form.vencimento}
            onChange={e => handleChange('vencimento', e.target.value)}
            placeholder="MM/AAAA"
          />
        </label>
        <label className="flex flex-col w-96 min-w-[110px]">
          <span className="text-xs text-gray-600 mb-1">Imagem</span>
          <input
            type="text"
            className="border rounded px-2 py-1 w-full"
            value={form.imagem}
            onChange={e => handleChange('imagem', e.target.value)}
            placeholder="URL da imagem"
          />
        </label>
      </div>
      <div className="flex gap-2 mt-6">
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">Salvar</button>
        {onCancel && (
          <button type="button" className="bg-gray-200 px-3 py-1 rounded" onClick={onCancel}>Cancelar</button>
        )}
      </div>
    </form>
  );
}