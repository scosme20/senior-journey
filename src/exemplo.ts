// Classe abstrata — define o contrato, não pode ser instanciada
abstract class Funcionario {
    protected readonly _nome: string;
    protected _salario: number;

    constructor(nome: string, salario: number) {
        if (!nome.trim())  throw new Error('Nome não pode ser vazio.');
        if (salario <= 0)  throw new Error('Salário deve ser positivo.');

        this._nome   = nome;
        this._salario = salario;
    }

    get nome(): string    { return this._nome; }
    get salario(): number { return this._salario; }

    // Método concreto — herdado por todas as filhas
    exibirInfo(): string {
        return `${this._nome} (${this.cargo()}) — R$ ${this._salario}`;
    }

    // Métodos abstratos — cada filha OBRIGADA a implementar
    abstract cargo(): string;
    abstract trabalhar(): string;
}

// Classe filha — herda e especializa
class Desenvolvedor extends Funcionario {
    private readonly _linguagem: string;

    constructor(nome: string, salario: number, linguagem: string) {
        super(nome, salario); // chama o construtor do pai
        this._linguagem = linguagem;
    }

    // Obrigada a implementar — contrato cumprido
    cargo(): string    { return 'Desenvolvedor'; }
    trabalhar(): string {
        return `${this._nome} está codando em ${this._linguagem}`;
    }
}

class Designer extends Funcionario {
    private readonly _ferramenta: string;

    constructor(nome: string, salario: number, ferramenta: string) {
        super(nome, salario);
        this._ferramenta = ferramenta;
    }

    cargo(): string    { return 'Designer'; }
    trabalhar(): string {
        return `${this._nome} está criando interfaces no ${this._ferramenta}`;
    }
}

class Gerente extends Funcionario {
    private readonly _time: string[];

    constructor(nome: string, salario: number, time: string[]) {
        super(nome, salario);
        this._time = time;
    }

    cargo(): string    { return 'Gerente'; }
    trabalhar(): string {
        return `${this._nome} está coordenando ${this._time.length} pessoas`;
    }
}

// Polimorfismo — trata todos como Funcionario, cada um age diferente
const equipe: Funcionario[] = [
    new Desenvolvedor('Carlos', 8000, 'TypeScript'),
    new Designer('Ana',    6000, 'Figma'),
    new Gerente('Pedro',  12000, ['Carlos', 'Ana', 'Julia']),
];

// Um loop, todos os tipos — isso é polimorfismo
for (const membro of equipe) {
    console.log(membro.exibirInfo());
    console.log(membro.trabalhar());
}