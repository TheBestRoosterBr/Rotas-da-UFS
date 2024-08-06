# pull base image (graph-tool 🤮)
FROM pbaumgartner/graph-tool-pip

# set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

ENV APP_USER=backend
ENV APP_DIR=/opt/app

# set work directory
WORKDIR ${APP_DIR}

# update pip and install dependencies
RUN pip install --upgrade pip
RUN --mount=source=./requirements.txt,target=/tmp/requirements.txt \
    pip install -r /tmp/requirements.txt

# copy project source to container
COPY . ${APP_DIR}

# create user
RUN groupadd ${APP_USER} && useradd -g ${APP_USER} ${APP_USER}

# setup project owner and permissions
RUN chown -R ${APP_USER}:${APP_USER} ${APP_DIR}
RUN chmod -R u=rwx,g=rwx ${APP_DIR}

# change container user
USER ${APP_USER}

