type StatusPedido = 'pendente' | 'processando' | 'concluido' | 'cancelado';

type Pedido = {
  readonly id: string; 
  cliente: string; 
  valor: number;
  status: StatusPedido; 
  criadoEm: Date;
};

const pedidos: Pedido[] = [
  {id:'p001',cliente:'Carlos',valor:350, status:'concluido',  criadoEm:new Date('2024-01-01')},
  {id:'p002',cliente:'Ana',   valor:120, status:'pendente',   criadoEm:new Date('2024-01-02')},
  {id:'p003',cliente:'Carlos',valor:890, status:'processando',criadoEm:new Date('2024-01-03')},
  {id:'p004',cliente:'Julia', valor:45,  status:'cancelado',  criadoEm:new Date('2024-01-04')},
  {id:'p005',cliente:'Ana',   valor:670, status:'pendente',   criadoEm:new Date('2024-01-05')},
  {id:'p006',cliente:'Pedro', valor:230, status:'concluido',  criadoEm:new Date('2024-01-06')},
];

console.log("--- TAREFA 1: ÍNDICE O(1) ---");
/**
 * JUSTIFICATIVA SÊNIOR:
 * Escolha: 'Map<string, Pedido>' nativo do ES6.
 * Motivo: Em arrays (Listas), a busca por ID exige uma varredura linear O(n). Ao indexar os dados 
 * em uma tabela Hash (Map), mapeando o ID diretamente para a referência do objeto, reduzimos a 
 * complexidade de tempo de busca para O(1) em média. O Map é preferível a objetos literais ({}) 
 * aqui por preservar a ordem de inserção, aceitar qualquer tipo de chave e não herdar propriedades do protótipo.
 */
const tabelaPedidos = new Map<string, Pedido>();
pedidos.forEach(p => tabelaPedidos.set(p.id, p));

console.log(tabelaPedidos.get('p003'));
console.log(tabelaPedidos.get('p006'));


console.log("\n--- TAREFA 2: CLIENTES ÚNICOS ---");
/**
 * JUSTIFICATIVA SÊNIOR:
 * Escolha: 'Set<string>' + Array.prototype.sort().
 * Motivo: O 'Set' é uma coleção de valores únicos onde a complexidade para inserção e verificação 
 * de existência é de tempo constante O(1). Usar um Set evita que façamos checagens manuais caras 
 * como 'indexOf' ou 'includes' (que operam em O(n) a cada iteração). Como o Set não garante ordem 
 * alfabética por padrão, fazemos o espalhamento (spread) para um Array para aplicar o método de ordenação.
 */
const clientesUnicos = new Set<string>();
pedidos.forEach(p => clientesUnicos.add(p.cliente));

const clientesOrdenados = [...clientesUnicos].sort((a, b) => a.localeCompare(b));
console.log(clientesOrdenados);


console.log("\n--- TAREFA 3: AGRUPAMENTO POR STATUS ---");
/**
 * JUSTIFICATIVA SÊNIOR:
 * Escolha: 'Map<StatusPedido, Pedido[]>' acoplado a um 'reduce'.
 * Motivo: O agrupamento categórico exige chaves dinâmicas baseadas no tipo restrito 'StatusPedido'.
 * O 'Map' nos dá tipagem estática forte para as chaves e evita vulnerabilidades de segurança (como Prototype Pollution).
 * O 'reduce' é a estrutura funcional ideal aqui, pois transforma uma coleção linear (array) em uma 
 * estrutura agregada complexa em uma única passada O(n).
 */
const agrupadoPorStatus = pedidos.reduce((acc, pedido) => {
  const lista = acc.get(pedido.status) || [];
  lista.push(pedido);
  acc.set(pedido.status, lista);
  return acc;
}, new Map<StatusPedido, Pedido[]>());

agrupadoPorStatus.forEach((lista, status) => {
  console.log(`Status [${status}]: ${lista.length} pedido(s)`);
});


console.log("\n--- TAREFA 4: FILA DE PROCESSAMENTO ---");
/**
 * JUSTIFICATIVA SÊNIOR:
 * Escolha: Fila (Queue) simulada via Array com padrão FIFO (First-In, First-Out).
 * Motivo: Para fluxos de processamento assíncronos, Jobs ou pipelines de pedidos, a ordem de chegada 
 * deve ser estritamente respeitada para garantir justiça (Fairness) no atendimento. Usamos '.shift()' 
 * para extrair o elemento mais antigo da fila. *(Nota Sênior: Para grandes volumes, arrays tradicionais têm 
 * custo O(n) no shift devido ao rearranjo dos índices; em produção, uma lista duplamente ligada seria usada).*
 */
const filaProcessamento: Pedido[] = pedidos.filter(p => p.status === 'pendente');

while (filaProcessamento.length > 0) {
  const proximoPedido = filaProcessamento.shift(); // FIFO: Tira o primeiro que entrou
  if (proximoPedido) {
    console.log(`Processando -> ID: ${proximoPedido.id} | Cliente: ${proximoPedido.cliente}`);
  }
}


console.log("\n--- TAREFA 5: HISTÓRICO COM STACK ---");
/**
 * JUSTIFICATIVA SÊNIOR:
 * Escolha: Pilha (Stack) simulada via Array com padrão LIFO (Last-In, First-Out).
 * Motivo: A operação de "Desfazer" (Undo) exige que a última ação executada pelo usuário seja a primeira 
 * a ser revertida. A pilha gerencia esse estado de forma perfeita com as operações de empilhar ('.push()') 
 * em tempo O(1) e desempilhar ('.pop()') também em O(1), mantendo o histórico em ordem cronológica inversa.
 */
type Acao = { tipo: string; pedidoId: string };
const historicoAcoes: Acao[] = [];

// Simulando 3 ações (Empilhando)
historicoAcoes.push({ tipo: 'CRIAR', pedidoId: 'p001' });
historicoAcoes.push({ tipo: 'ATUALIZAR_STATUS', pedidoId: 'p002' });
historicoAcoes.push({ tipo: 'DELETAR', pedidoId: 'p004' });

console.log(`Ações no histórico: ${historicoAcoes.length}`);

// Implementando o desfazer até esvaziar a pilha
while (historicoAcoes.length > 0) {
  const acaoDesfeita = historicoAcoes.pop(); // LIFO: Remove o último elemento inserido
  console.log(`Desfazendo ação: ${acaoDesfeita?.tipo} no pedido ${acaoDesfeita?.pedidoId}`);
}

console.log(`Histórico vazio? ${historicoAcoes.length === 0}`);