import { atom } from 'jotai';
import type { ProdutoPrimario } from '@types/ProdutoPrimario';

export const propriedadesAtom = atom<ProdutoPrimario[]>([
  { "id": 1, "produto": "Extrato Glicerinado Morango", "peso": 250, "medida": "g", "preco": 41.2, "quantidade": 1, "quantidadeAtual": 1, "periodo": "12/04/2025", "vencimento": "" },
  { "id": 2, "produto": "Extrato Glicerinado Morango", "peso": 250, "medida": "g", "preco": 41.2, "quantidade": 1, "quantidadeAtual": 1, "periodo": "17/05/2025", "vencimento": "" },
  { "id": 3, "produto": "Extrato Glicerinado Uva", "peso": 250, "medida": "g", "preco": 42.3, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "" },
  { "id": 4, "produto": "Extrato Glicerinado Lavanda", "peso": 250, "medida": "g", "preco": 48.8, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "" },
  { "id": 5, "produto": "Extrato Glicerinado Jabuticaba", "peso": 250, "medida": "g", "preco": 40.1, "quantidade": 1, "quantidadeAtual": 1, "periodo": "12/04/2025", "vencimento": "" },
  { "id": 6, "produto": "Extrato Glicerinado Barbatimão", "peso": 250, "medida": "g", "preco": 41.9, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "" },
  { "id": 7, "produto": "Extrato Glicerinado Leite de Cabra", "peso": 250, "medida": "g", "preco": 43.3, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "" },
  { "id": 8, "produto": "Extrato Glicerinado Tangerina", "peso": 250, "medida": "g", "preco": 40.2, "quantidade": 1, "quantidadeAtual": 1, "periodo": "17/05/2025", "vencimento": "" },
  { "id": 9, "produto": "Extrato Glicerinado Calêndula", "peso": 250, "medida": "g", "preco": 42.6, "quantidade": 1, "quantidadeAtual": 1, "periodo": "17/05/2025", "vencimento": "" },
  { "id": 10, "produto": "Extrato Glicerinado Mel", "peso": 250, "medida": "g", "preco": 40.9, "quantidade": 1, "quantidadeAtual": 1, "periodo": "17/05/2025", "vencimento": "" },
  { "id": 11, "produto": "Extrato Glicerinado Gérmen de Trigo", "peso": 250, "medida": "g", "preco": 33.2, "quantidade": 1, "quantidadeAtual": 1, "periodo": "03/06/2025", "vencimento": "" },
  { "id": 12, "produto": "Extrato em Pó de Pitaya", "peso": 200, "medida": "g", "preco": 53.8, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "" },
  { "id": 13, "produto": "Extrato em Pó de Blueberry", "peso": 200, "medida": "g", "preco": 59.2, "quantidade": 1, "quantidadeAtual": 1, "periodo": "17/05/2025", "vencimento": "" },
  { "id": 14, "produto": "Argila Rosa", "peso": 800, "medida": "g", "preco": 26.9, "quantidade": 1, "quantidadeAtual": 1, "periodo": "12/04/2025", "vencimento": "" },
  { "id": 15, "produto": "Dolomita em Pó", "peso": 800, "medida": "g", "preco": 27.8, "quantidade": 1, "quantidadeAtual": 1, "periodo": "12/04/2025", "vencimento": "" },
  { "id": 16, "produto": "Carvão Ativado de Bambu", "peso": 100, "medida": "g", "preco": 24.5, "quantidade": 1, "quantidadeAtual": 1, "periodo": "07/06/2025", "vencimento": "" },
  { "id": 17, "produto": "Manteiga de Karité", "peso": 100, "medida": "g", "preco": 22.3, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "" },
  { "id": 18, "produto": "Manteiga de Cupuaçú", "peso": 100, "medida": "g", "preco": 26.8, "quantidade": 1, "quantidadeAtual": 1, "periodo": "12/04/2025", "vencimento": "" },
  { "id": 19, "produto": "Óleo Vegetal Rosa Mosqueta", "peso": 100, "medida": "g", "preco": 24.5, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "" },
  { "id": 20, "produto": "Óleo Vegetal Rosa Mosqueta", "peso": 100, "medida": "g", "preco": 24.5, "quantidade": 1, "quantidadeAtual": 1, "periodo": "26/04/2025", "vencimento": "" },
  { "id": 21, "produto": "Óleo Vegetal Amêndoas Doce", "peso": 100, "medida": "g", "preco": 12.9, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "" },
  { "id": 22, "produto": "Óleo Vegetal Gérmen de Trigo", "peso": 100, "medida": "g", "preco": 16.9, "quantidade": 1, "quantidadeAtual": 1, "periodo": "12/04/2025", "vencimento": "" },
  { "id": 23, "produto": "Óleo Vegetal Semente de Uva", "peso": 100, "medida": "g", "preco": 12.5, "quantidade": 1, "quantidadeAtual": 1, "periodo": "26/04/2025", "vencimento": "" },
  { "id": 24, "produto": "Óleo Vegetal Abacate", "peso": 100, "medida": "g", "preco": 20, "quantidade": 1, "quantidadeAtual": 1, "periodo": "26/04/2025", "vencimento": "" },
  { "id": 25, "produto": "Óleo Vegetal de Coco de Babaçú", "peso": 500, "medida": "g", "preco": 52.5, "quantidade": 1, "quantidadeAtual": 1, "periodo": "12/04/2025", "vencimento": "" },
  { "id": 26, "produto": "Óleo Vegetal Calêndula", "peso": 100, "medida": "g", "preco": 18.6, "quantidade": 1, "quantidadeAtual": 1, "periodo": "17/05/2025", "vencimento": "" },
  { "id": 27, "produto": "Flor de Jasmin desidratada", "peso": 18, "medida": "g", "preco": 10.8, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "" },
  { "id": 28, "produto": "Lavanda Importada Desidratada", "peso": 20, "medida": "g", "preco": 10.5, "quantidade": 1, "quantidadeAtual": 1, "periodo": "01/04/2025", "vencimento": "" },
  { "id": 29, "produto": "Galho Flor Japonesa Malva", "peso": 24.1, "medida": "g", "preco": 24.1, "quantidade": 1, "quantidadeAtual": 1, "periodo": "05/04/2025", "vencimento": "" }
]);