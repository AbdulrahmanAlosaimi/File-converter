FROM node:16.14.2

WORKDIR /app

COPY ./package*.json /app/
COPY ./. /app/

RUN apt update
RUN apt install libx11-xcb1 libxcb-dri3-0 libxtst6 libnss3 libatk-bridge2.0-0 libgtk-3-0 libxss1 libasound2 dpkg fakeroot rpm libdrm2 -y

RUN npm install

RUN npm run make

CMD [ "./run.sh" ]