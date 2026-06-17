// PascalCase para tipos — convenção universal
type TipoCliente = "regular" | "vip";
type TemCupom    = "sim"     | "nao";

// Pedido só carrega dados de entrada — não resultados
type Pedido = {
    quantidade:    number;
    precoUnitario: number;
    tipoCliente:   TipoCliente;
    temCupom:      TemCupom;
};

// Constantes nomeadas — sem números mágicos
const DESCONTO_VIP     = 0.20;
const DESCONTO_REGULAR = 0.05;
const DESCONTO_CUPOM   = 0.10;

function calcularDesconto(pedido: Pedido): number {
    // Desconto base por tipo de cliente
    let desconto = pedido.tipoCliente === "vip"
        ? DESCONTO_VIP
        : DESCONTO_REGULAR;

    // Cupom acumula com o desconto base
    if (pedido.temCupom === "sim") {
        desconto += DESCONTO_CUPOM;
    }

    return desconto;
}

function calcularTotalPedido(pedido: Pedido): number {
    // Guard clauses — valida cada campo separadamente
    if (pedido.quantidade <= 0) {
        throw new Error("Quantidade deve ser maior que zero.");
    }
    if (pedido.precoUnitario <= 0) {
        throw new Error("Preço unitário deve ser maior que zero.");
    }

    const subtotal  = pedido.quantidade * pedido.precoUnitario;
    const desconto  = calcularDesconto(pedido);

    return subtotal * (1 - desconto);
}

// Exemplo de uso
const pedido: Pedido = {
    quantidade:    3,
    precoUnitario: 100,
    tipoCliente:   "vip",
    temCupom:      "sim",
};

// VIP (20%) + cupom (10%) = 30% de desconto
// 3 * 100 = 300 → 300 * 0.70 = 210
console.log(calcularTotalPedido(pedido)); // 210