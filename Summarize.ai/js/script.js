// js/script.js

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('.icon');

// Check saved theme
if (localStorage.getItem('theme') === '🌙') {
    body.classList.add('dark-mode');
    icon.textContent = '🌙';
}

// Toggle dark/light mode
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        icon.textContent = '🌙';
        localStorage.setItem('theme',  'dark');
    } else {
        icon.textContent = '☀️';
        localStorage.setItem('theme', 'light');
    }
});

// script.js

document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit-button');
    const textArea = document.getElementById('text_to_summarize');
    const summaryArea = document.getElementById('summary');

    submitButton.addEventListener('click', async () => {
        const textToSummarize = textArea.value.trim();

        if (textToSummarize === '') {
            alert('Please enter some text to summarize.');
            return;
        }

        // Clear the previous summary
        summaryArea.value = 'Summarizing...';

        try {
            // Sending POST request to the backend to summarize the text
            const response = await fetch('http://localhost:3000/summarize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text_to_summarize: textToSummarize
                })
            });

            const data = await response.json();

            if (data.summary) {
                // Display the summary if successful
                summaryArea.value = data.summary;
            } else {
                // Show an error message if no summary returned
                summaryArea.value = 'Error: Could not summarize text.';
            }
        } catch (error) {
            console.error('Error summarizing text:', error);
            summaryArea.value = 'Error: Could not summarize text.';
        }
    });
});
