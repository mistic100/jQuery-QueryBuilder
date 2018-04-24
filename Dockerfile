FROM node:5

RUN npm install -g grunt-cli bower

WORKDIR /opt/querybuilder
ADD package.json bower.json /opt/querybuilder/
RUN npm install && bower install --allow-root

ADD . /opt/querybuilder

ENTRYPOINT ["grunt", "test", "default"]
