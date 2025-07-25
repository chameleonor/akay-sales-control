import { atom } from 'jotai';
import { ProdutoPrimario } from '@types/ProdutoPrimario';

export const primarioAtom = atom<ProdutoPrimario[]>(
  [
    { id: 1, produto: 'Base Sabonete Liquido', peso: 1, medida: 'L', preco: 47.1, quantidade: 1, quantidadeAtual: 1, periodo: '01/04/2025', vencimento: '' },
    { id: 2, produto: 'Base Jelly', peso: 1, medida: 'Kg', preco: 47.8, quantidade: 1, quantidadeAtual: 1, periodo: '01/04/2025', vencimento: '' },
    { id: 3, produto: 'Base Jelly', peso: 1, medida: 'Kg', preco: 47.8, quantidade: 1, quantidadeAtual: 1, periodo: '26/04/2025', vencimento: '' },
    { id: 4, produto: 'Base Glicerinada Branca', peso: 1, medida: 'Kg', preco: 36.4, quantidade: 2, quantidadeAtual: 2, periodo: '01/04/2025', vencimento: '' },
    { id: 5, produto: 'Base Glicerinada Transparente', peso: 1, medida: 'Kg', preco: 36.4, quantidade: 1, quantidadeAtual: 1, periodo: '26/04/2025', vencimento: '' },
    { id: 6, produto: 'Base Glicerinada Branca Vegetal', peso: 1, medida: 'Kg', preco: 37.8, quantidade: 3, quantidadeAtual: 3, periodo: '17/05/2025', vencimento: '' },
    { id: 7, produto: 'Base Glicerinada Transparente Vegetal', peso: 1, medida: 'Kg', preco: 37.8, quantidade: 1, quantidadeAtual: 1, periodo: '03/06/2025', vencimento: '' },
    { id: 8, produto: 'Base Gel Difusor', peso: 1, medida: 'L', preco: 38.7, quantidade: 1, quantidadeAtual: 1, periodo: '01/04/2025', vencimento: '' },
    { id: 9, produto: 'Base Passa Fácil Tecidos', peso: 1, medida: 'L', preco: 25.2, quantidade: 1, quantidadeAtual: 1, periodo: '01/04/2025', vencimento: '' },
    { id: 10, produto: 'Lauril Liquido', peso: 1, medida: 'L', preco: 32.9, quantidade: 1, quantidadeAtual: 1, periodo: '01/04/2025', vencimento: '' },
    { id: 11, produto: 'Lauril Liquido', peso: 1, medida: 'L', preco: 32.9, quantidade: 1, quantidadeAtual: 1, periodo: '01/04/2025', vencimento: '' },
    { id: 12, produto: 'Lauril de Milho', peso: 500, medida: 'g', preco: 48.7, quantidade: 1, quantidadeAtual: 1, periodo: '01/04/2025', vencimento: '' },
    { id: 13, produto: 'Lauril em Pó', peso: 200, medida: 'g', preco: 26, quantidade: 1, quantidadeAtual: 1, periodo: '01/04/2025', vencimento: '' },
    { id: 14, produto: 'Base Croda', peso: 200, medida: 'g', preco: 42.7, quantidade: 1, quantidadeAtual: 1, periodo: '01/04/2025', vencimento: '' },
    { id: 15, produto: 'Base Condicionador Sólido', peso: 500, medida: 'g', preco: 126.6, quantidade: 1, quantidadeAtual: 1, periodo: '01/04/2025', vencimento: '' },
    { id: 16, produto: 'Ureia', peso: 100, medida: 'g', preco: 9.1, quantidade: 1, quantidadeAtual: 1, periodo: '01/04/2025', vencimento: '' },
    { id: 17, produto: 'Álcool de Cereais', peso: 1, medida: 'L', preco: 24.8, quantidade: 3, quantidadeAtual: 3, periodo: '01/04/2025', vencimento: '' },
    { id: 18, produto: 'Álcool de Cereais', peso: 1, medida: 'L', preco: 26.9, quantidade: 1, quantidadeAtual: 1, periodo: '01/04/2025', vencimento: '' },
    { id: 19, produto: 'Água Destilada', peso: 1, medida: 'L', preco: 6.7, quantidade: 1, quantidadeAtual: 1, periodo: '01/04/2025', vencimento: '' },
    { id: 20, produto: 'Glicerina Bidestilada Vegetal USP', peso: 500, medida: 'g', preco: 20.1, quantidade: 1, quantidadeAtual: 1, periodo: '01/04/2025', vencimento: '' },
    { id: 21, produto: 'Glicerina Bidestilada Vegetal USP', peso: 1, medida: 'Kg', preco: 29.4, quantidade: 1, quantidadeAtual: 1, periodo: '01/04/2025', vencimento: '' },
    { id: 22, produto: 'Anfótero', peso: 500, medida: 'ml', preco: 21.4, quantidade: 1, quantidadeAtual: 1, periodo: '01/04/2025', vencimento: '' },
    { id: 23, produto: 'Renex', peso: 500, medida: 'g', preco: 40.4, quantidade: 1, quantidadeAtual: 1, periodo: '01/04/2025', vencimento: '' },
    { id: 24, produto: 'Nipaguard SCE', peso: 100, medida: 'g', preco: 70, quantidade: 1, quantidadeAtual: 1, periodo: '01/04/2025', vencimento: '' },
    { id: 25, produto: 'Goma Xantana', peso: 100, medida: 'g', preco: 28.6, quantidade: 1, quantidadeAtual: 1, periodo: '01/04/2025', vencimento: '' },
    { id: 26, produto: 'Sulfato de Magnésio', peso: 1, medida: 'g', preco: 18.4, quantidade: 1, quantidadeAtual: 1, periodo: '01/04/2025', vencimento: '' },
    { id: 27, produto: 'Hidróxido de Magnésio', peso: 100, medida: 'g', preco: 49, quantidade: 1, quantidadeAtual: 1, periodo: '01/04/2025', vencimento: '' },
    { id: 28, produto: 'Óleo de Silicone', peso: 100, medida: 'g', preco: 21.8, quantidade: 1, quantidadeAtual: 1, periodo: '01/04/2025', vencimento: '' },
    { id: 29, produto: 'Amida 80', peso: 100, medida: 'g', preco: 11.7, quantidade: 1, quantidadeAtual: 1, periodo: '01/04/2025', vencimento: '' },
    { id: 30, produto: 'Mentol', peso: 10, medida: 'g', preco: 8.2, quantidade: 1, quantidadeAtual: 1, periodo: '01/04/2025', vencimento: '' },
    { id: 31, produto: 'Água Mineral', peso: 20, medida: 'L', preco: 50, quantidade: 1, quantidadeAtual: 1, periodo: '01/04/2025', vencimento: '' },
    { id: 32, produto: 'Açúcar Refinado União', peso: 1, medida: 'Kg', preco: 5.5, quantidade: 1, quantidadeAtual: 1, periodo: '01/04/2025', vencimento: '' },
    { id: 33, produto: 'Sal Refinado Cisne', peso: 1, medida: 'Kg', preco: 4, quantidade: 1, quantidadeAtual: 1, periodo: '01/04/2025', vencimento: '' },
  ]
);