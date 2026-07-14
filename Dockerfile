FROM node:24-slim

WORKDIR /app

# 依存関係を先にインストール（キャッシュ活用）
COPY package*.json ./
RUN npm ci --omit=dev

# ソースコードをコピー
COPY . .

ENV POST=8080

CMD ["npm", "start"]

# 非rootユーザーで実行（セキュリティ推奨）
# RUN useradd -m appuser && chown -R appuser /app
# USER appuser

# Cloud RunはPORT環境変数を使用する
# CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8080}"]
