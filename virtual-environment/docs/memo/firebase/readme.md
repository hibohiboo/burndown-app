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

## 参考
[function 環境変数](https://medium.com/google-cloud-jp/firebase-functions-%E3%81%AB%E7%92%B0%E5%A2%83%E5%A4%89%E6%95%B0%E3%82%92%E8%A8%AD%E5%AE%9A%E3%81%97%E3%81%A6%E3%81%BF%E3%82%8B-50ce701b2f3f)