from flask import Flask
from return_color import predict_color
app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"   

# @app.route('/return_color')
# def return_color(red,green,blue):
#   color = predict_color(red,green,blue)
#   return color


if __name__ == '__main__':
    app.run(debug=True)
