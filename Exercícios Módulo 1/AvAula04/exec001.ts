// Departamento restrito aos valores válidos da aplicação.
type Departamento = 'TI' | 'RH' | 'Financeiro' | 'Marketing';

// Utiliza estados explícitos em vez de boolean para permitir expansão futura.
type StatusFuncionario = 'ativo' | 'inativo' | 'ferias';

type Funcionarios = {
  readonly id: string;
  nome: string;
  salario: number;
  departamento: Departamento;
  status: StatusFuncionario;
};

const funcionario: Funcionarios[] = [
  { id: 'f001', nome: 'Ana', salario: 8500, departamento: 'TI', status: 'ativo' },
  { id: 'f002', nome: 'Bruno', salario: 5200, departamento: 'RH', status: 'inativo' },
  { id: 'f003', nome: 'Carla', salario: 9800, departamento: 'TI', status: 'ativo' },
  { id: 'f004', nome: 'Diego', salario: 6300, departamento: 'Financeiro', status: 'ativo' },
  { id: 'f005', nome: 'Eva', salario: 7100, departamento: 'Marketing', status: 'ativo' },
];

const ativosDeTI = funcionario
  .filter(f => f.status === 'ativo')
  .filter(f => f.departamento === 'TI');

const folhaTotalAtivos = funcionario
  .filter(f => f.status === 'ativo')
  .reduce((total, f) => total + f.salario, 0);

function formatarFuncionarios(lista: Funcionarios[]): string[] {
  return lista.map(
    f => `${f.nome} — R$ ${f.salario} | ${f.departamento} | ${f.status}`
  );
}

const temAltoSalario = funcionario.some(f => f.salario > 9000);

// Função pura: retorna uma nova coleção sem alterar a original.
function adicionarFuncionario(
  lista: Funcionarios[],
  novo: Funcionarios
): Funcionarios[] {
  return [...lista, novo];
}

const novoFuncionario: Funcionarios = {
  id: 'f006',
  nome: 'Sebastiao',
  salario: 6000,
  departamento: 'TI',
  status: 'ativo',
};

const funcionariosAtualizados = adicionarFuncionario(
  funcionario,
  novoFuncionario
);

console.log('Ativos de TI:', ativosDeTI);
console.log('Folha total ativos: R$', folhaTotalAtivos);
console.log('Lista:', formatarFuncionarios(funcionario));
console.log('Tem alto salario?', temAltoSalario);
console.log('Original:', funcionario.length, 'itens');
console.log('Atualizado:', funcionariosAtualizados.length, 'itens');