FROM node:latest

WORKDIR /usr/src/SOP_backend

COPY ./ ./

RUN npm install

CMD ["bin/bash"]