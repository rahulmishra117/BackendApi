# Use the official Alpine base image
FROM alpine:latest
RUN apk add --no-cache nodejs npm
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 2000
CMD ["npm", "start"]
