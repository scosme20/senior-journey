type TrafficLightState =
    | 'Green'
    | 'Yellow'
    | 'Red'
    | 'Flashing';

    interface TrafficLight {

    // Identificador único.
    // readonly impede reatribuições após a criação.
    readonly id: string;

    // Estado atual do semáforo.
    state: TrafficLightState;

    // Quantos segundos faltam para a troca.
    remainingSeconds: number;
}

const stateMessages: Record<
    TrafficLightState,
    string
> = {

    Green: 'Siga',

    Yellow: 'Atenção',

    Red: 'Pare',

    Flashing: 'Modo piscante'
};

const mainStreetLight: TrafficLight = {

    id: 'TL-001',

    state: 'Green',

    remainingSeconds: 30
};

// Retorna void porque apenas imprime informações.

function displayTrafficLight(
    trafficLight: TrafficLight
): void {

    const currentMessage =
        stateMessages[trafficLight.state];

    // Exibe a mensagem juntamente com o tempo restante.

    console.log(
        `${currentMessage} - ${trafficLight.remainingSeconds}s`
    );
}


displayTrafficLight(mainStreetLight);