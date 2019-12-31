FROM node:13

WORKDIR /usr/local/app

COPY package.json yarn.lock ./

RUN NOYARNPOSTINSTALL=1 yarn install --frozen-dependencies

COPY . .

RUN yarn build

EXPOSE 4000

ENTRYPOINT ["yarn"]
CMD ["start"]