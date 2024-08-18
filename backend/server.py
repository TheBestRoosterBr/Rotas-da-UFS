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


def find_git_directory(start_path):
    current_path = start_path
    while current_path != os.path.dirname(current_path):
        if os.path.isdir(os.path.join(current_path, '.git')):
            return current_path
        current_path = os.path.dirname(current_path)
    return None


def install_pre_commit_hook():
    hook_code = """#!/bin/sh
if git diff --cached --name-only '*.py' | xargs grep -q 'import backend.'; then
    echo "Erro: dar commit com 'import backend.' não é permitido!"
    exit 1
fi
"""
    git_hooks_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '.git', 'hooks')
    hook_file_path = os.path.join(git_hooks_dir, 'pre-commit')

    with open(hook_file_path, 'w') as hook_file:
        hook_file.write(hook_code)

    os.chmod(hook_file_path, 0o755)

if __name__ == '__main__':
    install_pre_commit_hook()
    main()

