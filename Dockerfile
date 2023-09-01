#FROM cypress/included:12.17.1 
FROM ubuntu:22.04



RUN groupadd -r regular-users && useradd -m -r -g regular-users person

RUN apt-get update 
RUN apt install -y curl
RUN apt-get update
RUN apt-get install -y ca-certificates curl gnupg
RUN mkdir -p /etc/apt/keyrings
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key |  gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_18.x nodistro main" |  tee /etc/apt/sources.list.d/nodesource.list
RUN apt-get update 
RUN apt install -y nodejs -y
RUN apt install -y xvfb
RUN apt-get install -y python3 
RUN apt-get install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
RUN apt-get install -y python-pip
RUN curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
RUN apt-get update && apt-get install -y junitparser
RUN apt-get update && apt-get install -y python-is-python3
RUN python get-pip.py
RUN pip install trcli
RUN pip install junitparser
RUN npm cache clean --force 

WORKDIR /app

RUN chown -R person  /app

USER person
RUN cd /app

COPY . .
#RUN npx cypress install --force

#ENTRYPOINT ["npm","run", "teste:Ventes_Achats"]
