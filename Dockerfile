FROM node:20-alpine AS builder
COPY package.json package-lock.json /opt
WORKDIR /opt
RUN npm install
COPY ./ /opt
RUN npm run build

FROM alpine:3
COPY --from=builder /opt/dist/mailcow-anonaddy-translator /opt/mailcow-anonaddy-translator
ENTRYPOINT ["/opt/mailcow-anonaddy-translator"]
