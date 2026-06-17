// DECISÃO 1: Union Type para tipo de entrega
// Mesmo raciocínio do exercício anterior — valores fixos = Union Type.
type TipoEntrega = 'expresso' | 'padrao' | 'economico';

// DECISÃO 2: interface para o objeto de entrada
// Freight é uma entidade com campos relacionados — interface comunica isso.
interface Frete {
    readonly peso: number;      // readonly: dados de entrada não mudam durante o cálculo
    readonly distancia: number;
    readonly tipo: TipoEntrega;
}

// DECISÃO 3: constantes nomeadas eliminam números mágicos
// 5, 2, 3, 1, 1.5, 0.5, 15 espalhados no código são números mágicos.
// Se a regra de negócio mudar (ex: frete mínimo sobe para R$20),
// com constante muda em um lugar. Com número mágico, busca em todo o código.
const FRETE_MINIMO            = 15;
const TAXA_PESO_EXPRESSO      = 5;
const TAXA_DISTANCIA_EXPRESSO = 2;
const TAXA_PESO_PADRAO        = 3;
const TAXA_DISTANCIA_PADRAO   = 1;
const TAXA_PESO_ECONOMICO     = 1.5;
const TAXA_DISTANCIA_ECONOMICO = 0.5;

// DECISÃO 4: funções de cálculo recebem peso e distância, não o objeto inteiro
// calcularFreteExpresso(frete) só usa frete.peso e frete.distancia.
// Receber os valores diretamente torna a função mais pura:
// pode ser testada com qualquer número, sem precisar montar um objeto Frete.
function calcularFreteExpresso(peso: number, distancia: number): number {
    return TAXA_PESO_EXPRESSO * peso + TAXA_DISTANCIA_EXPRESSO * distancia;
}

function calcularFretePadrao(peso: number, distancia: number): number {
    return TAXA_PESO_PADRAO * peso + TAXA_DISTANCIA_PADRAO * distancia;
}

function calcularFreteEconomico(peso: number, distancia: number): number {
    return TAXA_PESO_ECONOMICO * peso + TAXA_DISTANCIA_ECONOMICO * distancia;
}

// DECISÃO 5: aplicar mínimo como função separada
// applyMinimumFreight é uma regra de negócio independente.
// Separada, pode ser testada isoladamente e reutilizada em outros contextos.
function aplicarFreteMinimo(valor: number): number {
    return Math.max(valor, FRETE_MINIMO);
}

// DECISÃO 6: Record<TipoEntrega, Function> — tabela de estratégias
// Em vez de switch com 3 casos, usamos um objeto que mapeia
// cada tipo à sua função de cálculo.
// Isso é o padrão Strategy — você vai ver ele formalmente no Módulo 4.
// Vantagem: adicionar um novo tipo de frete = adicionar uma linha no Record.
// Com switch: abrir a função e adicionar um case.
type CalculadorFrete = (peso: number, distancia: number) => number;

const CALCULADORES: Record<TipoEntrega, CalculadorFrete> = {
    expresso:  calcularFreteExpresso,
    padrao:    calcularFretePadrao,
    economico: calcularFreteEconomico,
};

// DECISÃO 7: função principal com guard clause + retorno number
// Guard clause valida antes de calcular — objeto nunca processa dados inválidos.
// Retorna number em vez de void — quem chama decide como usar o valor.
function calcularFrete(frete: Frete): number {
    if (frete.peso <= 0)     throw new Error('Peso deve ser positivo.');
    if (frete.distancia <= 0) throw new Error('Distância deve ser positiva.');

    const calcular = CALCULADORES[frete.tipo];
    return aplicarFreteMinimo(calcular(frete.peso, frete.distancia));
}

// DECISÃO 8: formatação separada do cálculo
// formatarFrete monta a string de exibição.
// calcularFrete faz o cálculo.
// Separar permite testar o cálculo sem depender da formatação.
function formatarFrete(frete: Frete): string {
    const total = calcularFrete(frete);
    return [
        `Peso: ${frete.peso} kg`,
        `Distância: ${frete.distancia} km`,
        `Tipo: ${frete.tipo}`,
        `Total: R$ ${total.toFixed(2)}`,
    ].join('\n');
}

// Testes
const freteGrande: Frete = { peso: 10, distancia: 15, tipo: 'expresso' };
const fretePequeno: Frete = { peso: 1,  distancia: 1,  tipo: 'economico' };

console.log(formatarFrete(freteGrande));
console.log('---');
console.log(formatarFrete(fretePequeno)); // deve aplicar mínimo R$15

// Cenário de erro
try {
    calcularFrete({ peso: -1, distancia: 10, tipo: 'padrao' });
} catch (e) {
    console.log('Esperado:', (e as Error).message);
}