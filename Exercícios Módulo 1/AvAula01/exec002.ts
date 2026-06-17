type appLanguage = 'pt-BR' | 'en-US' | 'es-ES';

type appNotification = 'yes' | 'no' | ' some ';

type appTheme = 'light' | 'dark';

type appConfig = {
    appName: string;
    appVersion: string;
    supportedLanguages: appLanguage[];
    defaultLanguage: appLanguage;
    maxUsers: number;
    notifications: appNotification;
    theme: appTheme;
}

const appConfig: appConfig = {
    appName: 'MyApp',
    appVersion: '1.0.0',
    supportedLanguages: ['pt-BR', 'en-US', 'es-ES'],
    defaultLanguage: 'pt-BR',
    maxUsers: 100,
    notifications: 'yes',
    theme: 'light'
};

function displayAppInfo(config: appConfig): void {
    console.log(`App Name: ${config.appName} | Version: ${config.appVersion}
Supported Languages: ${config.supportedLanguages.join(', ')} |
Default Language: ${config.defaultLanguage} | Max Users: ${config.maxUsers}
Notifications: ${config.notifications} | Theme: ${config.theme}`);
}

displayAppInfo(appConfig);

/*
Foi criado um tipo appConfig para representar as configurações de um aplicativo, 
incluindo nome, versão, idiomas suportados, idioma padrão, número máximo de usuários, 
notificações e tema. Em seguida, foi criado um objeto appConfig com as configurações específicas do aplicativo 
e uma função displayAppInfo para exibir essas informações de forma legível.
*/