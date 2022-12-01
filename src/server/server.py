from flask import Flask, request, jsonify, Response
import pickle
import pandas as pd
import numpy as np
from src.server.queries.users import query_user_rating
from flask_cors import CORS

# load pickled model for predictions
model = pickle.load(open('./serialized_model/scrabbleRatingModel.pkl', 'rb'))

# initialize a flask app for server requests
app = Flask(__name__)
CORS(app)
# endpoints
@app.route('/coefs', methods=['GET'])
def coefs():
  ridge = model.named_steps['ridge']
  coefficients = ridge.coef_
  print(type(coefficients))
  response = jsonify(coefficients.tolist())

  print("SENDING COEFFICIENTS!")

  return response

# endpoint to make user rating prediction
@app.route('/predict', methods=['POST'])
def prediction():
  # extract the payload from the request
  request_data = request.json

  # store the username in a variable
  username = request_data['username']
  # remove the username from the request_data dictionary
  request_data.pop('username')
  print("Username: ", username)


  # attributes need to all be within a list and float values
  request_data = {key: [float(val)] for key, val in request_data.items()}
  # print(request_data)

  
  # column headers:
  # rating,total_turns,first_five_turns_points,max_points_turn,min_points_turn,max_min_difference,first,winner,initial_time_seconds,increment_seconds,
  # max_overtime_minutes,game_duration_seconds,time_used,points_per_turn,points_per_second,
  # time_control_name_blitz,time_control_name_rapid,time_control_name_regular,time_control_name_ultrablitz,
  # game_end_reason_CONSECUTIVE_ZEROES,game_end_reason_RESIGNED,game_end_reason_STANDARD,game_end_reason_TIME,
  # lexicon_CSW21,lexicon_ECWL,lexicon_NSWL20,lexicon_NWL20,
  # rating_mode_CASUAL,rating_mode_RATED

  # create a pandas dataframe with these headers and a row from the request object
  df = pd.DataFrame(request_data)

  predicted_rating = model.predict(df)[0]
  
  user_rating = query_user_rating(username)
  if not user_rating:
    return Response(response = 'Invalid Username!', status=200)
  else:
    # user rating will return as a tuple inside of a list
    # value of predicted rating is in first element of tuple in list
    user_rating = user_rating[0][0]
    if predicted_rating > user_rating * 1.30:
      fraud = True
    else:
      fraud = False

    # determine the coefficient percentages
    ridge = model.named_steps['ridge']
    coefficients = ridge.coef_
    intercept = ridge.intercept_
    coefficients = coefficients.tolist()
    
    # iterate through each key value
    index = 0
    coefs = {}

    sum = 0
    for key, val in request_data.items():
      print(key, val, coefficients[index])
      out = val[0] * coefficients[index]
      percent = ((out) / predicted_rating) * 100
      sum += percent
      coefs[key] = str(percent) + " %"
      index += 1
    print(sum)

    # interceptP = (intercept / predicted_rating) * 100

    # coefs['intercept'] = str(interceptP) + " %"
    # print(sum + interceptP)
    # print("============")
    # return a response object with the players new rating
    response_data = [user_rating, predicted_rating, fraud, coefs]
    response = jsonify(response_data)
    print("RESPONDING!")
    return response

if __name__ == '__main__':
    # run() method of Flask class runs the application
    # on the local development server.
    app.run()  