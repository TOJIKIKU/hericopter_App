import os
import whisper
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # CORSを有効にして、フロントエンドとの通信を許可

# Whisperモデルをロード
model = whisper.load_model("base")

# アップロードされた音声ファイルを受け取り、文字起こしを行う
@app.route('/transcribe', methods=['POST'])
def transcribe():
    # 音声ファイルが送信されているか確認
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    # 音声ファイルを保存
    file = request.files['file']
    file_path = os.path.join("audio", file.filename)
    file.save(file_path)

    # Whisperで文字起こし
    result = model.transcribe(file_path)

    # 結果を返す
    return jsonify({'transcription': result['text']})

if __name__ == '__main__':
    app.run(debug=True)
