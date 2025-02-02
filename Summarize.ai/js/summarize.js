// summarize.js (Summarization logic) using ES modules syntax
import axios from 'axios';

const HF_API_KEY = process.env.HF_API_KEY; 
export async function summarizeText(inputText) {
    const data = {
        inputs: inputText,
        parameters: {
            max_length: 100,
            min_length: 30
        }
    };

    const config = {
        method: 'post',
        url: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${HF_API_KEY}`
        },
        data: JSON.stringify(data)
    };

    try {
        const response = await axios.request(config);
        return response.data[0]?.summary_text || 'No summary returned.';
    } catch (error) {
        console.error("Error contacting Hugging Face API:", error);
        throw new Error('Error contacting Hugging Face API');
    }
}
