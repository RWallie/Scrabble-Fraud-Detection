import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.linear_model import  Ridge
import pickle


# function to read in data sets and transform into independent and dependent variables
def read_in_csv_and_fit_model():
  # import training set into a dataframe
  df = pd.read_csv('./data/Scrabble_Player_Rating_Training_Data.csv')

  # split data into dependent and independent variables
  # predicting rating of a user based on their statistics from a game
  X = df.drop('rating', axis = 1)
  y = df['rating']

  # use best model from testing -> pipeline with StandardScaler and Ridge Regression, 
  # (alpha, score) = (157.48999999999864, 0.6414347163989611)
  # use pipeline to have access to coeficients later
  
  # standard scaler didn't provide any optimal results and lost ability to provide presentation 
  # of coefficients - ended up removing to allow display of coefficient percentages towards predicted outcome
  # ridgePipe = Pipeline(steps=[('scl', StandardScaler()),('ridge', Ridge(alpha=157.48999999999864))])

  ridgePipe = Pipeline(steps=[('ridge', Ridge(alpha=157.48999999999864))])

  # fit the model on training data
  ridgePipe.fit(X, y)

  # serialize model and save in serialized_model directory
  serialiaze_mod(ridgePipe)

# function to serialize model
def serialiaze_mod(model):
  pickle.dump(model, open('./serialized_model/scrabbleRatingModel.pkl', 'wb'))


# invoke read_in_csv_and_fit_model if regressionModel.py is executed
if __name__ == '__main__':
  read_in_csv_and_fit_model()
