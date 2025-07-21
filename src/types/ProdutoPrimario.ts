export type ProdutoPrimario = {
  id: string;
  produto: string;
  peso: number;
  medida: 'g' | 'L' | 'ml' | 'Kg';
  preco: number;
  quantidade: number;
  quantidadeAtual: number; // novo campo para estoque atual
  periodo: string;
  vencimento: string;
  imagem?: string;
};
