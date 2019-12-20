FROM node:13

WORKDIR /usr/local/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-dependencies

COPY . .

RUN yarn build

ENTRYPOINT ["yarn"]
CMD ["start"]