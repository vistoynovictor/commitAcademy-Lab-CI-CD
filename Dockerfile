FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

EXPOSE 80

ENTRYPOINT ["node"]
CMD ["server.mjs"]
