/**
 * Representa um item dentro do carrinho.
 * Valida todos os campos na criacao — nunca nasce invalido.
 */
class CartItem {
    constructor(
        readonly id: string,
        readonly produto: string,
        readonly quantidade: number,
        readonly preco: number
    ) {
        if (!id.trim())       throw new Error('ID nao pode ser vazio.');
        if (!produto.trim())  throw new Error('Produto nao pode ser vazio.');
        if (quantidade <= 0)  throw new Error('Quantidade deve ser positiva.');
        if (preco < 0)        throw new Error('Preco nao pode ser negativo.');
    }

    /** Valor total do item: quantidade × preco. Calculado, nunca armazenado. */
    get total(): number {
        return this.quantidade * this.preco;
    }
}

/**
 * Gerencia o carrinho de compras.
 * Unico ponto de entrada para modificacoes no estado.
 */
class ShoppingCart {
    private readonly _itens: CartItem[] = [];
    private _cupomAplicado: string | null = null;
    private _desconto = 0;

    /** Adiciona item ao carrinho com validacao. */
    adicionarItem(item: CartItem): void {
        this._itens.push(item);
    }

    /** Remove item pelo ID. Silencioso se nao existir. */
    removerItem(id: string): void {
        const index = this._itens.findIndex(i => i.id === id);
        if (index === -1) return;
        this._itens.splice(index, 1);
    }

    /**
     * Aplica cupom de desconto.
     * Lanca erro se ja existe cupom ou percentual invalido.
     */
    aplicarCupom(codigo: string, percentual: number): void {
        if (percentual < 0 || percentual > 100) {
            throw new Error('Desconto deve estar entre 0 e 100.');
        }
        if (this._cupomAplicado) {
            throw new Error(`Cupom '${this._cupomAplicado}' ja esta aplicado.`);
        }
        this._cupomAplicado = codigo;
        this._desconto = percentual;
    }

    /** Soma de todos os itens sem desconto. */
    get subtotal(): number {
        return this._itens.reduce((total, item) => total + item.total, 0);
    }

    /** Total com desconto aplicado. */
    get total(): number {
        return this.subtotal * (1 - this._desconto / 100);
    }

    /** Resumo do carrinho para exibicao. */
    get resumo(): string {
        const itens = this._itens
            .map(i => `  ${i.produto} x${i.quantidade} = R$ ${i.total}`)
            .join('\n');
        const cupom = this._cupomAplicado
            ? `Cupom: ${this._cupomAplicado} (-${this._desconto}%)`
            : 'Sem cupom';
        return [
            `=== Carrinho ===`,
            itens,
            `Subtotal: R$ ${this.subtotal}`,
            cupom,
            `Total: R$ ${this.total}`,
        ].join('\n');
    }

    /** Limpa carrinho e reseta desconto. */
    limpar(): void {
        this._itens.length = 0;
        this._cupomAplicado = null;
        this._desconto = 0;
    }
}

// Cenário 1 — fluxo normal com desconto
const carrinho = new ShoppingCart();
carrinho.adicionarItem(new CartItem('1', 'Notebook', 1, 3500));
carrinho.adicionarItem(new CartItem('2', 'Mouse', 2, 100));
carrinho.aplicarCupom('PROMO10', 10);
console.log(carrinho.resumo);

// Cenário 2 — carrinho vazio
const vazio = new ShoppingCart();
console.log('Total vazio:', vazio.total); // 0

// Cenário 3 — desconto invalido
try {
    new ShoppingCart().aplicarCupom('ERRADO', 150);
} catch (e) {
    console.log('Esperado:', (e as Error).message);
}

// Cenário 4 — cupom duplo
try {
    const c = new ShoppingCart();
    c.aplicarCupom('PROMO10', 10);
    c.aplicarCupom('PROMO20', 20);
} catch (e) {
    console.log('Esperado:', (e as Error).message);
}

// Cenário 5 — item invalido
try {
    new CartItem('', 'Produto', 1, 100);
} catch (e) {
    console.log('Esperado:', (e as Error).message);
}