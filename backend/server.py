import os
from typing import cast

from dotenv import load_dotenv

from api import create_app


def main():
    # Load environment variables from .env file(s)
    load_dotenv('.env')

    if os.environ.get('SERVER_RUN', default='dev') == 'prod':
        print('This server shouldn\'t be used on production environment')
        return

    # Port of debug server
    SERVER_PORT = os.environ.get('SERVER_PORT', default=5000)

    api = create_app(None)
    api.run(port=cast(int, SERVER_PORT), debug=True)


if __name__ == '__main__':
    main()

