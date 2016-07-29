FROM nodesource/node:4.3.2
ADD package.json package.json  
RUN npm install

COPY app.yaml /
COPY index.js /  
COPY api /api
COPY controllers /controllers
COPY *.jsz /

CMD ["node","."] 

