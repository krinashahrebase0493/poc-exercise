FROM nikolaik/python-nodejs:latest
WORKDIR /usr/src/app
RUN pip install hestia_earth.utils
RUN pip install pandas
COPY ["package.json","./"]
RUN npm i
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/index.js"]