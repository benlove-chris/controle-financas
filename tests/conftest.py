import  pytest 
from application import app

@pytest.fixture(scope="module")
def app():
    yield app


@pytest.fixture(scope="module")
def client(app):
    return app.test_client()
