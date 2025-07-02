import { atom } from 'jotai';

export type ReceitaItem = { id: number; nome: string; quantidade: number };
export type Receita = { id: number; nome: string; itens?: ReceitaItem[] };

const initialReceitas: Receita[] = [
  { id: 1, nome: 'Bolo de Chocolate' },
  { id: 2, nome: 'Pão de Queijo' },
  { id: 3, nome: 'Torta de Frango' },
];

export const receitasAtom = atom<Receita[]>(initialReceitas);