FROM node:14-bullseye

WORKDIR /web

COPY . .
RUN chmod +x ./scripts/docker-entrypoint.sh

ENTRYPOINT ["/web/scripts/docker-entrypoint.sh"]
