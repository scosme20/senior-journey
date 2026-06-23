/**
 * Classe base para todos os veículos.
 */
abstract class Veiculo {
    constructor(
        public readonly placa: string,
        public modelo: string,
        public anoFabricacao: number,
        public precoPorDia: number
    ) {}

    /**
     * Cada tipo de veículo possui
     * uma regra própria de multa.
     */
    abstract calcularMulta(
        diasAtraso: number
    ): number;

    /**
     * Método compartilhado por todos os veículos.
     */
    exibirInfo(): string {
        return `
Placa: ${this.placa}
Modelo: ${this.modelo}
Ano: ${this.anoFabricacao}
Preço por dia: R$ ${this.precoPorDia}
        `;
    }
}

class Carro extends Veiculo {

    calcularMulta(
        diasAtraso: number
    ): number {
        return (
            this.precoPorDia *
            diasAtraso *
            1.5
        );
    }

}

class Moto extends Veiculo {

    calcularMulta(
        diasAtraso: number
    ): number {
        return (
            this.precoPorDia *
            diasAtraso *
            1.2
        );
    }

}

class Caminhao extends Veiculo {

    calcularMulta(
        diasAtraso: number
    ): number {
        return (
            this.precoPorDia *
            diasAtraso *
            2.0
        );
    }

}

const carro = new Carro(
    "ABC-1234",
    "Corolla",
    2022,
    200
);

const moto = new Moto(
    "XYZ-5678",
    "CG 160",
    2023,
    100
);

const caminhao = new Caminhao(
    "TRK-9999",
    "FH 540",
    2021,
    500
);

const veiculos: Veiculo[] = [
    carro,
    moto,
    caminhao
];

for (const veiculo of veiculos) {

    console.log(
        veiculo.exibirInfo()
    );

    console.log(
        "Multa por 3 dias:",
        veiculo.calcularMulta(3)
    );

    console.log("----------------");
}