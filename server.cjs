
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
  const { reviews } = req.body;

  try {
    const messages = reviews.map((item, index) => ({
      role: "user",
      content: `Review ${index + 1}: ${item.content}`
    }));

    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "phi3",
        messages: [
          { role: "system", content: "You are a review moderator. Respond with moderation decisions only." },
          ...messages
        ]
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error talking to Ollama:", err);
    res.status(500).json({ error: "LLM backend failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
