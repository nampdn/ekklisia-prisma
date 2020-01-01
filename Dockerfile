FROM node:12

WORKDIR /usr/local/app

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

COPY package.json yarn.lock ./

RUN NOYARNPOSTINSTALL=1 yarn install --frozen-dependencies

COPY . .

RUN yarn build

EXPOSE 4000

ENTRYPOINT ["/bin/sh"]
CMD ["-c", "echo \"DATABASE_URL=${DATABASE_URL}\" > .env && node dist/server"]