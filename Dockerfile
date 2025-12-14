FROM node:22.21.1-alpine AS container
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm ci
COPY . /app
ENV CI=true

RUN npm run build

FROM node:22.21.1-alpine as final
ENV CONFIG_PATH='./dist/gg-ui-admin-page/browser/assets/config/'
ENV NODE_TLS_REJECT_UNAUTHORIZED=0;
ENV APPLICATIONINSIGHTS_CONFIGURATION_CONTENT='{}'
ENV ENV_RUN=1

COPY --from=container /app/dist /public/dist

WORKDIR /public
ENV PORT 80
ENV HOST_ADDRESS '0.0.0.0'
EXPOSE 80

CMD node ./dist/genealogy-web/server/server.mjs