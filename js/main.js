let transcription = [
    { time: 2, role: 'controller', text: "NRT cleared to FL180, turn right heading 270." },
    { time: 5, role: 'pilot', text: "Cleared to FL180, turning right heading 270, Japan Airlines 123." }
];

function startTranscription() {
    playAudio();
    simulateTranscription();
}

function playAudio() {
    var audio = new Audio('audio/sample-pilot-controller.wav');
    audio.play();
}

function simulateTranscription() {
    let chatWindow = document.getElementById('chat-window');
    let currentIndex = 0;

    function displayMessage() {
        if (currentIndex < transcription.length) {
            let message = transcription[currentIndex];
            let messageElement = document.createElement('div');
            messageElement.classList.add('message', message.role);

            let labelElement = document.createElement('span');
            labelElement.classList.add('label');
            labelElement.textContent = message.role.charAt(0).toUpperCase() + message.role.slice(1);

            let textElement = document.createElement('p');
            textElement.innerHTML = highlightTechnicalTerms(message.text);

            messageElement.appendChild(labelElement);
            messageElement.appendChild(textElement);
            chatWindow.appendChild(messageElement);

            currentIndex++;
        }
    }

    transcription.forEach((msg, index) => {
        setTimeout(displayMessage, msg.time * 1000);
    });
}

function highlightTechnicalTerms(text) {
    // Simple example of highlighting technical terms
    const terms = ["NRT", "FL180", "Japan Airlines 123"];
    terms.forEach(term => {
        const regex = new RegExp(`(${term})`, 'gi');
        text = text.replace(regex, `<mark class="highlight">$1</mark>`);
    });
    return text;
}
