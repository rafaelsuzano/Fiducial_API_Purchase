FROM cypress/included:12.17.1 

RUN apt-get install python3

RUN apt-get update && apt-get install -y python3-pip 
RUN apt-get update && apt-get install -y junitparser
RUN apt-get update && apt-get install -y python-is-python3
RUN pip install trcli
RUN pip install junitparser
WORKDIR /app
RUN cd /app

COPY . .
RUN npx cypress install --force

ENTRYPOINT ["npm","run", "teste:Ventes_Achats"]
