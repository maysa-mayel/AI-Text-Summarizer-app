// index.js (Backend) using ES modules syntax
import express from 'express';
import cors from 'cors';
import { summarizeText } from './summarize.js'; // Import summarize logic

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/summarize', async (req, res) => {
    const inputText = req.body.text_to_summarize;

    if (!inputText) {
        return res.status(400).json({ error: 'Text to summarize is required' });
    }

    try {
        const summary = await summarizeText(inputText);
        res.json({ summary });
    } catch (error) {
        console.error("Error summarizing text:", error);
        res.status(500).json({ error: 'Error summarizing the text' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
