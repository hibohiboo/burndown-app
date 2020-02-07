## 認証
### Google認証の設定手順
#### firebase上で行うこと
* Authentication > ログイン方法
* ログインプロバイダの「Google」をクリック
* プロジェクトのサポートメールが設定されていないと、有効にできない
  * [プロジェクトの設定] をクリック
  * サポートメールを設定する
  * この画面に表示されている「プロジェクトID」と「ウェブAPIキー」は、後で使用するためメモしておく
* Authentication > ログイン方法 > ログインプロバイダ > Google を有効にする

#### ソースで行うこと
* .env-sampleを.envにリネーム
* .envの環境変数を埋める。
  * REACT_APP_FIREBSE_PROJECT_ID「プロジェクトの設定 > 全般 > プロジェクトID」
  * REACT_APP_FIREBSE_API_KEY「プロジェクトの設定 > 全般 > ウェブAPIキー」
  * REACT_APP_FIREBSE_AUTH_DOMAIN 「Hosting > ダッシュボード > ドメイン」

## firestore

### firestoreの使用開始

* コンソールにログインする
* データベースの使用開始から、firestoreを選択
* ルールを選択する。
* ロケーションを選択する。後から変更不可。東京は「asia-northeast1」

### ルールのデプロイ

* テストが終わって運用するときには、セキュリティ対策を行う必要がある。

```
./bin/rules_update.sh
```


## 参考

[JavaScript で Google ログインを使用して認証する](https://firebase.google.com/docs/auth/web/google-signin?hl=ja)
[Cloud Firestore セキュリティ ルールを使ってみる](https://firebase.google.com/docs/firestore/security/get-started?hl=ja)
[Cloud Functions のロケーション](https://firebase.google.com/docs/functions/locations?hl=ja)
[firebase-functions-に環境変数を設定してみる](https://medium.com/google-cloud-jp/firebase-functions-%E3%81%AB%E7%92%B0%E5%A2%83%E5%A4%89%E6%95%B0%E3%82%92%E8%A8%AD%E5%AE%9A%E3%81%97%E3%81%A6%E3%81%BF%E3%82%8B-50ce701b2f3f)