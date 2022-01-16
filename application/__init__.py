from flask import Flask

from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
app = Flask(__name__)

# configurar de dados banco
class Config:
    SECRET_KEY = '01110011 01100101 01101110 01101000 01100001 00001010'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///dados.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

app.config.from_object(Config)
db = SQLAlchemy(app)

from application.controllers import routes


CORS(app)