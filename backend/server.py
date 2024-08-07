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
    elif SERVER_RUN == 'prod':
        SERVER_HOST = os.environ.get('SERVER_HOST', default='127.0.0.1')
    else:
        return

    # API
    api = create_app(None)

    if SERVER_RUN == 'dev':
        api.run(host=SERVER_HOST, port=cast(int, SERVER_PORT), debug=True)
    elif SERVER_RUN == 'prod':
        from multiprocessing import cpu_count
        from gunicorn.app.base import BaseApplication

        class GunicornApp(BaseApplication):
            def __init__(self, app, options=None):
                self.options = options or {}
                self.app = app

                super().__init__()

            def load_config(self):
                for key, value in self.options.items():
                    if key in self.cfg.settings and value is not None:
                        self.cfg.set(key.lower(), value)

            def load(self):
                return self.app

        GunicornApp(api, {
            'bind': f'{SERVER_HOST}:{SERVER_PORT}',
            'workers': (cpu_count() * 1) + 1,
        }).run()
    else:
        return


if __name__ == '__main__':
    main()

