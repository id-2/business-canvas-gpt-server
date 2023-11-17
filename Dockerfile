FROM node:18
WORKDIR /usr/src/business-canvas-model
COPY ./package.json .
RUN npm install --omit=dev
COPY ./dist ./dist
