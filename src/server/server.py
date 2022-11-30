from flask import Flask, request, jsonify, Response
import pickle
import pandas as pd

# load pickled model for predictions
model = pickle.load(open('./serialized_model/scrabbleRatingModel.pkl', 'rb'))

# initialize a flask app for server requests
app = Flask(__name__)

# endpoints
@app.route('/', methods=['GET'])
def index():
  return """
    <!DOCTYPE html>
    <html>
      <body>
        <h1>Scrabble</h1>
      </body>
    </html>
  """

# endpoint to make user rating prediction
@app.rout('/predict', methods=['POST'])
def prediction():
  # extract the payload from the request
  request_data = request.json['prediction']
  # create a pandas series to store the prediction data

  # use model to return y_predict

  # check if user is within bounds of play for their rating
    # if not, return a Fraudulant detection

if __name__ == '__main__':
    # run() method of Flask class runs the application
    # on the local development server.
    app.run()  