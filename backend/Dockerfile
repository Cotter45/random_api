FROM node:12

WORKDIR /app

COPY package.json ./

COPY package-lock.json ./

COPY ./ ./

RUN npm i

# ENV NODE_ENV=production

CMD ["npm", "start"]