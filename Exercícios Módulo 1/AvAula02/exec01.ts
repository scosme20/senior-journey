// DECISÃO 1: Union Type para status
// Valores fixos e conhecidos = Union Type, nunca string genérica.
// Se aparecer um status novo, o compilador avisa em todo lugar que usa.
type UserStatus = 'active' | 'inactive' | 'pending';

// DECISÃO 2: interface em vez de type para entidade
// Interface é mais descritiva para objetos que representam entidades do domínio.
// type é melhor para unions e aliases simples.
interface User {
    readonly id: string;        // id nunca muda — readonly protege
    readonly dateOfBirth: Date; // data de nascimento nunca muda — readonly protege
    name: string;               // nome pode ser atualizado
    age: number;                // idade muda com o tempo
    status: UserStatus;         // status muda durante o ciclo de vida
}

// DECISÃO 3: funções recebem só o que precisam
// validateName(user) recebe o objeto inteiro mas usa só user.name.
// Isso acopla a função à estrutura User — se User mudar, a função quebra.
// Receber só o campo necessário torna a função pura e reutilizável em qualquer contexto.
function validateName(name: string): boolean {
    return name.trim().length >= 2;
}

function validateAge(age: number): boolean {
    return age >= 18;
}

// DECISÃO 4: verificação de status retorna boolean, não string
// A função de validação só deve responder: isso é válido ou não?
// A mensagem de erro é responsabilidade de quem chama — não do validador.
// Isso permite reutilizar o validador em contextos diferentes
// (API que retorna JSON, CLI que imprime texto, UI que mostra tooltip).
function isActiveStatus(status: UserStatus): boolean {
    return status === 'active';
}

// DECISÃO 5: tipo de retorno rico — erros + validade
// Em vez de retornar string[] com mensagens misturadas de sucesso e erro,
// retornamos um objeto estruturado que separa o resultado booleano dos erros.
// Quem chama pode verificar 'valido' sem parsear strings.
type ValidationResult = {
    valido: boolean;
    erros: string[];
};

// DECISÃO 6: função orquestradora centraliza as mensagens
// As funções de validação retornam boolean — simples e reutilizáveis.
// Esta função é a única responsável por montar as mensagens de erro.
// Se a mensagem mudar, muda em um lugar só.
function validateUser(user: User): ValidationResult {
    const erros: string[] = [];

    if (!validateName(user.name)) {
        erros.push('Nome deve ter pelo menos 2 caracteres.');
    }
    if (!validateAge(user.age)) {
        erros.push('Usuário deve ter pelo menos 18 anos.');
    }
    if (!isActiveStatus(user.status)) {
        erros.push(`Usuário está ${user.status} — acesso negado.`);
    }

    return {
        valido: erros.length === 0,
        erros,
    };
}

// DECISÃO 7: função de exibição retorna string
// displayUserValidationResults retornava void com console.log interno.
// Retornar string dá flexibilidade: quem chama decide se imprime,
// salva em log, envia por email ou exibe em tela.
function formatValidationResult(user: User, result: ValidationResult): string {
    const status = result.valido ? 'APROVADO' : 'REPROVADO';
    const detalhes = result.erros.length > 0
        ? result.erros.map(e => `  • ${e}`).join('\n')
        : '  • Todas as validações passaram.';

    return [
        `=== Validação: ${user.name} ===`,
        `Status: ${status}`,
        `Detalhes:`,
        detalhes,
    ].join('\n');
}

// Uso
const user: User = {
    id: 'U12345',
    dateOfBirth: new Date('1999-01-15'),
    name: 'Alice',
    age: 25,
    status: 'active',
};

const resultado = validateUser(user);
console.log(formatValidationResult(user, resultado));

// Cenário 2 — menor de idade
const userMenor: User = {
    id: 'U99999',
    dateOfBirth: new Date('2010-05-20'),
    name: 'Jo',
    age: 14,
    status: 'pending',
};

console.log(formatValidationResult(userMenor, validateUser(userMenor)));