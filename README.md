<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Apresentação
Esta é uma aplicação em [Nestjs](https://docs.nestjs.com/) criada para um teste técnico no qual me foi designada a criação de um **CRUD** simples, mas fui além. Decidi expor minhas habilidades construindo uma aplicação simples, mas bastante robusta, tirando proveito de muitas funcionalidades e arquiteturas possíveis que o [Nestjs](https://docs.nestjs.com/) tem a oferecer. O intuito desta aplicação é demonstrar os meus conhecimentos e comprometimento com a qualidade e manutenabilidade do código, ofecerendo uma aplicação escalável, documentada e com bons padrões de código.

# Setup da aplicação
Neste guia, vou mostrar o passo a passo para configurar e executar corretamente a aplicação, trazendo configurações essenciais e explicações sobre como funcionam algumas funcionalidades e acessos.

## Variáveis de ambiente
Para começarmos, precisamos configurar as variáveis de ambiente que serão utilizadas por nossa aplicação. Para isso crie um arquivo [.env](.env) na raíz do projeto e copie o seguinte conteúdo:
```bash
################################################################################
# API
################################################################################

API_PROTOCOL="http"
API_ADDRESS="localhost"
API_PORT="3000"

################################################################################
# Security & tokens
################################################################################

JWT_SECRET="kG7I5hWz/KHWypz+PdsdXFpZB2AdML1Xpu3BptFCrTc="
JWT_EXPIRATION_TIME="1d"

JWT_REFRESH_SECRET="Z4wY1BrN4xNb6hOKTUzmXfnGiYlKE+bgBu22/+Jf2rE="
JWT_REFRESH_EXPIRATION_TIME="7d"

################################################################################
# Swagger Documentation
################################################################################

DOCS_ENABLED="1"
DOCS_OPERATOR="inovatech"
DOCS_PASSWORD="inova2026"

################################################################################
# Database
################################################################################

DATABASE_URL="postgresql://inovatech:inovatech@localhost:5632/inovaapi_db"
```
### Primeiramente, o que é cada coisa?

#### Configurações da API
```bash
API_PROTOCOL="http"
API_ADDRESS="localhost"
API_PORT="3000"
```
- `API_PROTOCOL` [**http**/**https**]: Protocolo que a API irá receber requisições. Em ambiente de desenvolvimento, geralmente utilizamos **http**, mas em alguns casos podemos utilizar também **https** se estivermos utilizando por exemplo *tunnels* como **ngrok** ou **cloudflared** (esse é sensacional).

- `API_ADDRESS` Domínio da aplicação. Em desenvolvimento podemos utilizar **localhost**, mas isso também se aplica quando estamos em ambiente de produção, onde teremos que utilizar o domínio reservado para a aplicação, por exemplo: [api.inovatech.com](api.inovatech.com). Lembrando, que essa configuração é apenas do domínio, não da URL, falaremos disso adiante...

- `API_PORT` Como o próprio nome já diz, é a porta onde a aplicação vai estar rodando. Em ambiente de desenvolvimento (sem docker), podemos utilizar o padrão `3000`. Mas pode ficar à vontade para escolher a porta da sua escolha.

Agora voltando ao assunto da configuração de domínio e URL, essas 3 variáveis de ambiente juntas compõem uma propriedade em [ConfigService](src/config/config.service.ts#L93), onde é gerado o **API_URL**, e aqui sim, é a url completa. Essa **API_URL** é utilizada no **Swagger** (*/docs*) para indicar para onde o front deve efetuar as requisições.

#### Configurações de secrets e segurança
```bash
JWT_SECRET="kG7I5hWz/KHWypz+PdsdXFpZB2AdML1Xpu3BptFCrTc="
JWT_EXPIRATION_TIME="1d"

JWT_REFRESH_SECRET="Z4wY1BrN4xNb6hOKTUzmXfnGiYlKE+bgBu22/+Jf2rE="
JWT_REFRESH_EXPIRATION_TIME="7d"
```
- `JWT_SECRET` Chave secreta para gerar o token JWT que será utilizado pelo **Access Token**, ou seja, o token *Bearer* que o usuário utiliza para realizar requisições em nossa API.

- `JWT_REFRESH_TOKEN` Chave secreta para gerar também um token JWT, porém este será utilizado para gerar o **Refresh Token**, que é o token utilizado pelo usuário para solicitar um novo **Access Token**.

- `JWT_EXPIRATION_TIME` [**1h**/**1d**/**1w**,...] Em quanto tempo o **Access Token** irá expirar após a sua criação. Aqui utilizamos a sintaxe de duração (*String Value*) da biblioteca [ms](https://github.com/vercel/ms/tree/main), criada pela Vercel.

- `JWT_REFRESH_EXPIRATION_TIME` Mesma sintaxe de cima, porém para o **Refresh Token**, onde geralmente ele possui uma duração maior que o **Access Token**.

#### Configurações do Swagger
```bash
DOCS_ENABLED="1"
DOCS_OPERATOR="inovatech"
DOCS_PASSWORD="inova2026"
```
- `DOCS_ENABLED`[**1**/**0**/**true**/**false**] Indica se a documentação estará habilitada ou não. Se estiver, o endpoint */docs* se torna disponível. **1** e **true** habilitam a documentação, **0** e **false** desabilitam.

- `DOCS_OPERATOR` Funciona como um **username** para ter acesso à documentação.

- `DOCS_PASSWORD` Senha de acesso à documentação. Em combinação com a variável `DOCS_OPERATOR`, juntos formam um login **BasicAuth**, onde ao carregar o endpoint */docs* surge um prompt do próprio navegador solicitando inserir as credenciais de acesso.

#### Configuração do banco de dados
```bash
DATABASE_URL="postgresql://inovatech:inovatech@localhost:5632/inovaapi_db"
```
- `DATABASE_URL` String de conexão com o banco de dados. Tudo já está configurado plug & play, então, ao executar o banco de dados no **Docker** tudo funcionará perfeitamente (pelo menos deve, na minha máquina funciona kkk).

`OBS: As strings de conexão rodando a aplicação localhost (sem Docker) e dentro do Docker são diferentes. Onde no Docker é necessário apontar para o respectivo container. O mesmo acontece para a porta da aplicação. Onde geralmente rodando local, utilizamos a 3000 e rodando no Docker, utilizamos 80 ou 443.`

# Rodando a aplicação
Finalmente, após uma longa jornada de explicações vamos poder iniciar a aplicação com segurança. Para isso, o primeiro passo é instalar as dependências e, deste modo, basta executar o seguinte comando:
```bash
$ npm install
```

## Compilar o projeto
Após todas as dependências terem sido instaladas com sucesso, podemos rodar uma build para ter certeza que tudo está funcionando como esperado. Para isso, basta executar o seguinte comando:
```bash
$ npm run build
```

## Compilar e rodar o projeto
Temos algumas formas diferentes de executar nossa aplicação, rodando em *modo de desenvolvimento*, *watch mode*, *modo de produção* e através do **Docker**. 

```bash
# desenvolvimento
$ npm run start

# desenvolvimento em watch mode
$ npm run start:dev

# produção
$ npm run start:prod

# ou apenas
$ node dist/main.js
```

`OBS: Se quiser utilizar o yarn só para rodar também não tem problema :), só é obrigatório executar com npm a instalação das dependências.`

## Rodar com o Docker
Para rodar com o **Docker** é bem simples, mas precisamos confirmar algumas configurações antes. No arquivo [docker-compose.yml](docker-compose.yml) temos algumas configurações de portas e variáveis de ambiente, onde algumas são compartilhadas com nosso arquivo [.env](.env).
```yaml
ports:
  - "3000:80"
environment:
  - NODE_ENV=production
  - API_PROTOCOL=${API_PROTOCOL:-http}
  - API_ADDRESS=${API_ADDRESS:-localhost}
  - API_PORT=80
  - JWT_SECRET=${JWT_SECRET:-secret}
  - JWT_REFRESH_SECRET=${JWT_REFRESH_SECRET:-secret}
  - JWT_EXPIRATION_TIME=${JWT_EXPIRATION_TIME:-1d}
  - JWT_REFRESH_EXPIRATION_TIME=${JWT_REFRESH_EXPIRATION_TIME:-1d}
  - DOCS_ENABLED=${DOCS_ENABLED:-1}
  - DOCS_OPERATOR=${DOCS_OPERATOR:-inova}
  - DOCS_PASSWORD=${DOCS_PASSWORD:-inova2026}
  - DATABASE_URL=postgresql://inovatech:inovatech@postgres:5432/inovaapi_db
```
- `ports` Note que aqui nós temos `3000:80`, que quer dizer que nossa aplicação vai rodar na porta **3000** do nosso localhost e na porta **80** dentro do container. O mesmo acontece para o serviço do [postgres](docker-compose.yml#L29), que roda na porta **5632** do nosso localhost e na porta **5432** do container.

- `environment` Todas as configurações aqui são compartilhadas com nosso arquivo [.env](.env), exceto a configuração de [NODE_ENV](docker-compose.yml#L8), [API_PORT](docker-compose.yml#L11) e [DATABASE_URL](docker-compose.yml#L19) que são específicas do container por questões de compatibilidade. Todas essas configurações também já estão plug & play

E agora após outra longa jornada explicando algumas configurações do **Docker**, podemos iniciar a aplicação. Para isso, basta executar o seguinte comando e tudo estará pronto:
```bash
# compilar e iniciar em detached mode (background)
$ docker compose up --build -d

# compilar e iniciar no mesmo terminal
$ docker compose up --build

# apenas iniciar (detached mode)
$ docker compose up -d

# iniciar apenas a API
$ docker compose up app -d

# iniciar apenas o banco de dados (útil quando executamos usando npm run start:dev ou similar)
$ docker compose up postgres -d
```

### Logs
Após a aplicação ter sido iniciada, podemos verificar se tudo está funcionando, para isso podemos executar um dos comandos abaixo de acordo com a sua preferência:
```bash
# visualizar e seguir os logs de todos os containers (app e postgres)
$ docker compose logs -f

# visualizar apenas os logs do container da API
$ docker compose logs app -f

# visualizar apenas os logs do container do banco de dados
$ docker compose logs postgres -f
```

### Encerrando a aplicação
Para encerrar a aplicação temos alguns modos diferentes também:
```bash
# mais comum, quando não precisamos recompilar nada depois
$ docker compose down

# encerrando a aplicação e apagando os volumes
$ docker compose down -v

# encerrando a aplicação, apagando os volumes e os orphans (outros volumes anteriores, network e etc...)
$ docker compose down -v --remove-orphans

# encerrando apenas o container da API
$ docker compose down app

# encerrando apenas o container do banco de dados
$ docker compose down postgres
```

## Migrações do banco de dados
Após tudo ter sido configurado e o banco de dados já estar rodando, precisamos executar as [migrations](prisma/migrations/) para que o nosso [schema.prisma](prisma/schema.prisma) seja refletido no nosso banco de dados. Para isso, podemos rodar o seguinte comando:
```bash
# em desenvolvimento
$ npx prisma migrate dev

# em produção ou desenvolvimento
$ npx prisma migrate deploy
```

### Resetar o banco de dados
As vezes é necessário resetar o banco de dados em desenvolvimento (principalmente depois de tantos seeds - vamos chegar lá), para isso basta executar o seguinte comando:
```bash
# resetar o banco de dados com confirmação
$ npx prisma migrate reset

# forçar reset do banco de dados sem confirmação (não tem volta hein, cuidado kkk)
$ npx prisma migrate reset -f
```

## CLI
Criei um CLI pra facilitar os nossos testes, para fazer o seeding podemos executar os seguintes comandos de acordo com a sua preferência:
```bash
# em modo de desenvolvimento
$ npm run console:dev

# em produção (depois de compilar)
$ npm run console

# ou usando o yarn
$ yarn console:dev

# e depois de compilado
$ yarn console
```
Ao executar esses comandos, serão apresentados os comandos que temos disponíveis, que no momento são apenas 2: **seed** e **seed:users**. Também é possível verificar mais informações e opções disponíveis pra cada comando utilizando a flag **--help** ou simplesmente **-h** logo após o comando, por exemplo:
```bash
# usando npm (é necessário o separador "--", senão o npm pensa que o "-h" ou "--help" é pra ele e não pro nosso comando)
$ npm run console:dev -- seed -h

# ou
$ npm run console:dev -- seed --help

# usando yarn
$ yarn console:dev seed -h

# ou
$ yarn console:dev seed --help
```

### Seed
Agora é a hora de popularmos nosso banco de dados com alguns dados iniciais (e alguns fakes também logo em seguida), para isso, podemos executar o seguinte comando e abaixo vou explicar para que servem algumas opções:
```bash
# popular com os dados iniciais (sem opções o separador "--" não é necessário)
$ npm run console:dev seed

# ou usando o yarn
$ yarn console:dev seed
```
Desta forma, esse comando irá criar novos usuários ou atualizar os usuários já existentes baseado no **email** (unique) dos usuários. O comando **seed** e **seed:users** basicamente fazem a mesma coisa pois só temos esses dados "populáveis" na aplicação. Ambos também possuem as mesmas opções disponíveis, que como vimos anteriormente, podem ser acessadas utilizando o **--help** ou **-h**.

#### Criando usuários fakes
No caso dos usuários fakes, eles apenas serão criados, não serão atualizados (sem upsert). Então cada vez que rodarmos o comando ele irá criar uma quantidade X de usuários fakes de acordo com as opções passadas.

O padrão desses 2 comandos de *seeding* é criar/atualizar apenas os usuários padrão "reais". Mas para criarmos os usuários fakes podemos utilizar dessas 2 opções e combiná-las conforme sua preferência:
- `-i, --include-fakes` Inclui os usuários fakes no processo de **seeding**. Padrão: **desabilitado**
- `-a, --amount` Total de usuários fakes a serem criados. Padrão: **100 usuários aleatórios**

Para começar, vamos criar alguns usuários fakes, que por padrão, se a flag **-a** ou **--amount** for omitida, serão criados **100** usuários aleatórios por execução.
```bash
# usando npm
$ npm run console:dev -- seed -i

# ou
$ npm run console:dev -- seed --include-fakes

# usando yarn
$ yarn console:dev seed -i

# ou
$ yarn console:dev seed --include-fakes
```

Para controlar a quantidade de usuários fakes criados, podemos utilizar a opção **-a** ou **--amount**, ficando dessa forma:
```bash
# usando npm - criando 200 usuários fakes
$ npm run console:dev -- seed -i -a 200

# criando 500 usuários fakes
$ npm run console:dev -- seed --include-fakes --amount 500

# usando yarn - criando 200 usuários fakes
$ yarn console:dev seed -i -a 200

# criando 500 usuários fakes
$ yarn console:dev seed --include-fakes --amount 500
```

Também é possível combinar as 2 opções juntas, deixando o comando levemente mais curto:
```bash
# usando npm - criando 200 usuários fakes
$ npm run console:dev -- seed -ia 200

# criando 500 usuários fakes
$ npm run console:dev -- seed -ia 500

# usando yarn - criando 200 usuários fakes
$ yarn console:dev seed -ia 200

# criando 500 usuários fakes
$ yarn console:dev seed -ia 500
```

Lembrando que, os 2 comandos (**seed** e **seed:users**) possuem as mesmas opções, pois o **seed** chama o **seed:users**, portanto todos esses comandos de *seeding* executados até aqui também poderia ser utilizado o comando **seed:users**, como por exemplo:
```bash
# usando npm
$ npm run console:dev -- seed:users -ia 200

# usando yarn
$ yarn console:dev seed:users -ia 200
```

Lembrando que a ordem importa: **-i** ativa a criação de usuários fakes e **a** define a quantidade que será criada. Portanto usar **-ai** em vez de **-ia** não vai funcionar.

# Acessando a aplicação
Após tudo ter sido configurado, migrado e criado, é hora de finalmente acessarmos a aplicação. Para isso, você pode usar meu usuário criado para efetuar login (`elyssonmarconi.dev@gmail.com` com a senha incrivelmente forte `12345678`) ou qualquer outro usuário presente em [users.ts](src/cli/data/users.ts) (todos possuem a mesma senha, e sim, sou fã de Breaking Bad), usando `Insomnia`, `Postman` ou melhor ainda, o `Swagger` (deu um trabalhão deixar do jeito que está).

# Documentação no Swagger
Para ter acesso à todos os endpoints disponíveis, você pode utilizar o `Swagger` que está disponível em `/docs` (desde que esteja ativado no [.env](.env), lembra?). No `Swagger` você vai conseguir acessar e visualizar todas as respostas disponíveis, tanto de sucesso quanto de erro em todos os endpoints disponíveis.

Você também conseguirá visualizar quais são os filtros e dados de entrada e saída em cada endpoint, assim como cada erro que pode ser retornado em cada um deles.

# Finalização
Espero que esta documentação possa ter sido útil

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
