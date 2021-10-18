FROM node:16.11.1 as build-deps

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]
ENV PATH=/app/node_modules/.bin/:$PATH
RUN yarn install --frozen-lockfile

COPY . ./
RUN npx browserslist@latest --update-db && yarn build



FROM nginx:1.20.1-alpine
COPY --from=build-deps /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

