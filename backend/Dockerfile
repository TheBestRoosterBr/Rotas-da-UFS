# pull base image
FROM debian:stable-slim

# set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

ENV APP_USER=backend
ENV APP_DIR=/opt/app

# set work directory
WORKDIR ${APP_DIR}

# install python and dependencies
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        python3-minimal \
        python3-pip \
        python3-graph-tool \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /usr/lib/python3.11/EXTERNALLY-MANAGED

# update pip and install dependencies
RUN pip install --upgrade pip
RUN --mount=source=./requirements.txt,target=/tmp/requirements.txt \
    pip install -r /tmp/requirements.txt

# copy project source to container
COPY ./api ${APP_DIR}/api
COPY ./server.py ${APP_DIR}

# create user
RUN groupadd ${APP_USER} && useradd -g ${APP_USER} ${APP_USER}

# setup project owner and permissions
RUN chown -R ${APP_USER}:${APP_USER} ${APP_DIR}
RUN chmod -R u=rwx,g=rwx ${APP_DIR}

# change container user
USER ${APP_USER}

# by default run the back-end server
CMD [ "/usr/bin/python3", "server.py" ]

