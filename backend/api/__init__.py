import importlib
import os
import os.path

from flask import Flask, Blueprint


def create_app(test_config):
    app = Flask(__name__.split('.')[0], instance_relative_config=True)

    # Load configurations
    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    # Create instance directory
    try:
        os.mkdir(app.instance_path)
    except OSError:
        pass


    # Bootstrap section
    bootstrap_routes(app)

    return app

def bootstrap_routes(app):
    api = Blueprint('api', __name__)

    routes_root = os.path.join(app.root_path, 'routes')
    for route_file in os.listdir(routes_root):
        if route_file.startswith('__') \
                or not route_file.endswith('.py'):
            continue

        # Removes .py extension
        route_name = route_file.strip('.py')

        # Dynamic import the route
        module_name = f'.routes.{route_name}'
        module = importlib.import_module(
            module_name, __package__
        )

        if 'router' in module.__dict__:
            # Try to register the route <route_name>_bp
            api.register_blueprint(module.__dict__['router'])
        else:
            print(f'Route {route_name} for {module_name} not found!')

    app.register_blueprint(api, url_prefix='/api')

