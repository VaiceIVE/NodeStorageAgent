FROM nodejs

COPY . /project

WORKDIR /project

RUN npm install

CMD ["npm", "run", "dev"]
