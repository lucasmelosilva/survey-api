FROM node:18
WORKDIR /urs/src/survey-api
COPY ./package.json .
RUN npm install --omit=dev --ignore-scripts