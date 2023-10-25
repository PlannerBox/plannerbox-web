###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine AS base

FROM base AS development
ENV SHELL="/bin/bash"
RUN apk add build-base gcompat curl && \
    curl -fsSL https://get.pnpm.io/install.sh | sh -
RUN mv /root/.local/share/pnpm/pnpm /usr/bin/
WORKDIR /app

RUN npm i -g @nestjs/cli
RUN npm i -g turbo

COPY --chown=node:node pnpm-lock.yaml ./
COPY --chown=node:node package.json ./
COPY --chown=node:node . ./
COPY --chown=node:node ./apps/api/tsconfig.json ./tsconfig.json

RUN turbo prune --scope=api --docker

# To Fix Permissions for Packages
RUN pnpm config set unsafe-perm true

RUN pnpm install

RUN chown -R node:node /app

USER node
CMD [ "nest", "start:dev" ]

###################
# BUILD FOR PRODUCTION
###################

FROM base AS production
ENV SHELL="/bin/bash"
RUN apk add build-base gcompat curl && \
    curl -fsSL https://get.pnpm.io/install.sh | sh -
RUN mv /root/.local/share/pnpm/pnpm /usr/bin/
RUN npm i -g turbo
WORKDIR /app

COPY --chown=node:node pnpm-lock.yaml ./
COPY --chown=node:node package.json ./
COPY --chown=node:node . ./
COPY --chown=node:node ./apps/api/tsconfig.json ./tsconfig.json
COPY --chown=node:node ./apps/api/tsconfig.build.json ./tsconfig.build.json

RUN npm i -g @nestjs/cli
RUN pnpm i --prod
RUN pnpm turbo run build --filter=api...

USER node

CMD [ "nest", "start" ]
