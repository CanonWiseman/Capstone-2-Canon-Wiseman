
CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL
);

CREATE TABLE games (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL
);

CREATE TABLE gamesWishlist (
  username VARCHAR(25)
    REFERENCES users ON DELETE CASCADE,
  game_id INTEGER
    REFERENCES games ON DELETE CASCADE,
  PRIMARY KEY (username, game_id)
);
