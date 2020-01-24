## デプロイ手順

### 仮想環境にログイン

```
vagrant up
vagrant ssh
```

### firebasetoolのフォルダに移動

```
cd /vagrant/virtual-environment/firebase/
```

### コンテナの作成(初回のみ)

```
./bin/container_build.sh
```

### ログイン情報の取得(初回のみ)

```
./bin/login-token-generate.sh
```

* 取得したトークンを`/vagrant/virtual-environment/firebase/docker/.env`ファイルに記述

```
FIREBASE_TOKEN=取得したトークン
```

### 環境変数にプロジェクト名の登録（初回のみ）

```
echo "export FIREBASE_PROJECT_NAME=hogehoge" >> ~/.bashrc
source ~/.bashrc
echo $FIREBASE_PROJECT_NAME
```


### デプロイ

```
./bin/deploy.sh
```

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