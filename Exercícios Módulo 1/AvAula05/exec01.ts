// =====================================================
// CLASSE CONTA CORRENTE
// =====================================================

class ContaCorrente {
    private saldo: number;
    private historico: string[];

    constructor(
        public readonly titular: string,
        saldoInicial: number = 0
    ) {
        // -----------------------------
        // Validações do construtor
        // -----------------------------
        if (!titular.trim()) {
            throw new Error("Titular não pode ser vazio.");
        }

        if (saldoInicial < 0) {
            throw new Error("Saldo inicial não pode ser negativo.");
        }

        this.saldo = saldoInicial;
        this.historico = [
            `Conta criada com saldo inicial de R$ ${saldoInicial.toFixed(2)}`
        ];
    }

    // =====================================================
    // GETTERS
    // =====================================================

    getSaldo(): number {
        return this.saldo;
    }

    getHistorico(): string[] {
        return [...this.historico];
    }

    // =====================================================
    // DEPÓSITO
    // =====================================================

    depositar(valor: number): void {
        if (valor <= 0) {
            throw new Error("O valor do depósito deve ser maior que zero.");
        }

        this.saldo += valor;

        this.historico.push(
            `Depósito de R$ ${valor.toFixed(2)}`
        );
    }

    // =====================================================
    // SAQUE
    // =====================================================

    sacar(valor: number): void {
        if (valor <= 0) {
            throw new Error("O valor do saque deve ser maior que zero.");
        }

        if (valor > this.saldo) {
            throw new Error("Saldo insuficiente.");
        }

        this.saldo -= valor;

        this.historico.push(
            `Saque de R$ ${valor.toFixed(2)}`
        );
    }

    // =====================================================
    // TRANSFERÊNCIA
    // =====================================================

    transferir(
        destino: ContaCorrente,
        valor: number
    ): void {
        if (valor <= 0) {
            throw new Error("O valor da transferência deve ser maior que zero.");
        }

        if (destino === this) {
            throw new Error("Não é possível transferir para a própria conta.");
        }

        if (valor > this.saldo) {
            throw new Error("Saldo insuficiente para transferência.");
        }

        this.saldo -= valor;
        destino.saldo += valor;

        this.historico.push(
            `Transferência enviada para ${destino.titular}: R$ ${valor.toFixed(2)}`
        );

        destino.historico.push(
            `Transferência recebida de ${this.titular}: R$ ${valor.toFixed(2)}`
        );
    }

    // =====================================================
    // EXTRATO
    // =====================================================

    extrato(): void {
        console.log(`\n===== EXTRATO DE ${this.titular} =====`);

        this.historico.forEach(item => {
            console.log(item);
        });

        console.log(
            `Saldo atual: R$ ${this.saldo.toFixed(2)}`
        );
    }
}

const joao = new ContaCorrente("João", 1000);

joao.depositar(500);
joao.sacar(200);

joao.extrato();


const carlos = new ContaCorrente("Carlos", 100);

try {
    carlos.sacar(500);
} catch (error) {
    console.error(
        (error as Error).message
    );
}