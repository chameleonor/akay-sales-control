import { atom } from 'jotai';

export type ProdutoEstoque = {
  id: number;
  nome: string;
  unidade: string;
  quantidade: number;
};

export const estoqueAtom = atom<ProdutoEstoque[]>(
  [
    { id: 1, nome: 'Glicerina', unidade: 'g', quantidade: 500 },
    { id: 2, nome: 'Essência', unidade: 'g', quantidade: 500 },
    { id: 3, nome: 'Óleo Essencial', unidade: 'g', quantidade: 500 },
    { id: 4, nome: 'Base para Sabonete', unidade: 'kg', quantidade: 2 },
    { id: 5, nome: 'Corante Cosmético', unidade: 'ml', quantidade: 100 },
    { id: 6, nome: 'Álcool de Cereais', unidade: 'ml', quantidade: 1000 },
    { id: 7, nome: 'Frasco PET', unidade: 'un', quantidade: 50 },
    { id: 8, nome: 'Caixa de Embalagem', unidade: 'un', quantidade: 20 },
    { id: 9, nome: 'Lauril', unidade: 'ml', quantidade: 500 },
    { id: 10, nome: 'Manteiga de Karité', unidade: 'g', quantidade: 200 },
  ]
);
