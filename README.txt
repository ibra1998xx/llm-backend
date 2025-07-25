
# Local LLM Backend

This is a free replacement for Gemini API using Ollama + Phi-3.

## 1. Install dependencies

npm install

## 2. Start Ollama locally (install it from https://ollama.com)

ollama run phi3

## 3. Run the server

npm start

## 4. API Endpoint

POST /api/chat
Body:
{
  "reviews": [
    { "content": "This is a great product!" },
    { "content": "Not good, broke after a week." }
  ]
}
