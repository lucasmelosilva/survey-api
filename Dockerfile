FROM node:18
WORKDIR /urs/src/survey-api
COPY ./package.json .
RUN npm pkg delete scripts.prepare && npm install --omit=dev