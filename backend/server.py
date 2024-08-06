import os
import os.path
from typing import cast

from dotenv import load_dotenv

from api import create_app


def main():
    # Load environment variables from .env file(s)
    if os.path.isfile('.env'):
        load_dotenv('.env')

    # Server configuration environment variables
    SERVER_RUN = os.environ.get('SERVER_RUN', default='dev')
    SERVER_PORT = os.environ.get('SERVER_PORT', default=5000)

    if SERVER_RUN == 'dev':
        # When on dev environment "listening" on all interfaces by default,
        # particularly useful when running on a container.
        SERVER_HOST = os.environ.get('SERVER_HOST', default='0.0.0.0')
    else:
        SERVER_HOST = os.environ.get('SERVER_HOST', default='127.0.0.1')

    if SERVER_RUN == 'dev':
        api = create_app(None)
        api.run(host=SERVER_HOST, port=cast(int, SERVER_PORT), debug=True)
    else:
        pass


if __name__ == '__main__':
    main()

