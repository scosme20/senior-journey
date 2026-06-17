type CategoriaEstoque = 'eletronico' | 'vestuario' | 'alimento';

class Produto {
    private readonly _nome: string;
    private readonly _categoria: CategoriaEstoque;
    private _preco: number;
    private _quantidade: number;

    constructor(
        nome: string,
        preco: number,
        quantidade: number,
        categoria: CategoriaEstoque
    ) {
        if (!nome.trim())    throw new Error('Nome não pode ser vazio.');
        if (preco <= 0)      throw new Error('Preço deve ser maior que zero.');
        if (quantidade < 0)  throw new Error('Quantidade não pode ser negativa.');

        this._nome       = nome;
        this._preco      = preco;
        this._quantidade = quantidade;
        this._categoria  = categoria;
    }

    get nome(): string              { return this._nome; }
    get preco(): number             { return this._preco; }
    get quantidade(): number        { return this._quantidade; }
    get categoria(): CategoriaEstoque { return this._categoria; }

    adicionarEstoque(quantidade: number): void {
        if (quantidade <= 0) throw new Error('Quantidade deve ser positiva.');
        this._quantidade += quantidade;
    }

    removerEstoque(quantidade: number): void {
        if (quantidade <= 0)             throw new Error('Quantidade deve ser positiva.');
        if (quantidade > this._quantidade) throw new Error('Estoque insuficiente.');
        this._quantidade -= quantidade;
    }

    aplicarDesconto(percentual: number): void {
        if (percentual < 0 || percentual > 100) {
            throw new Error('Percentual deve estar entre 0 e 100.');
        }
        this._preco -= this._preco * (percentual / 100);
    }

    atualizarPreco(novoPreco: number): void {
        if (novoPreco <= 0) throw new Error('Preço deve ser maior que zero.');
        this._preco = novoPreco;
    }

    toString(): string {
        return `${this._nome} | R$ ${this._preco} | Estoque: ${this._quantidade}`;
    }
}

// Cenário 1 — criação válida e operações normais
const produto = new Produto('Smartphone', 1500, 50, 'eletronico');
produto.adicionarEstoque(10);
produto.aplicarDesconto(10);
console.log(produto.toString()); // Smartphone | R$ 1350 | Estoque: 60

// Cenário 2 — dados inválidos na criação
try {
    new Produto('', 2500, 90, 'eletronico');
} catch (e) {
    console.log('Esperado:', (e as Error).message);
}

// Cenário 3 — remover mais do que existe
try {
    const p = new Produto('Macbook', 10000, 10, 'eletronico');
    p.removerEstoque(15);
} catch (e) {
    console.log('Esperado:', (e as Error).message);
}