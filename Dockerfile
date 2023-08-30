FROM cypress/included:12.17.1 

RUN apt-get install python3
#RUN apt-get install python-is-python3
#RUN apt-get install junitparser
#RUN apt-get install python3-pip

#RUN pip install trcli
WORKDIR /app
COPY . .

RUN npm install
CMD ["npm","run","npx cypress run"]
