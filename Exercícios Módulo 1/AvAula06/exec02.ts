abstract class Notificacao {
  protected destinatario: string;
  protected assunto: string;
  protected readonly criadoEm: Date;

  constructor(destinatario: string, assunto: string) {
    this.destinatario = destinatario;
    this.assunto = assunto;

    // Todas as notificações recebem automaticamente um timestamp de criação
    this.criadoEm = new Date();
  }

  // Contrato obrigatório para qualquer canal de notificação
  abstract enviar(): string;
}

class EmailNotificacao extends Notificacao {
  private corpoHtml: string;

  constructor(
    destinatario: string,
    assunto: string,
    corpoHtml: string
  ) {
    super(destinatario, assunto);
    this.corpoHtml = corpoHtml;
  }

  enviar(): string {
    return `
      E-mail enviado para ${this.destinatario}
      Assunto: ${this.assunto}
      Conteúdo HTML: ${this.corpoHtml}
      Data: ${this.criadoEm.toISOString()}
    `;
  }
}

class SMSNotificacao extends Notificacao {
  private mensagem: string;

  constructor(
    destinatario: string,
    assunto: string,
    mensagem: string
  ) {
    super(destinatario, assunto);

    // Regra de negócio do canal SMS
    if (mensagem.length > 160) {
      throw new Error(
        "SMS não pode ultrapassar 160 caracteres."
      );
    }

    this.mensagem = mensagem;
  }

  enviar(): string {
    return `
      SMS enviado para ${this.destinatario}
      Assunto: ${this.assunto}
      Mensagem: ${this.mensagem}
      Data: ${this.criadoEm.toISOString()}
    `;
  }
}

class PushNotificacao extends Notificacao {
  private titulo: string;
  private acao: string;

  constructor(
    destinatario: string,
    assunto: string,
    titulo: string,
    acao: string
  ) {
    super(destinatario, assunto);

    // Limitação comum de provedores de push notification
    if (titulo.length > 50) {
      throw new Error(
        "Título da notificação push não pode exceder 50 caracteres."
      );
    }

    this.titulo = titulo;
    this.acao = acao;
  }

  enviar(): string {
    return `
      Push enviado para ${this.destinatario}
      Título: ${this.titulo}
      Assunto: ${this.assunto}
      Ação: ${this.acao}
      Data: ${this.criadoEm.toISOString()}
    `;
  }
}

class NotificacaoService {
  enviarTodas(notificacoes: Notificacao[]): string[] {
    // O serviço depende apenas da abstração Notificacao.
    // Novos canais podem ser adicionados sem alterar esta classe.
    return notificacoes.map((notificacao) => notificacao.enviar());
  }
}

// ------------------------
// Uso
// ------------------------

const notificacoes: Notificacao[] = [
  new EmailNotificacao(
    "usuario@email.com",
    "Bem-vindo",
    "<h1>Olá!</h1><p>Seu cadastro foi realizado.</p>"
  ),

  new SMSNotificacao(
    "+5511999999999",
    "Código de acesso",
    "Seu código é 123456"
  ),

  new PushNotificacao(
    "user-123",
    "Promoção",
    "Oferta Imperdível",
    "ABRIR_APP"
  ),
];

const service = new NotificacaoService();

service
  .enviarTodas(notificacoes)
  .forEach((resultado) => console.log(resultado));