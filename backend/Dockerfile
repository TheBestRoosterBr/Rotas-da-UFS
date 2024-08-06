# pull base image (graph-tool 🤮)
FROM pbaumgartner/graph-tool-pip

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

ENV USER flask
ENV WORKDIR /opt/app

# set work directory
WORKDIR ${WORKDIR}

# update pip and install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt

# copy project source to container
COPY . /opt/app

# create user
RUN groupadd ${USER} && useradd -g ${USER} ${USER}

# setup project owner and permissions
RUN chown -R ${USER}:${USER} ${WORKDIR}
RUN chmod -R u=rwx,g=rwx ${WORKDIR}

# change container user
USER ${USER}

