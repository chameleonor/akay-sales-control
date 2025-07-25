import React from 'react';
import type { ProdutoPrimario } from '@types/ProdutoPrimario';

interface ProdutoCardProps {
  item: ProdutoPrimario;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  menuOpen: number | null;
  setMenuOpen: (id: number | null) => void;
}

export function ProdutoCard({ item, onEdit, onDelete, menuOpen, setMenuOpen }: ProdutoCardProps) {
  const [imgLoaded, setImgLoaded] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);
  const imgSrc = item.imagem && item.imagem.trim() !== '' ? item.imagem : `https://source.unsplash.com/120x120/?${encodeURIComponent(item.produto)}`;

  return (
    <div className="bg-white rounded shadow flex flex-col p-4 relative group hover:shadow-lg transition min-h-[100px]">
      <div className="w-52 h-38 rounded bg-gray-100 flex justify-center overflow-hidden border m-auto my-3">
        {!imgLoaded && !imgError && (
          <div className="w-full h-full flex items-center justify-center animate-pulse bg-gray-200">
            <div className="w-12 h-12 rounded bg-gray-300" />
          </div>
        )}
        {!imgError && (
          <img
            src={imgSrc}
            alt={item.produto}
            className={`object-cover w-full h-full ${imgLoaded ? '' : 'hidden'}`}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="font-semibold text-lg text-gray-800">{item.produto}</div>
          <div className="text-gray-400 text-xs mb-1">ID: {item.id}</div>
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
              <circle cx="5" cy="12" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="19" cy="12" r="2" />
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
