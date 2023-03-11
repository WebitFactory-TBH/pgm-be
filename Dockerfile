FROM node:18-alpine AS build

RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app
COPY ./package*.json ./
COPY ./prisma ./prisma
COPY ./ ./

RUN npm ci && npx prisma generate && npm run build

FROM node:18-alpine AS production

WORKDIR /usr/src/app

COPY ./package*.json ./
COPY ./prisma ./prisma
RUN npm ci --omit=dev --ignore-scripts && npx prisma generate
COPY --from=build /usr/src/app/dist ./dist

CMD ["node", "./dist/src/main.js"]