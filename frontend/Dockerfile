FROM node:15.5

WORKDIR /app

COPY pakage*.json /app/

RUN npm install

COPY ./ /app/

RUN npm run build

CMD ["npm", "start"]