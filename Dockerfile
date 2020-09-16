FROM rust:1.46.0-alpine3.12 AS wasm-builder
WORKDIR /build
RUN apk update
RUN apk add curl gcc g++ libressl-dev
RUN curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
COPY wasm/Cargo.toml .
COPY wasm/.env .
COPY wasm/src src
RUN wasm-pack build

FROM node:14.10.1-alpine3.10 AS node-builder
WORKDIR /build
RUN mkdir wasm
COPY --from=wasm-builder /build/pkg ./wasm/pkg
COPY src src
COPY .npmrc .
COPY .eslintrc.json .
COPY .babelrc .
COPY .prettierrc.json .
COPY jest.config.js .
COPY next-env.d.ts .
COPY package.json .
COPY tsconfig.json .
COPY yarn.lock .
RUN yarn --frozen-lockfile
RUN yarn build
RUN yarn export

FROM nginx:1.19.2-alpine AS app
COPY --from=node-builder /build/out /etc/nginx/html
COPY conf.d/nginx.conf /etc/nginx/conf.d/default.conf
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
