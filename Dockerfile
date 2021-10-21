FROM node:16.11.1 as build-deps

WORKDIR /app

ARG BA_URL
ENV BACKEND_URL=$BA_URL

COPY ["package.json", "yarn.lock", "./"]
ENV PATH=/app/node_modules/.bin/:$PATH
RUN yarn install --frozen-lockfile

COPY public ./public/
COPY src ./src/
COPY .env tsconfig.json ./
RUN npx browserslist@latest --update-db && yarn build



FROM nginx:1.20.1-alpine

COPY --from=build-deps /app/build /var/www
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

