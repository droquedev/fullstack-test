ARG TARGET

FROM node:20.12.2-alpine as build

RUN npm i -g pnpm
RUN apk update && apk add --no-cache make

WORKDIR /app

COPY ./pnpm-workspace.yaml ./
COPY ./package.json ./

RUN ls -la
RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE 3000

FROM build as backend-service
WORKDIR /app/api
RUN pnpm install
CMD ["pnpm","run", "start:prod"]

FROM build as frontend-service
WORKDIR /app/client
RUN pnpm install
CMD ["pnpm", "run", "preview"]

FROM ${TARGET}-service

