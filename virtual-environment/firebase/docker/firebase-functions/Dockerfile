# https://firebase.google.com/docs/functions/get-started?authuser=0
# firebase cloud function はv8で動作
FROM node:12.14.1-alpine

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
RUN npm init -y

# firebase
RUN yarn global add firebase-tools
RUN yarn add --dev firebase-tools

RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"firebase\": \"firebase\", /g" /app/package.json

## functions
RUN mkdir -p /app/functions
RUN cd /app/functions && npm init -y
RUN cd /app/functions &&  yarn add firebase-admin
RUN cd /app/functions &&  yarn add firebase-functions
RUN cd /app/functions &&  yarn add --dev eslint
RUN cd /app/functions &&  yarn add --dev eslint-plugin-promise
RUN cd /app/functions &&  yarn add --dev firebase-functions-test
RUN rm /app/functions/package.json
