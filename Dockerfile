# External build argument, passed in by --build-arg
ARG NODE_VERSION

################################ Build Stage ##################################

FROM node:${NODE_VERSION}-alpine AS builder

# Install dependencies
RUN apk add --no-cache make

# Copy the files required to build the app
COPY package*.json     \
     tsconfig.json     \
     tslint.json       \
     webpack.config.js \
     Makefile          \
     .env              \
     /app/
COPY src/ /app/src

WORKDIR /app
RUN make production-bundle

################################ Final Stage ##################################

FROM node:${NODE_VERSION}-alpine AS final

# Remove yarn
RUN rm -rf /opt/yarn*

# External build arguments, passed in by --build-arg, with defaults
ARG COMPANY_NAME=company
ARG APP_NAME=app

# Used as a local shorthand, doesn't come from --build-arg
ARG DEPLOYMENT_DIR=/opt/$COMPANY_NAME/$APP_NAME

RUN mkdir -p $DEPLOYMENT_DIR

# Copy only the necessary files from the build stage
COPY --from=builder /app/package*.json $DEPLOYMENT_DIR/
COPY --from=builder /app/build $DEPLOYMENT_DIR/build

RUN chown -R node:node $DEPLOYMENT_DIR
USER node
WORKDIR $DEPLOYMENT_DIR

 # Install only production dependencies
RUN npm ci --production

CMD ["npm", "start"]
