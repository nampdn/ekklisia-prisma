FROM node:12

WORKDIR /usr/local/app

COPY package.json yarn.lock ./

RUN NOYARNPOSTINSTALL=1 yarn install --frozen-dependencies

COPY . .

RUN yarn build

RUN echo $DATABASE_URL > .env

EXPOSE 4000

ENTRYPOINT ["yarn"]
CMD ["start"]