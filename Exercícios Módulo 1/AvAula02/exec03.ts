// DECISÃO 1: constantes para regras de negócio
// Os valores 8 e 16 são regras de negócio — podem mudar.
// Com constante nomeada, a mudança é em um lugar e a intenção fica clara.
const SENHA_MINIMO_CARACTERES  = 8;
const SENHA_MAXIMO_CARACTERES  = 16;

// DECISÃO 2: tipo de retorno rico
// boolean não diz o suficiente para quem chama.
// Com erros: string[] o chamador sabe exatamente o que está errado.
// valida: boolean permite checagem rápida sem percorrer o array.
type ResultadoValidacao = {
    readonly valida: boolean;
    readonly erros: string[];
};

// DECISÃO 3: cada regra é uma função com nome que descreve a intenção
// Em vez de comentários explicando o que a regex faz,
// o nome da função já comunica: temLetraMaiuscula, temNumero, etc.
// Se a regex mudar, muda em um lugar só.
// Cada função pode ser testada isoladamente.
function temTamanhoMinimo(senha: string): boolean {
    return senha.length >= SENHA_MINIMO_CARACTERES;
}

function respeitaTamanhoMaximo(senha: string): boolean {
    return senha.length <= SENHA_MAXIMO_CARACTERES;
}

function temLetraMaiuscula(senha: string): boolean {
    return /[A-Z]/.test(senha);
}

function temLetraMinuscula(senha: string): boolean {
    return /[a-z]/.test(senha);
}

function temNumero(senha: string): boolean {
    return /\d/.test(senha);
}

function temCaractereEspecial(senha: string): boolean {
    return /[!@#$%^&*(),.?":{}|<>]/.test(senha);
}

// DECISÃO 4: tabela de regras — data-driven validation
// Em vez de uma sequência de ifs, definimos as regras como dados.
// Cada regra é: { validar: função, mensagem: string }.
// Para adicionar uma regra nova: adicionar uma linha na tabela.
// Para remover: remover a linha. A função validatePassword não muda.
// Isso é o mesmo padrão table-driven do exercício do imposto.
type RegraValidacao = {
    readonly validar: (senha: string) => boolean;
    readonly mensagem: string;
};

const REGRAS_SENHA: RegraValidacao[] = [
    { validar: temTamanhoMinimo,     mensagem: `Mínimo ${SENHA_MINIMO_CARACTERES} caracteres.` },
    { validar: respeitaTamanhoMaximo,mensagem: `Máximo ${SENHA_MAXIMO_CARACTERES} caracteres.` },
    { validar: temLetraMaiuscula,    mensagem: 'Deve conter letra maiúscula.' },
    { validar: temLetraMinuscula,    mensagem: 'Deve conter letra minúscula.' },
    { validar: temNumero,            mensagem: 'Deve conter número.' },
    { validar: temCaractereEspecial, mensagem: 'Deve conter caractere especial (!@#$%^&*).' },
];

// DECISÃO 5: função principal usa reduce para coletar erros
// Percorre as regras e coleta as mensagens das que falharam.
// filter + map em vez de forEach com push — imutabilidade.
// erros.length === 0 determina validade — não precisa de lógica extra.
function validarSenha(senha: string): ResultadoValidacao {
    const erros = REGRAS_SENHA
        .filter(regra => !regra.validar(senha))
        .map(regra => regra.mensagem);

    return {
        valida: erros.length === 0,
        erros,
    };
}

// DECISÃO 6: formatação separada do resultado
// A função de validação retorna dados estruturados.
// A formatação é responsabilidade de outra função.
function formatarResultado(senha: string, resultado: ResultadoValidacao): string {
    const status = resultado.valida ? '✓ Senha válida' : '✗ Senha inválida';
    const detalhes = resultado.valida
        ? ''
        : '\nProblemas:\n' + resultado.erros.map(e => `  • ${e}`).join('\n');
    return `[${status}]${detalhes}`;
}

// Testes — os 4 cenários que devemos cobrir
const senhas = [
    'Senha123!',        // válida
    'abc',              // muito curta, sem maiúscula, número, especial
    'SenhaForte',       // sem número e sem especial
    'SenhaComMuitosCaracteres123!', // acima de 16
];

for (const senha of senhas) {
    const resultado = validarSenha(senha);
    console.log(`"${senha}":`);
    console.log(formatarResultado(senha, resultado));
    console.log('---');
}