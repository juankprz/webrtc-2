FROM node:18-alpine
COPY . .
RUN npm install 
EXPOSE 3000
ENTRYPOINT node server.js