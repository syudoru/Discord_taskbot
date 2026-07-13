FROM python:3.12-slim

WORKDIR /app

# 依存関係を先にインストール（キャッシュ活用）
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ソースコードをコピー
COPY . .

# 非rootユーザーで実行（セキュリティ推奨）
RUN useradd -m appuser && chown -R appuser /app
USER appuser

# Cloud RunはPORT環境変数を使用する
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8080}"]