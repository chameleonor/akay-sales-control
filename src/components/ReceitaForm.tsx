import React from "react";
import { useAtom } from 'jotai';
import { primarioAtom } from '@stores/primarioAtom';
import { propriedadesAtom } from '@stores/propriedadesAtom';
import { corantesAtom } from '@stores/corantesAtom';
import { essenciasAtom } from '@stores/essenciasAtom';
import { acabamentosAtom } from '@stores/acabamentosAtom';
import { embalagensAtom } from '@stores/embalagensAtom';

export type Receita = { id: number; nome: string; itens?: ReceitaItem[]; data?: string };
export type ReceitaItem = { id: number; tipo: string; produtoId: number; quantidade: number };

const TIPOS = [
  { key: 'primario', label: 'Primário', atom: primarioAtom },
  { key: 'propriedades', label: 'Propriedades', atom: propriedadesAtom },
  { key: 'corantes', label: 'Corantes', atom: corantesAtom },
  { key: 'essencias', label: 'Essências', atom: essenciasAtom },
  { key: 'acabamentos', label: 'Acabamentos', atom: acabamentosAtom },
  { key: 'embalagens', label: 'Embalagens', atom: embalagensAtom },
];

export function ReceitaForm({
  receita,
  onSave,
  onCancel,
}: {
  receita: Receita;
  onSave: (r: Receita) => void;
  onCancel: () => void;
}) {
  const [nome, setNome] = React.useState(receita.nome);
  const [data, setData] = React.useState(receita.data || new Date().toISOString().slice(0, 10));
  const [itens, setItens] = React.useState<ReceitaItem[]>(
    receita.itens && receita.itens.length > 0
      ? receita.itens
      : [{ id: Date.now(), tipo: 'primario', produtoId: 1, quantidade: 1 }]
  );
  // Atoms para todos os tipos
  const [primario] = useAtom(primarioAtom);
  const [propriedades] = useAtom(propriedadesAtom);
  const [corantes] = useAtom(corantesAtom);
  const [essencias] = useAtom(essenciasAtom);
  const [acabamentos] = useAtom(acabamentosAtom);
  const [embalagens] = useAtom(embalagensAtom);

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({ ...receita, nome, itens, data });
  }

  function handleAddItem() {
    setItens([
      { id: Date.now(), tipo: '', produtoId: 0, quantidade: '' as any },
      ...itens
    ]);
  }

  function handleItemChange(idx: number, field: keyof ReceitaItem, value: string | number) {
    setItens(itens =>
      itens.map((item, i) =>
        i === idx
          ? field === 'tipo'
            ? { ...item, tipo: value as string, produtoId: getProdutos(value as string)[0]?.id || 1 }
            : { ...item, [field]: value }
          : item
      )
    );
  }

  function handleRemoveItem(idx: number) {
    setItens(itens => itens.filter((_, i) => i !== idx));
  }

  // Modal close on ESC and click outside
  const modalRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onCancel();
    }
    function handleClick(e: MouseEvent) {
      if (modalRef.current && e.target === modalRef.current) onCancel();
    }
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [onCancel]);

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      style={{ animation: 'fadeIn 0.2s' }}
    >
      <form
        onSubmit={handleSubmit}
        className="relative bg-white rounded shadow w-[96vw] h-[92vh] max-w-none max-h-none flex flex-col animate-fadeIn"
        style={{ minWidth: '320px' }}
      >
        <button
          type="button"
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 z-10"
          onClick={onCancel}
          aria-label="Fechar"
        >
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" stroke="currentColor" />
            <line x1="6" y1="18" x2="18" y2="6" strokeWidth="2" stroke="currentColor" />
          </svg>
        </button>
        <div className="flex-1 overflow-y-auto px-6 pt-6 pb-2">
          <h2 className="text-lg font-bold mb-4">Editar Receita</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="nome-receita">Nome da Receita</label>
            <input
              id="nome-receita"
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={nome}
              onChange={e => setNome(e.target.value)}
              autoFocus
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="data-receita">Data</label>
            <input
              id="data-receita"
              type="date"
              className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={data}
              onChange={e => setData(e.target.value)}
            />
          </div>
          <div className="mb-2 flex items-center justify-between">
            <span className="font-semibold">Itens da Receita</span>
            <button
              type="button"
              className="text-green-600 hover:bg-green-100 rounded-full p-1"
              title="Adicionar item"
              onClick={handleAddItem}
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <line x1="12" y1="5" x2="12" y2="19" strokeWidth="2" stroke="currentColor" />
                <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2" stroke="currentColor" />
              </svg>
            </button>
          </div>
          <ul className="space-y-2 mb-4">
            {itens.map((item, idx) => {
              const produtos = getProdutos(item.tipo);
              return (
                <li key={item.id} className="bg-gray-50 rounded p-2 flex flex-col gap-2">
                  <div>
                    <label className="block text-xs font-medium mb-1" htmlFor={`tipo-${item.id}`}>Tipo</label>
                    <select
                      id={`tipo-${item.id}`}
                      className="border rounded px-2 py-1 w-full"
                      value={item.tipo}
                      onChange={e => handleItemChange(idx, 'tipo', e.target.value)}
                    >
                      <option value="">Selecione...</option>
                      {TIPOS.map(tab => (
                        <option key={tab.key} value={tab.key}>{tab.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1" htmlFor={`produto-${item.id}`}>Produto</label>
                    <select
                      id={`produto-${item.id}`}
                      className="border rounded px-2 py-1 w-full"
                      value={item.produtoId}
                      onChange={e => handleItemChange(idx, 'produtoId', Number(e.target.value))}
                    >
                      <option value="">Selecione...</option>
                      {produtos.map(produto => (
                        <option key={produto.id} value={produto.id}>
                          {produto.produto} (ID: {produto.id})
                        </option>
                      ))}
                    </select>
                    {/* Informativo do produto selecionado */}
                    {(() => {
                      const prod = produtos.find(p => p.id === item.produtoId);
                      if (!prod) return null;
                      return (
                        <div className="text-xs text-gray-600 mt-1 bg-gray-100 rounded p-2">
                          <div><b>Peso:</b> {prod.peso ? prod.peso + ' ' + (prod.medida || '') : '-'}</div>
                          <div><b>Preço:</b> {typeof prod.preco === 'number' ? `R$ ${prod.preco.toFixed(2)}` : '-'}</div>
                          <div><b>Período:</b> {prod.periodo || '-'}</div>
                          <div><b>Vencimento:</b> {prod.vencimento || '-'}</div>
                        </div>
                      );
                    })()}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <label className="block text-xs font-medium mb-1" htmlFor={`quantidade-${item.id}`}>Quantidade</label>
                      <input
                        id={`quantidade-${item.id}`}
                        className="border rounded px-2 py-1 w-full text-center"
                        type="number"
                        min={0.0001}
                        step={0.0001}
                        placeholder="Fração"
                        value={item.quantidade === undefined ? '' : item.quantidade}
                        onChange={e => handleItemChange(idx, 'quantidade', e.target.value === '' ? '' : Number(e.target.value))}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-medium mb-1">Valor Fracionado</label>
                      <input
                        className="border rounded px-2 py-1 w-full text-center bg-gray-100"
                        type="text"
                        tabIndex={-1}
                        readOnly
                        value={(function () {
                          const prod = produtos.find(p => Number(p.id) === Number(item.produtoId));
                          if (!prod || typeof prod.preco !== 'number' || typeof item.quantidade !== 'number') return '-';
                          const val = prod.preco * item.quantidade;
                          return `R$ ${val.toFixed(2)}`;
                        })()}
                      />
                      {/* Campo de correspondência da fração */}
                      <div className="text-xs text-gray-500 mt-1 text-center">
                        {(function () {
                          const prod = produtos.find(p => p.id === item.produtoId);
                          if (!prod || typeof prod.peso !== 'number' || typeof item.quantidade !== 'number') return null;
                          const total = prod.peso;
                          const unidade = prod.medida || '';
                          const fracionado = (item.quantidade * total);
                          if (!isFinite(fracionado)) return null;
                          return `${item.quantidade} equivale a ${fracionado.toLocaleString(undefined, { maximumFractionDigits: 4 })}${unidade ? ' ' + unidade : ''} de ${total}${unidade}`;
                        })()}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="mt-6 text-red-600 hover:bg-red-100 rounded-full p-1 h-8 w-8 flex items-center justify-center"
                      title="Remover item"
                      onClick={() => handleRemoveItem(idx)}
                    >
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" stroke="currentColor" />
                        <line x1="6" y1="18" x2="18" y2="6" strokeWidth="2" stroke="currentColor" />
                      </svg>
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex gap-2 mt-2 mb-4 px-6 justify-end">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">Salvar</button>
          <button type="button" className="bg-gray-200 px-4 py-2 rounded shadow" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}