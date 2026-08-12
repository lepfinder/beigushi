# 轻量静态古诗词站点
FROM node:22-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci || npm install

COPY grades.ts server.ts ./
COPY public ./public
COPY content ./content

RUN npm run build

EXPOSE 8080
ENV PORT=8080
ENV NODE_ENV=production

CMD ["npm", "start"]
