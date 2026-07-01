// =========================
// Type
// =========================

type TarefaStatus =
  | "pendente"
  | "em_progresso"
  | "concluida"
  | "cancelada";

// =========================
// Interfaces
// =========================

interface Persistivel {
  salvar(): void;
  deletar(): void;
}

interface Exportavel {
  exportarJSON(): string;
}

// =========================
// Classe Abstrata
// =========================

abstract class EntidadeBase {
  public readonly id: string;
  public readonly criadoEm: Date;
  protected atualizadoEm: Date;

  constructor(id: string) {
    this.id = id;
    this.criadoEm = new Date();
    this.atualizadoEm = new Date();
  }

  protected atualizarData(): void {
    this.atualizadoEm = new Date();
  }
}

// =========================
// Classe Tarefa
// =========================

class Tarefa
  extends EntidadeBase
  implements Persistivel, Exportavel
{
  constructor(
    id: string,
    public titulo: string,
    public descricao: string,
    private status: TarefaStatus,
    private prioridade: number,
    public responsavel: string
  ) {
    super(id);

    if (prioridade < 1 || prioridade > 5) {
      throw new Error("Prioridade deve estar entre 1 e 5.");
    }
  }

  getStatus(): TarefaStatus {
    return this.status;
  }

  getPrioridade(): number {
    return this.prioridade;
  }

  iniciar(): void {
    if (this.status !== "pendente") {
      throw new Error("Somente tarefas pendentes podem ser iniciadas.");
    }

    this.status = "em_progresso";
    this.atualizarData();
  }

  concluir(): void {
    if (this.status !== "em_progresso") {
      throw new Error(
        "Somente tarefas em progresso podem ser concluídas."
      );
    }

    this.status = "concluida";
    this.atualizarData();
  }

  cancelar(): void {
    if (this.status === "concluida") {
      throw new Error(
        "Uma tarefa concluída não pode ser cancelada."
      );
    }

    this.status = "cancelada";
    this.atualizarData();
  }

  atualizarPrioridade(novaPrioridade: number): void {
    if (novaPrioridade < 1 || novaPrioridade > 5) {
      throw new Error("Prioridade inválida.");
    }

    this.prioridade = novaPrioridade;
    this.atualizarData();
  }

  salvar(): void {
    console.log(`Tarefa "${this.titulo}" salva.`);
  }

  deletar(): void {
    console.log(`Tarefa "${this.titulo}" deletada.`);
  }

  exportarJSON(): string {
    return JSON.stringify(
      {
        id: this.id,
        titulo: this.titulo,
        descricao: this.descricao,
        status: this.status,
        prioridade: this.prioridade,
        responsavel: this.responsavel,
        criadoEm: this.criadoEm,
      },
      null,
      2
    );
  }
}

// =========================
// Repositório Genérico
// =========================

class Repositorio<T extends { id: string }> {
  private itens = new Map<string, T>();

  adicionar(item: T): void {
    this.itens.set(item.id, item);
  }

  buscarPorId(id: string): T | undefined {
    return this.itens.get(id);
  }

  listarTodos(): T[] {
    return [...this.itens.values()];
  }

  remover(id: string): boolean {
    return this.itens.delete(id);
  }

  filtrarPor<K extends keyof T>(
    campo: K,
    valor: T[K]
  ): T[] {
    return this.listarTodos().filter(
      (item) => item[campo] === valor
    );
  }
}

// =========================
// Demonstração
// =========================

const repositorio = new Repositorio<Tarefa>();

const t1 = new Tarefa(
  "1",
  "Estudar TypeScript",
  "Finalizar módulo",
  "pendente",
  5,
  "Sebastião"
);

const t2 = new Tarefa(
  "2",
  "Criar API",
  "Implementar NestJS",
  "pendente",
  4,
  "Maria"
);

const t3 = new Tarefa(
  "3",
  "Deploy",
  "Publicar aplicação",
  "pendente",
  3,
  "João"
);

const t4 = new Tarefa(
  "4",
  "Documentação",
  "Escrever README",
  "pendente",
  2,
  "Ana"
);

// Alterando estados

t1.iniciar();
t1.concluir();

t2.iniciar();

t3.cancelar();

// Adicionando ao repositório

repositorio.adicionar(t1);
repositorio.adicionar(t2);
repositorio.adicionar(t3);
repositorio.adicionar(t4);

// Filtrar por status

const emProgresso = repositorio.filtrarPor(
  "status" as keyof Tarefa,
  "em_progresso" as any
);

console.log("Em progresso:");
console.log(emProgresso);

// Exportar todas

console.log("\nExportando JSON:");

repositorio.listarTodos().forEach((t) => {
  console.log(t.exportarJSON());
});

// Remover uma

repositorio.remover("3");

// Listar restantes

console.log("\nRestantes:");

console.log(repositorio.listarTodos());