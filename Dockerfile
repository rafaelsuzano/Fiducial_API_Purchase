FROM cypress/included:12.17.1 

RUN useradd -m bot
USER bot
RUN apt-get update &&apt-get install -y python3 && apt-get install -y python3-pip && pip install trcli
RUN apt-get update && apt-get install -y junitparser
RUN apt-get update && apt-get install -y python-is-python3

RUN pip install junitparser
WORKDIR /app
RUN cd /app

COPY . .
RUN npx cypress install --force

ENTRYPOINT ["npm","run", "teste:Ventes_Achats"]
