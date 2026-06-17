abstract class FormaGeometrica {
    protected readonly _cor: string;

    constructor(cor: string) {
        if (!cor.trim()) throw new Error('Cor não pode ser vazia.');
        this._cor = cor;
    }

    get cor(): string { return this._cor; }

    exibirInfo(): string {
        return `Forma: ${this.tipo()} | Cor: ${this._cor} | Area: ${this.calcularArea().toFixed(2)}`;
    }

    abstract calcularArea(): number;
    abstract tipo(): string;
}

class Circulo extends FormaGeometrica {
    private readonly _raio: number;

    constructor(cor: string, raio: number) {
        super(cor);
        if (raio <= 0) throw new Error('Raio deve ser positivo.');
        this._raio = raio;
    }

    calcularArea(): number { return Math.PI * this._raio ** 2; }
    tipo(): string         { return 'Circulo'; }
}

class Retangulo extends FormaGeometrica {
    private readonly _largura: number;
    private readonly _altura: number;

    constructor(cor: string, largura: number, altura: number) {
        super(cor);
        if (largura <= 0) throw new Error('Largura deve ser positiva.');
        if (altura <= 0)  throw new Error('Altura deve ser positiva.');
        this._largura = largura;
        this._altura  = altura;
    }

    calcularArea(): number { return this._largura * this._altura; }
    tipo(): string         { return 'Retangulo'; }
}

class Triangulo extends FormaGeometrica {
    private readonly _base: number;
    private readonly _altura: number;

    constructor(cor: string, base: number, altura: number) {
        super(cor);
        if (base <= 0)   throw new Error('Base deve ser positiva.');
        if (altura <= 0) throw new Error('Altura deve ser positiva.');
        this._base   = base;
        this._altura = altura;
    }

    calcularArea(): number { return (this._base * this._altura) / 2; }
    tipo(): string         { return 'Triangulo'; }
}

const formas: FormaGeometrica[] = [
    new Circulo('vermelho', 5),
    new Retangulo('azul', 4, 6),
    new Triangulo('verde', 4, 5),
];

for (const forma of formas) {
    console.log(forma.exibirInfo());
}

const areaTotal = formas.reduce((acc, f) => acc + f.calcularArea(), 0);
console.log(`Area total: ${areaTotal.toFixed(2)}`);