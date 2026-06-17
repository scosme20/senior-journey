type StatusPedido = 'pendente' | 'aprovado' | 'cancelado';

type Order = {
    readonly id: string;
    cliente: string;
    valor: number;
    status: StatusPedido;
    itens: string[];
};

const pedidos: Order[] = [
    { id: '001', cliente: 'Carlos', valor: 350,  status: 'aprovado',  itens: ['notebook', 'mouse'] },
    { id: '002', cliente: 'Ana',    valor: 120,  status: 'pendente',  itens: ['teclado'] },
    { id: '003', cliente: 'Pedro',  valor: 890,  status: 'aprovado',  itens: ['monitor', 'cadeira'] },
    { id: '004', cliente: 'Julia',  valor: 45,   status: 'cancelado', itens: ['mousepad'] },
    { id: '005', cliente: 'Carlos', valor: 670,  status: 'pendente',  itens: ['headset', 'webcam'] },
];

// TAREFA 1: pedidos aprovados
const pedidosAprovados = pedidos.filter(p => p.status === 'aprovado');

// TAREFA 2: total apenas dos aprovados
const totalAprovados = pedidos
    .filter(p => p.status === 'aprovado')
    .reduce((total, p) => total + p.valor, 0);
// 350 + 890 = 1240

// TAREFA 3: lista "cliente — R$ valor" de cada pedido
const listaPedidos = pedidos.map(p => `${p.cliente} — R$ ${p.valor}`);

// TAREFA 4: existe algum pedido acima de R$ 800?
const temPedidoAltoValor = pedidos.some(p => p.valor > 800);

// TAREFA 5: novo pedido SEM mutar o original
const adicionarPedido = (lista: Order[], novoPedido: Order): Order[] => {
    return [...lista, novoPedido];
};

const novoPedido: Order = {
    id: '006',
    cliente: 'Beatriz',
    valor: 430,
    status: 'pendente',
    itens: ['webcam'],
};

const pedidosAtualizados = adicionarPedido(pedidos, novoPedido);

console.log('Aprovados:', pedidosAprovados);
console.log('Total aprovados: R$', totalAprovados);
console.log('Lista:', listaPedidos);
console.log('Tem alto valor?', temPedidoAltoValor);
console.log('Original tem itens:', pedidos.length);        // 5 — intacto
console.log('Atualizado tem itens:', pedidosAtualizados.length); // 6