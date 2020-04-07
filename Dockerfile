FROM node:latest

WORKDIR /usr/src/SOP_backend

COPY ./ ./

RUN npm install 

EXPOSE 3000

CMD ["bin/bash"]
