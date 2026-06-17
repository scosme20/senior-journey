type WorkModel = 'clt' | 'pj';

interface TaxBracket {
    readonly limit:   number;
    readonly aliquot: number;
}

const CLT_TAX_BRACKETS: TaxBracket[] = [
    { limit: 1903, aliquot: 0     },
    { limit: 2826, aliquot: 0.075 },
    { limit: 3751, aliquot: 0.15  },
    { limit: 4600, aliquot: 0.225 },
];

const PJ_ALIQUOT       = 0.20;
const MAX_CLT_ALIQUOT  = 0.275;

function getCltAliquot(salary: number): number {
    const bracket = CLT_TAX_BRACKETS.find(b => salary <= b.limit);
    return bracket?.aliquot ?? MAX_CLT_ALIQUOT;
}

function calcularImposto(salary: number, modelo: WorkModel): number {
    if (salary <= 0) throw new Error('Salário deve ser positivo.');

    const aliquot = modelo === 'pj'
        ? PJ_ALIQUOT
        : getCltAliquot(salary);

    return salary * aliquot;
}

// Testes
console.log(calcularImposto(1500,  'clt')); // 0
console.log(calcularImposto(2500,  'clt')); // 187.5
console.log(calcularImposto(5000,  'clt')); // 1375
console.log(calcularImposto(5000,  'pj'));  // 1000