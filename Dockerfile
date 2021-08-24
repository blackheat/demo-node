FROM node:16-alpine
EXPOSE 4040
WORKDIR /app
COPY . .
RUN yarn install
CMD ["yarn", "start"]