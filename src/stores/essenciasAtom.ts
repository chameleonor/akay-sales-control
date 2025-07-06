import { atom } from 'jotai';
import { ProdutoPrimario } from '@types/ProdutoPrimario';

export const essenciasAtom = atom<ProdutoPrimario[]>([
  { id: 1, produto: 'Sakura Gold', peso: 500, medida: 'g', preco: 143.9, quantidade: 1, periodo: '01/04/2025', vencimento: '', imagem: '' },
  { id: 2, produto: 'Vanilla Home Gold', peso: 500, medida: 'g', preco: 143.9, quantidade: 1, periodo: '01/04/2025', vencimento: '', imagem: '' },
  { id: 3, produto: 'Lavanda Francesa Gold', peso: 500, medida: 'g', preco: 143.9, quantidade: 1, periodo: '01/04/2025', vencimento: '', imagem: '' },
  { id: 4, produto: 'Lavanda Francesa Gold', peso: 500, medida: 'g', preco: 143.9, quantidade: 1, periodo: '07/06/2025', vencimento: '', imagem: '' },
  { id: 5, produto: 'Figo Flower', peso: 100, medida: 'g', preco: 26.9, quantidade: 1, periodo: '26/04/2025', vencimento: '', imagem: '' },
  { id: 6, produto: 'Mel', peso: 100, medida: 'g', preco: 26.9, quantidade: 1, periodo: '17/05/2025', vencimento: '', imagem: '' },
  { id: 7, produto: 'Aveia', peso: 100, medida: 'g', preco: 26.9, quantidade: 1, periodo: '17/05/2025', vencimento: '', imagem: '' },
  { id: 8, produto: 'Bamboo', peso: 100, medida: 'g', preco: 26.9, quantidade: 1, periodo: '07/06/2025', vencimento: '', imagem: '' },
  { id: 9, produto: 'Flor de Lótus Gold', peso: 100, medida: 'g', preco: 29.9, quantidade: 1, periodo: '03/06/2025', vencimento: '', imagem: '' },
  { id: 10, produto: 'Perfumaria Feroz', peso: 100, medida: 'g', preco: 59.3, quantidade: 1, periodo: '17/05/2025', vencimento: '', imagem: '' },
  { id: 11, produto: 'Perfumaria Special Blue', peso: 100, medida: 'g', preco: 59.3, quantidade: 1, periodo: '03/06/2025', vencimento: '', imagem: '' },
]);