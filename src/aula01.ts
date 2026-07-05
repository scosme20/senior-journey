type UserN = {
    readonly userDateOfBirth: Date; 
    userName: string;
    userAge: number;
    userEmail: string;
    isActive: boolean;
    userSalary: number;
    userRole: string;
};

const usern: UserN = {
    userName: 'Carlos',
    userAge: 31,
    userEmail: 'carlos@gmail.com',
    isActive: true,
    userDateOfBirth: new Date('1993-01-15'),
    userSalary: 4500.00,
    userRole: 'admin',
};

function exibirDadosDoUsuario(user: UserN): void {
    console.log(
        `${user.userName} tem ${user.userAge} anos. ` +
        `Email: ${user.userEmail} | ` +
        `Salário: R$ ${user.userSalary} | ` +
        `Cargo: ${user.userRole}`
    );
}

exibirDadosDoUsuario(usern);

////////