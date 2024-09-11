// サンプルの音声ファイルをサーバーに送信し、文字起こし結果を取得
function startTranscription() {
    let audioFile = new File([''], 'sample-pilot-controller.wav', {
        type: 'audio/wav'
    });

    let formData = new FormData();
    formData.append('file', audioFile);

    // Flaskサーバーに音声ファイルを送信
    fetch('http://127.0.0.1:5000/transcribe', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        displayTranscription(data.transcription);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// 文字起こし結果をチャットウィンドウに表示
function displayTranscription(text) {
    let chatWindow = document.getElementById('chat-window');
    let messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = text;
    chatWindow.appendChild(messageElement);
}

