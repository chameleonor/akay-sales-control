import { atom } from 'jotai';

// Agora a quantidade representa a fração (0 < quantidade <= 1) do peso/volume do produto no estoque
export type ReceitaItem = { id: number; tipo: string; produtoId: number; quantidade: number };
export type Receita = { id: number; nome: string; itens?: ReceitaItem[]; data?: string };

const today = new Date().toISOString();

const initialReceitas: Receita[] = [
  {
    id: 1,
    nome: 'Sabonete Hidratante',
    data: today,
    itens: [
      // Exemplo: primario id=1 tem 1L no estoque, usa 0.1 (100ml)
      { id: 1, tipo: 'primario', produtoId: 1, quantidade: 0.1 },
      { id: 2, tipo: 'essencias', produtoId: 1, quantidade: 0.02 }, // 2% do estoque
      { id: 3, tipo: 'embalagens', produtoId: 1, quantidade: 1 }, // embalagem é unidade
    ],
  },
  {
    id: 2,
    nome: 'Creme Corporal',
    data: today,
    itens: [
      { id: 1, tipo: 'primario', produtoId: 2, quantidade: 0.15 },
      { id: 2, tipo: 'propriedades', produtoId: 1, quantidade: 0.05 },
      { id: 3, tipo: 'acabamentos', produtoId: 1, quantidade: 0.01 },
    ],
  },
  {
    id: 3,
    nome: 'Shampoo Suave',
    data: today,
    itens: [
      { id: 1, tipo: 'primario', produtoId: 3, quantidade: 0.2 },
      { id: 2, tipo: 'corantes', produtoId: 1, quantidade: 0.005 },
      { id: 3, tipo: 'essencias', produtoId: 2, quantidade: 0.015 },
      { id: 4, tipo: 'embalagens', produtoId: 2, quantidade: 1 },
    ],
  },
];

export const receitasAtom = atom<Receita[]>(initialReceitas);