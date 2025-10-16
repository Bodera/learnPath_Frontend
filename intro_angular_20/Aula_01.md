# Instalações necessárias 

Utilize [NVM](https://github.com/coreybutler/nvm-windows/releases/tag/1.2.2). E confira a compatibilidade da versão do Node.js com a versão do Angular.

```bash
node --version
v22.20.0
npm --version
10.9.3

npm install -g @angular/cli
ng version

     _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/



Angular CLI: 20.3.6
Node: 22.20.0
Package Manager: npm 10.9.3
OS: win32 x64


Angular: <error>

Package                      Version
------------------------------------
@angular-devkit/architect    0.2003.6 (cli-only)
@angular-devkit/core         20.3.6 (cli-only)
@angular-devkit/schematics   20.3.6 (cli-only)
@schematics/angular          20.3.6 (cli-only)
```

Agora instalar os programas do backend e frontend.

```bash
cd backend-gestao-marketplace
npm install
cd ../frontend-gestao-marketplace
npm install
```

Confira se tudo funciona usando `npm run dev` para o **backend** e `ng serve` para o **frontend**.

Importe [esse arquivo](./backend-gestao-marketplace/insomnia-backend.yaml) no seu projeto Insomnia. Feito isso você vai conseguir visualizar uma nova collection chamada `Backend Gestão Marketplace Rocketseat`, nela os endpoints se encontram distribuídos em 4 pastas:

- Products (post, put, get)
- Base (get, get)
- Api (get)
- User (get, post, post)

Os usuários e os produtos terão seus dados persistidos em arquivos **json** dentro do projeto de **backend**.

## Boas práticas sendo adotadas

1. Os endpoints `api/protected` e `api/users/profile` usam Bearer tokens, bem legal para preservar dados de sessão.
2. As senhas dos usuários são salvas com criptografia.
3. A api possui endpoints de health check, que são endpoints que indicam se ocorreu algum problema na aplicação.
4. No frontend, tudo que for uma rota do nosso marketplace será salvo no diretório `app/pages`, e o que for apenas um componente ficará na pasta `app/components`.
