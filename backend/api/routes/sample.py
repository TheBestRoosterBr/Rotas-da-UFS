from flask import Blueprint

router = Blueprint('sample', __name__, url_prefix='/sample')


@router.route('/')
def index():
    return '<h1>Hello World</h1>'

