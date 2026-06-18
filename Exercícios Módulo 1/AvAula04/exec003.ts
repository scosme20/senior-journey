// Resultado imutável da paginação para qualquer tipo de dado.
type ResultadoPaginacao<T> = {
  readonly dados: T[];
  readonly totalPaginas: number;
  readonly paginaAtual: number;
  readonly temProxima: boolean;
  readonly temAnterior: boolean;
};

function paginar<T>(
  array: T[],
  paginaAtual: number,
  tamanhoPagina: number
): ResultadoPaginacao<T> {

  // Evita cálculos com parâmetros inválidos.
  if (tamanhoPagina <= 0) {
    throw new Error('Tamanho deve ser positivo.');
  }

  if (paginaAtual <= 0) {
    throw new Error('Pagina deve ser maior que zero.');
  }

  // Retorno explícito para coleções vazias.
  if (array.length === 0) {
    return {
      dados: [],
      totalPaginas: 0,
      paginaAtual: 1,
      temProxima: false,
      temAnterior: false
    };
  }

  const totalPaginas = Math.ceil(array.length / tamanhoPagina);

  const inicio = (paginaAtual - 1) * tamanhoPagina;
  const fim = inicio + tamanhoPagina;

  const dados = array.slice(inicio, fim);

  return {
    dados,
    totalPaginas,
    paginaAtual,
    temProxima: paginaAtual < totalPaginas,
    temAnterior: paginaAtual > 1
  };
}

type Funcionarios3 = {
  readonly id: string;
  nome: string;
  salario: number;
  departamento: string;
};

const funcionarios: Funcionarios3[] = [
  { id: 'f001', nome: 'Carlos', salario: 5000, departamento: 'TI' },
  { id: 'f002', nome: 'Ana', salario: 3500, departamento: 'RH' },
  { id: 'f003', nome: 'Pedro', salario: 7000, departamento: 'Financeiro' },
  { id: 'f004', nome: 'Marcos', salario: 4500, departamento: 'TI' },
  { id: 'f005', nome: 'Julia', salario: 6000, departamento: 'Marketing' }
];

// Página inicial
console.log('Pagina 1:', paginar(funcionarios, 1, 2));

// Página intermediária
console.log('Pagina 2:', paginar(funcionarios, 2, 2));

// Última página
console.log('Ultima pagina:', paginar(funcionarios, 3, 2));

// Página fora do intervalo retorna lista vazia
console.log('Pagina inexistente:', paginar(funcionarios, 99, 2));

// Coleção vazia
console.log('Array vazio:', paginar([], 1, 2));

// Validação de parâmetros
try {
  paginar(funcionarios, 1, 0);
} catch (e) {
  console.log('Esperado:', (e as Error).message);
}