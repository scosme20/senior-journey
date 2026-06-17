type GymPlan =
    | 'Musculação'
    | 'Crossfit'
    | 'Funcional'
    | 'Premium';

//modelagem de type mais próximo do domínio
//o tipo representa um usuário de academia, não apenas "dados".

interface GymUser {
    readonly startDate: Date;
    name: string;
    age: number;
    weight: number;
    plan: GymPlan;
    isActive: boolean;
}
//Restrição de valores da interface

const maria: GymUser = {
    startDate: new Date('2024-03-15'),
    name: 'Maria',
    age: 28,
    weight: 68.5,
    plan: 'Musculação',
    isActive: true,
};
//interfaces são facilmente extensíveis.

function formatGymUser(user: GymUser): string {
    return [
        `Nome: ${user.name}`,
        `Início: ${user.startDate.toLocaleDateString('pt-BR')}`,
        `Idade: ${user.age} anos`,
        `Peso: ${user.weight} kg`,
        `Plano: ${user.plan}`,
        `Ativo: ${user.isActive ? 'Sim' : 'Não'}`
    ].join('\n');
}

console.log(formatGymUser(maria));