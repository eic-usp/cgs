FROM node AS builder

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM node

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --production
COPY --from=builder /usr/src/app/dist .

# EXPOSE 3000
CMD ["node", "bin/www.js"]