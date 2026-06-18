type Transacao = {
  readonly id: string;
  readonly vendedor: string;
  readonly valor: number;
  readonly produto: string;
  readonly data: string;
};

const transacoes: Transacao[] = [
  { id: 't001', vendedor: 'Carlos', valor: 1200, produto: 'Notebook', data: '2024-01' },
  { id: 't002', vendedor: 'Ana', valor: 350, produto: 'Mouse', data: '2024-01' },
  { id: 't003', vendedor: 'Carlos', valor: 890, produto: 'Monitor', data: '2024-02' },
  { id: 't004', vendedor: 'Pedro', valor: 2100, produto: 'MacBook', data: '2024-02' },
  { id: 't005', vendedor: 'Ana', valor: 670, produto: 'Teclado', data: '2024-03' },
  { id: 't006', vendedor: 'Pedro', valor: 450, produto: 'Headset', data: '2024-03' },
];

// Calcula o faturamento acumulado por vendedor.
function calcularTotalPorVendedor(
  lista: Transacao[]
): Record<string, number> {
  return lista.reduce<Record<string, number>>(
    (acc, { vendedor, valor }) => ({
      ...acc,
      [vendedor]: (acc[vendedor] ?? 0) + valor
    }),
    {}
  );
}

type VendedorRanking = {
  vendedor: string;
  total: number;
};

// Retorna os vendedores ordenados por faturamento.
function rankearVendedores(
  totais: Record<string, number>
): VendedorRanking[] {
  return Object.entries(totais)
    .map(([vendedor, total]) => ({ vendedor, total }))
    .sort((a, b) => b.total - a.total);
}

function obterTop3(
  ranking: VendedorRanking[]
): VendedorRanking[] {
  return ranking.slice(0, 3);
}

// Evita divisão por zero quando não existem transações.
function calcularMediaTicket(
  lista: Transacao[]
): number {
  if (lista.length === 0) return 0;

  const soma = lista.reduce(
    (total, { valor }) => total + valor,
    0
  );

  return soma / lista.length;
}

// Recebe a média como parâmetro para evitar acoplamento
// com a estratégia de cálculo utilizada.
function filtrarAcimaDaMedia(
  lista: Transacao[],
  media: number
): Transacao[] {
  return lista.filter(({ valor }) => valor > media);
}

const totais = calcularTotalPorVendedor(transacoes);
const ranking = rankearVendedores(totais);
const top3 = obterTop3(ranking);
const media = calcularMediaTicket(transacoes);
const acimaDaMedia = filtrarAcimaDaMedia(transacoes, media);

console.log('Total por vendedor:', totais);
console.log('Ranking completo:', ranking);
console.log('Top 3:', top3);
console.log('Media de ticket: R$', media.toFixed(2));
console.log('Acima da media:', acimaDaMedia);