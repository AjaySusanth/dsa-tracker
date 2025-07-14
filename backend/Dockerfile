FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN apk --no-cache add curl


EXPOSE 4000

CMD ["sh", "-c", "npm run db:deploy && npm run dev"]
