from flask import Flask, request
from flask_cors import CORS
from return_color import predict_color

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    return "hello world!"

@app.route('/return_color', methods=['POST'])
def return_color():
    data = request.get_json()
    red = data.get('red')
    green = data.get('green')
    blue = data.get('blue')
    
    if red is None or green is None or blue is None:
        return 'Missing RGB values', 400
    
    color = predict_color(red, green, blue)
    return color


if __name__ == '__main__':
    app.run(debug=True)
