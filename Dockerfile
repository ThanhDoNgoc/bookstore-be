#build deps
FROM node:18-alpine AS deps

WORKDIR /app
COPY package*.json ./

RUN npm ci --only=production


#build dist
FROM deps AS build
WORKDIR /app
COPY ./ ./
RUN npm install
RUN npm run build

#build app
FROM node:18-alpine 
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./src
COPY --from=build /app/src/swagger ./src

EXPOSE 3000

CMD ["node", "./src/index.js"]

#docker build -t <name> .
#docker run -p 3000:3000 -e MONGODB="<mongourl>" -e PORT=3000 <name>