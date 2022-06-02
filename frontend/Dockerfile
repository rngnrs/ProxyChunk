FROM node:lts-alpine AS builder
WORKDIR /app
#ARG NODE_ENV
#ENV NODE_ENV $NODE_ENV
ARG REACT_APP_API_ENDPOINT
ENV REACT_APP_API_ENDPOINT $REACT_APP_API_ENDPOINT
COPY . .
RUN yarn install && yarn build

FROM nginx:alpine AS frontend
EXPOSE 80
COPY --from=builder /app/build /app/
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/
