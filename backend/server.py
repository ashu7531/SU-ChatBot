from flask import Flask, request, jsonify
from flask_cors import CORS
from botlogic import get_answer

app = Flask(__name__)
CORS(app)

def process_input(data):
    result = get_answer(data)
    return result

@app.route('/api/process', methods=['POST'])
def process():
    input_data = request.json.get('input')
    output_data = process_input(input_data)
    return jsonify({"output": output_data})

if __name__ == '__main__':
    app.run(debug=True)
