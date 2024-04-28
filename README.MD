## Menu

Here is a menu of available options:

1. [Project Setup](#project-setup)
  - [Prerequisites](#prerequisites)
  - [Docker Setup](#docker-setup)
  - [Local Setup](#local-setup)
    - [Backend](#backend)
    - [Frontend Web](#frontend-web)
    - [Frontend Mobile](#frontend-mobile)
2. [Technologies](#technologies)
  - [Backend](#backend)
  - [Frontend](#frontend)
3. [Mentions/Assumptions/Notes](#mentionsassumptionsnotes)


## Project Setup

In order to set up the project follow the steps below:

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
- [pnpm](https://pnpm.io/)
- [Git](https://git-scm.com/)
- [OpenAI Key](https://platform.openai.com/)
- [Android Studio](https://developer.android.com/studio) (for the mobile app)

### Docker Setup

1. Clone the repository

```bash
git clone https://github.com/droquedev/fullstack-test
```

2.Add the openai key to the environment section of the docker-compose file in the backend-service

```yaml
environment:
  - OPENAI_KEY=YOUR_OPENAI_KEY
```


3. Run the following command to build and run the docker containers

```bash
docker-compose up
```

4. Project ports
- The frontend will be available at [http://localhost:4443](http://localhost:4443)
- The backend will be available at [http://localhost:4443/api](http://localhost:4443/api)
- The api documentation will be available at [http://localhost:4443/docs](http://localhost:4443/docs)

### Local Setup

#### Backend

1. Navigate to the backend directory

```bash
cd api
```

2. Install the dependencies

```bash
pnpm install
```

3. Add the openai key to the environment file at the root of the backend(api) directory

```text
OPENAI_KEY=YOUR_OPENAI_KEY
```


4. Run the following command to start the backend server

```bash
pnpm dev
```

5. The backend will be available at [http://localhost:3000](http://localhost:3000)
- The api documentation will be available at [http://localhost:3000/docs](http://localhost:3000/docs)

6. To run the tests, run the following command

```bash
pnpm test
```

#### Frontend Web

1. Navigate to the frontend directory

```bash
cd client
```

2. Install the dependencies

```bash
pnpm install
```

3. Add the backend url to the environment file at the root of the frontend directory (use your local ip instead of localhost)

```text
VITE_APP_BACKEND_URL=http://localhost:3000
```

4. Run the following command to start the frontend server

```bash
pnpm dev
```

5. The frontend will be available at [http://localhost:5173](http://localhost:5173)

6. To run the tests, run the following command

```bash
pnpm test
```

## Frontend Mobile

1. Navigate to the frontend directory (client)

```bash
cd client
```

2. Install the dependencies (if you haven't already)

```bash
pnpm install
```

3. Open the android project with android studio

```bash
npx cap open android
```

4. Install a java jdk if you don't have one installed

5. In the client directory, edit the file `capacitor.config.ts
and change the server url to your local ip address

```typescript
{
  ...config,
  server: {
    url: 'http://192.168.1.2:5173', // if you are using the docker setup, use your local ip address and the port 4443
  },
}
```


6. Run the android project with android studio



## Technologies
### Backend
- [Node.js](https://nodejs.org/en/)
- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [Sqlite](https://www.sqlite.org/index.html)
- [Swagger](https://swagger.io/)
- [Jest](https://jestjs.io/)

### Frontend
- [React](https://reactjs.org/)


## Mentions, Assumptions and Notes

- I was unable to setup the [LibreTranslate](https://libretranslate.com/) due to the pricing for the api key, I tried doing webScrapping but it was not the best idea because the client do the request for the translate on the frontend (no server side), so i tried to do it with a headless browser with puppeteer but it was too slow, so I used OpenAI's GPT-3.5 instead for the translation, the openai key should be on the submission message.

- There is a limitation with the current implementation due to the fact that the GPT-3.5 api is not free, this could incur costs if the usage is high, things like caching the translations could help reduce the costs.

- The project is not production ready, there are a lot of things that could be improved, like adding more tests, improving the error handling, adding more features, etc.

- The project is not fully optimized, there are some things that could be improved, for example in the frontend if the user does not have a good computer and scrolls down the page, the performance could be affected, this could be improved by using virtualized lists.

- The project ui/ux could be improved, I am not that good with design from my mind, I usually need a design to follow, so the design is not that good.

- The project is missing validation of the language code, the app is not validating that this is one of the supported languages by libre office, this could be done by setting the supported languages in the backend at the start of the app and then validating the language code against that list.

- All unit tests are happy path tests, there are no tests for edge cases, this could be improved by adding more tests.