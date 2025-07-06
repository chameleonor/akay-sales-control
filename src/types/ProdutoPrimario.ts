export type ProdutoPrimario = {
  id: number;
  produto: string;
  peso: number;
  medida: 'g' | 'L' | 'ml' | 'Kg';
  preco: number;
  quantidade: number;
  periodo: string;
  vencimento: string;
  imagem?: string;
};
