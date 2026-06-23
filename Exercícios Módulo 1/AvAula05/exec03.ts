class Relogio {
    private totalSegundos: number;

    constructor(
        horas: number = 0,
        minutos: number = 0,
        segundos: number = 0
    ) {
        this.totalSegundos =
            horas * 3600 +
            minutos * 60 +
            segundos;

        this.normalizar();
    }

    /**
     * Garante que o relógio permaneça
     * dentro do intervalo 00:00:00 -> 23:59:59
     */
    private normalizar(): void {
        const segundosDia = 24 * 60 * 60;

        this.totalSegundos =
            ((this.totalSegundos % segundosDia) + segundosDia) %
            segundosDia;
    }

    /**
     * Avança o relógio em N segundos.
     */
    avancar(segundos: number): void {
        this.totalSegundos += segundos;
        this.normalizar();
    }

    /**
     * Retrocede o relógio em N segundos.
     */
    retroceder(segundos: number): void {
        this.totalSegundos -= segundos;
        this.normalizar();
    }

    /**
     * Reseta para meia-noite.
     */
    resetar(): void {
        this.totalSegundos = 0;
    }

    /**
     * Retorna HH:MM:SS.
     */
    formatar(): string {
        const horas = Math.floor(
            this.totalSegundos / 3600
        );

        const minutos = Math.floor(
            (this.totalSegundos % 3600) / 60
        );

        const segundos =
            this.totalSegundos % 60;

        return `${String(horas).padStart(2, "0")}:${String(
            minutos
        ).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
    }
}

