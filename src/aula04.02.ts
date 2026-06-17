type StatusLivro = 'disponivel' | 'emprestado' | 'reservado';
type Genero = 'ficcao' | 'tecnico' | 'biografia' | 'historia';

type Livro = {
    readonly isbn: string;
    titulo: string;
    autor: string;
    ano: number;
    genero: Genero;
    status: StatusLivro;
    paginas: number;
};

const biblioteca: Livro[] = [
    { isbn: 'L001', titulo: 'Clean Code',              autor: 'Robert Martin', ano: 2008, genero: 'tecnico',   status: 'disponivel', paginas: 431 },
    { isbn: 'L002', titulo: 'O Hobbit',                autor: 'Tolkien',       ano: 1937, genero: 'ficcao',    status: 'emprestado', paginas: 310 },
    { isbn: 'L003', titulo: 'The Pragmatic Programmer', autor: 'Hunt e Thomas', ano: 1999, genero: 'tecnico',   status: 'disponivel', paginas: 352 },
    { isbn: 'L004', titulo: 'Sapiens',                 autor: 'Harari',        ano: 2011, genero: 'historia',  status: 'reservado',  paginas: 443 },
    { isbn: 'L005', titulo: 'Elon Musk',               autor: 'Isaacson',      ano: 2023, genero: 'biografia', status: 'disponivel', paginas: 615 },
    { isbn: 'L006', titulo: 'Design Patterns',         autor: 'GoF',           ano: 1994, genero: 'tecnico',   status: 'emprestado', paginas: 395 },
];

// TAREFA 1 — livros disponíveis
function listarLivrosDisponiveis(acervo: Livro[]): Livro[] {
    return acervo.filter(l => l.status === 'disponivel');
}

// TAREFA 2 — total de páginas dos técnicos
function totalPaginasTecnicos(acervo: Livro[]): number {
    return acervo
        .filter(l => l.genero === 'tecnico')
        .reduce((total, l) => total + l.paginas, 0);
}

// TAREFA 3 — lista formatada de cada livro
function formatarListaLivros(acervo: Livro[]): string[] {
    return acervo.map(l => `${l.titulo} (${l.ano}) — ${l.autor}`);
}

// TAREFA 4 — todos têm mais de 100 páginas?
function verificarPaginasMinimas(acervo: Livro[], minimo: number): boolean {
    return acervo.every(l => l.paginas > minimo);
}

// TAREFA 5 — primeiro técnico disponível
function buscarPrimeiroTecnicoDisponivel(acervo: Livro[]): Livro | undefined {
    return acervo.find(l => l.genero === 'tecnico' && l.status === 'disponivel');
}

// TAREFA 6 — adicionar sem mutar o original
function adicionarLivro(acervo: Livro[], novoLivro: Livro): Livro[] {
    return [...acervo, novoLivro];
}

// Uso
const novoLivro: Livro = {
    isbn:    'L007',
    titulo:  'Refactoring',
    autor:   'Martin Fowler',
    ano:     1999,
    genero:  'tecnico',
    status:  'disponivel',
    paginas: 448,
};

const bibliotecaAtualizada = adicionarLivro(biblioteca, novoLivro);

console.log(listarLivrosDisponiveis(biblioteca));
console.log(totalPaginasTecnicos(biblioteca));
console.log(formatarListaLivros(biblioteca));
console.log(verificarPaginasMinimas(biblioteca, 100));
console.log(buscarPrimeiroTecnicoDisponivel(biblioteca));
console.log(biblioteca.length);           // 6 — intacto
console.log(bibliotecaAtualizada.length); // 7
