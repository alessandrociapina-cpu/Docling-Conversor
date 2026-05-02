const API_URL = 'https://api-docling-pdf.onrender.com/process-pdf/';

document.getElementById('upload-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const fileInput = document.getElementById('pdf-file');
    const statusContainer = document.getElementById('status-container');
    const resultContainer = document.getElementById('result-container');
    const outputText = document.getElementById('output-text');
    const statusText = document.getElementById('status-text');
    const submitBtn = document.getElementById('submit-btn');

    if (!fileInput.files[0]) return;

    // Reset UI
    statusContainer.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    submitBtn.disabled = true;
    statusText.innerText = 'O Docling está analisando o layout e tabelas... Isso pode levar um minuto.';

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Falha no processamento do servidor.');
        }

        const data = await response.json();
        
        outputText.innerText = data.markdown;
        resultContainer.classList.remove('hidden');
        statusContainer.classList.add('hidden');
    } catch (error) {
        alert('Erro: ' + error.message);
        statusContainer.classList.add('hidden');
    } finally {
        submitBtn.disabled = false;
    }
});

function copyToClipboard() {
    const text = document.getElementById('output-text').innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert('Copiado para a área de transferência!');
    });
}
