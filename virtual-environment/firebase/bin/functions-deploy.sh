#!/bin/bash

bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$(cd $bin_dir/.. && pwd)
docker_dir=$(cd $parent_dir/docker && pwd)
container_name=firebase-functions
project_name="$FIREBASE_PROJECT_NAME"

# functionsデプロイ
cd $docker_dir && docker-compose run $container_name firebase deploy --token "$FIREBASE_TOKEN" --only functions --project $project_name

# 環境変数設定
cd $docker_dir && docker-compose run $container_name firebase functions:config:set api.board_id="$FIRE_FUNC_BOARD_ID" --token "$FIREBASE_TOKEN" --project $project_name
cd $docker_dir && docker-compose run $container_name firebase functions:config:set api.pass="$FIRE_FUNC_PASS" --token "$FIREBASE_TOKEN" --project $project_name

# 環境変数確認
cd $docker_dir && docker-compose run $container_name firebase functions:config:get --token "$FIREBASE_TOKEN" --project $project_name

