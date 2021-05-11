# Build steps
# specify the node base image with your desired version node:<version>
FROM node:12 AS react
COPY frontend ./
RUN npm ci
RUN npm run build

FROM node:12 AS release
COPY api ./
RUN npm ci
# deploy react app from express 
COPY --from=react ./build ./build
CMD [ "node", "index.js" ]
# replace this with your application's default port
EXPOSE 5000
