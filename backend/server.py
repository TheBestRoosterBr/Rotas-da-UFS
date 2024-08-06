import os
from typing import cast

from api import create_app


def main():

    # Port of debug server
    SERVER_PORT = os.environ.get('SERVER_PORT', default=5000)

    api = create_app(None)
    api.run(port=cast(int, SERVER_PORT), debug=True)


if __name__ == '__main__':
    main()

