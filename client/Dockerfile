FROM node:20.12.2-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY ./package.json ./

RUN pnpm install

COPY . .

EXPOSE 4173

CMD ["pnpm", "run", "preview"]
