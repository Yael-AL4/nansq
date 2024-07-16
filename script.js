let spamInterval;
const spamSpeed = 100;

function openSpammer() {
    let formContainer = document.querySelector('.form-container');

    if (formContainer) {
        formContainer.remove();
        clearInterval(spamInterval);
        return;
    }

    formContainer = document.createElement('div');
    formContainer.classList.add('form-container');
    formContainer.innerHTML = `
        <input type="text" id="webhookUrl" placeholder="URL webhook" required>
        <input type="text" id="message" placeholder="Message" required>
        <button onclick="toggleSpam()">Flood!!</button>
    `;

    let overlay = document.querySelector('.overlay');
    overlay.insertBefore(formContainer, overlay.firstChild);
}

function toggleSpam() {
    let button = document.querySelector('.form-container button');

    if (button.textContent === 'Flood!!') {
        startSpam();
        button.textContent = 'Stop';
    } else {
        stopSpam();
        button.textContent = 'Flood!!';
    }
}

function startSpam() {
    let webhookUrl = document.getElementById('webhookUrl').value.trim();
    let message = document.getElementById('message').value.trim();

    if (webhookUrl && message) {
        spamInterval = setInterval(async () => {
            await sendMessage(webhookUrl, message);
        }, spamSpeed);
    }

}

function stopSpam() {
    clearInterval(spamInterval);
}

async function sendMessage(webhookUrl, message) {
    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: message })
        });

        if (!response.ok) {
            throw new Error('Error al enviar el mensaje.');
        }
    } catch (error) {
        console.error('Error:', error.message);
        alert('error weebhook url invalida o msg vacio');
    }
}

