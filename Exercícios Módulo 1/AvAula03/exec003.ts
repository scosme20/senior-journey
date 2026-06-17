type CreditStatus = 
    | 'Aprovado' 
    | 'Análise' 
    | 'Reprovado'

type ExistingDebt = 
    | 'Baixa' 
    | 'Média' 
    | 'Alta' 
    | 'Nenhuma'

type ScoreCredit = 
    | '200' 
    | '600' 
    | '1000'

type MonthlyIncomeRange =
    | 'Até 2000'
    | '2000-5000'
    | '5000-10000'
    | '10000+';


//interface para armazenar e organizar objetos e type anotations
interface CreditAnalysis {
    monthlyIncome: MonthlyIncomeRange;
    score: ScoreCredit;
    debt: ExistingDebt;
    timeSpent: string;
}

//função para verificar score de crédito
function scoreVerification(score : ScoreCredit) : string {
    switch(score){
        case '200':
            return 'Score muito baixo';
        break

        case '600':
            return 'Score bom'
        break

        case '1000':
            return 'Score excelente'
            break
        
        default :
             return 'Score inválido'
        break
    }
}


//função para verificar ganhos mensais
function monthlyVerification(monthlyIncome : MonthlyIncomeRange): string {
    switch(monthlyIncome) {
        case 'Até 2000':
            return 'Plano básico'
        
        case '2000-5000':
            return 'Plano médio'
        
        case '5000-10000':
            return 'Plano bom'
        
        case '10000+':
            return 'Plano excelente'
        
        default :
            return 'Plano inválido'
    }
}

//função para verificar dividas
function debutVerification(debut : ExistingDebt) : string {
    switch(debut) {
        case 'Alta':
            return 'Alta taxa de indisponibilidade'
        
        case 'Média':
            return 'Indisponibilidade'
        
        case 'Baixa':
            return 'Disponivel'
        
        case 'Nenhuma':
            return 'Altamente disponível'
        
        default:
            return 'Inválido'
    }
}

//função para fazer a verificação de varias etapas (podiam ter mais opçoes e situaçoes, no entanto apenas essas vãp ficar por agora)
function allVerificationOfCredit(client : CreditAnalysis) : CreditStatus {

    if(client.debt === 'Alta' || client.score === '200') {
        return 'Reprovado'
    }

    if(client.debt === 'Média' || client.score === '600') {
        return 'Análise'
    }

    if(client.debt === 'Baixa' || client.score === '1000') {
        return 'Aprovado'
    }

    return 'Análise'
}

//função para mostrar o resultado formatado
function showResultCredit(client : CreditAnalysis) : string {
    
    const score = scoreVerification(client.score);
    const income = monthlyVerification(client.monthlyIncome);
    const debt = debutVerification(client.debt);
    const status = allVerificationOfCredit(client);

    return `
===== ANÁLISE DE CRÉDITO =====

Score: ${score}
Renda: ${income}
Dívida: ${debt}
Tempo de relacionamento: ${client.timeSpent}

Status Final: ${status}
`;
}


//exemplo

const client: CreditAnalysis = {
    monthlyIncome: '10000+',
    score: '1000',
    debt: 'Nenhuma',
    timeSpent: '5 anos'
};

//chamando a função para executar o teste
console.log(showResultCredit(client));



