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
    SERVER_RUN = os.environ.get('BACKEND_RUN', default='dev')
    SERVER_PORT = os.environ.get('BACKEND_PORT', default=5000)

    # API
    api = create_app(None)

    if SERVER_RUN == 'dev':
        api.run(host='0.0.0.0', port=cast(int, SERVER_PORT), debug=True)
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
            'bind': f'0.0.0.0:{SERVER_PORT}',
            'workers': (cpu_count() * 1) + 1,
        }).run()
    else:
        return


if __name__ == '__main__':
    main()

