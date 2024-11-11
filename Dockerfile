FROM node:20-alpine AS builder
COPY ./ /opt
WORKDIR /opt
RUN npm run build

FROM alpine:3
COPY --from=builder /opt/dist/mailcow-anonaddy-translator /opt/mailcow-anonaddy-translator
ENTRYPOINT ["/opt/mailcow-anonaddy-translator"]
