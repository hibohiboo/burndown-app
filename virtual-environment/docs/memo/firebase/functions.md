### リージョン

* 以下のように、関数定義でパラメータを渡さないとus-central1のリージョンで実行される

```js
exports.myStorageFunction = functions
    .region('asia-northeast1')
```

### 削除したいとき
* 関数のないファイルをデプロイすると削除される。消してよいか訊かれるので`y`を選択。


### 環境変数にFunctionsで使用する環境変数の登録（初回のみ）

```
echo "export FIRE_FUNC_BOARD_ID=hogehoge" >> ~/.bashrc
echo "export FIRE_FUNC_PASS=fuga" >> ~/.bashrc
source ~/.bashrc
echo $FIRE_FUNC_BOARD_ID
echo $FIRE_FUNC_PASS
```

#### 環境変数名には大文字使えないので注意
Invalid config name api.boardId, cannot use upper case.

### functionsのデプロイ

```
./bin/functions-deploy.sh
```

### 確認

```
curl -X POST -H "Content-Type: application/json" -d '{"boardId":"hogehoge", "pass":"100"}' https://asia-northeast1-hoge.cloudfunctions.net/validBoardPass
```

### びびらない

* クレカ登録してないと以下がでるけど、まぁ、動くので気にしない。

```
External network is not accessible and quotas are severely limited. Configure billing account to remove these restrictions
```
(請求先アカウントが設定されていません。 外部ネットワークにはアクセスできず、クォータも厳しく制限されています。 これらの制限を削除するには、請求先アカウントを設定してください。)

## 参考
[Cloud Functions のロケーション](https://firebase.google.com/docs/functions/locations?hl=ja)
[HTTP リクエスト経由で関数を呼び出す](https://firebase.google.com/docs/functions/http-events?hl=ja)
[Firebase で Cloud Functions を簡単にはじめよう](https://qiita.com/tdkn/items/2ed2b01f2656fc50da8c)
