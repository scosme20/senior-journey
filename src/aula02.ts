type UserStatus = 'active' | 'inactive' | 'pending';

function validateName(name: string): boolean {
    return name.trim().length >= 2;
}

function validateAge(age: number): boolean {
    return age >= 18 && age <= 120;
}

function validateEmail(email: string): boolean {
    return email.includes('@') && email.includes('.');
}

function formatUserInfo(
    name: string,
    age: number,
    email: string,
    status: UserStatus
): string {
    return `Usuário ${name} | Idade: ${age} | Email: ${email} | Status: ${status}`;
}

function processUser(
    name: string,
    age: number,
    email: string,
    status: UserStatus
): void {
    if (!validateName(name)) {
        console.log('Nome inválido. Mínimo 2 caracteres.');
        return;
    }
    if (!validateAge(age)) {
        console.log('Idade inválida. Deve estar entre 18 e 120 anos.');
        return;
    }
    if (!validateEmail(email)) {
        console.log('Email inválido. Deve conter "@" e ".".');
        return;
    }

    console.log(formatUserInfo(name, age, email, status));
}

processUser('Carlos', 30, 'carlos@example.com', 'active');

//////////////