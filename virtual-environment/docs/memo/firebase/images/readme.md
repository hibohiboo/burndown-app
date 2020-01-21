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
