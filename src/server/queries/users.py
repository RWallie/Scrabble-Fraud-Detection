from sqlalchemy import create_engine

def query_user_rating(user) -> list:
  path = 'src/database/scrabble.db'

  sql_query = """
  SELECT rating
  FROM users
  WHERE username = ?;
  """

  engine = create_engine(f'sqlite:///{path}')


  with engine.connect() as connection:
    results = connection.execute(sql_query, (user,)).fetchall()

  return results