import React from 'react';
import type { ProdutoPrimario } from '../types/ProdutoPrimario';

interface ProdutoCardProps {
  item: ProdutoPrimario;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  menuOpen: number | null;
  setMenuOpen: (id: number | null) => void;
}

export function ProdutoCard({ item, onEdit, onDelete, menuOpen, setMenuOpen }: ProdutoCardProps) {
  return (
    <div className="bg-white rounded shadow flex flex-row p-4 relative group hover:shadow-lg transition min-h-[100px]">
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
                  onEdit(item.id);
                  setMenuOpen(null);
                }}
              >
                Editar
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                onClick={() => {
                  onDelete(item.id);
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
  );
}
