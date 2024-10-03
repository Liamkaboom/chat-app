const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Replace with your actual OpenAI API key
const OPENAI_API_KEY = 'your-openai-api-key';

app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    const aiResponse = await getAIResponse(userMessage);
    res.json({ response: aiResponse });
});

async function getAIResponse(message) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }],
        })
    });

    const data = await response.json();
    return data.choices[0].message.content;
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
