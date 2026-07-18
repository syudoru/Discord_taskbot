FROM node:24-slim

WORKDIR /app

# 依存関係を先にインストール（キャッシュ活用）
COPY package*.json ./
RUN npm ci --omit=dev

# ソースコードをコピー
COPY . .

ENV POST=8080

CMD ["npm", "start"]