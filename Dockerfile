FROM node:12.14.0

WORKDIR /usr/src/SOP_backend

COPY ./ ./

RUN npm install 

EXPOSE 3000

CMD ["npm", "start"]
