FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-alpine

WORKDIR /app

COPY --from=build /app/.output ./.output

ENV HOST=0.0.0.0
ENV PORT=8080
ENV NITRO_PORT=8080
ENV NITRO_HOST=0.0.0.0

EXPOSE 8080

CMD ["node", ".output/server/index.mjs"]
