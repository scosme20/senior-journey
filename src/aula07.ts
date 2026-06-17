// ── INTERFACES ────────────────────────────────────────────────────
interface Notificavel {
    enviarNotificacao(mensagem: string): void;
}

interface Relatorio {
    gerarRelatorio(): string;
}

interface EntidadeBase {
    readonly id: string;
    criadoEm: Date;
}

// ── CLASSES ───────────────────────────────────────────────────────
class EmailService implements Notificavel {
    private readonly _destinatario: string;

    constructor(destinatario: string) {
        if (!destinatario.trim()) throw new Error('Destinatario nao pode ser vazio.');
        this._destinatario = destinatario;
    }

    enviarNotificacao(mensagem: string): void {
        console.log(`Email para ${this._destinatario}: ${mensagem}`);
    }
}

class RelatorioVendas implements EntidadeBase, Relatorio {
    readonly id: string;
    criadoEm: Date;
    private readonly _vendas: number[];

    constructor(id: string, vendas: number[]) {
        if (!id.trim())       throw new Error('ID nao pode ser vazio.');
        if (!vendas.length)   throw new Error('Vendas nao podem ser vazias.');
        this.id       = id;
        this.criadoEm = new Date();
        this._vendas  = vendas;
    }

    gerarRelatorio(): string {
        const total = this._vendas.reduce((acc, v) => acc + v, 0);
        return `Relatorio | Total: R$ ${total} | Quantidade: ${this._vendas.length}`;
    }
}

// ── GENERICS ──────────────────────────────────────────────────────
function ultimoItem<T>(arr: T[]): T | undefined {
    return arr[arr.length - 1];
}

function filtrarPorCampo<T>(lista: T[], campo: keyof T, valor: T[keyof T]): T[] {
    return lista.filter(item => item[campo] === valor);
}

function agruparPorCampo<T>(lista: T[], campo: keyof T): Record<string, T[]> {
    return lista.reduce((grupos, item) => {
        const chave = String(item[campo]);
        return {
            ...grupos,
            [chave]: [...(grupos[chave] ?? []), item],
        };
    }, {} as Record<string, T[]>);
}

// ── CACHE GENÉRICO ────────────────────────────────────────────────
class Cache<T extends EntidadeBase> {
    private readonly _itens = new Map<string, T>();

    set(item: T): void            { this._itens.set(item.id, item); }
    get(id: string): T | undefined { return this._itens.get(id); }
    listar(): T[]                  { return [...this._itens.values()]; }
    tamanho(): number              { return this._itens.size; }
}

// ── USO ───────────────────────────────────────────────────────────
const email = new EmailService('joao@email.com');
email.enviarNotificacao('Pedido aprovado!');

const relatorio = new RelatorioVendas('rel-001', [350, 890, 120, 670]);
console.log(relatorio.gerarRelatorio());

const cache = new Cache<RelatorioVendas>();
cache.set(relatorio);
console.log(cache.tamanho());      // 1
console.log(cache.get('rel-001')); // RelatorioVendas