FROM golang:1.17-alpine AS builder
WORKDIR /go/src/github.com/octoman90/
RUN apk add --no-cache git
RUN git clone https://github.com/octoman90/proxyshiva.git
RUN cd proxyshiva && CGO_ENABLED=0 GOOS=linux go build

FROM node:lts-alpine AS backend
WORKDIR /app
EXPOSE 4000
COPY --from=builder /go/src/github.com/octoman90/proxyshiva/proxyshiva /usr/local/bin/
COPY . .
RUN yarn install && yarn build
ENTRYPOINT [ "yarn", "start" ]
