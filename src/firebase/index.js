import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// import ui from './ui';

// firebase使用準備
firebase.initializeApp(require('./config'));

export const db = firebase.firestore();
export const auth = firebase.auth();
// export const loginUi = ui; // Google認証は一旦やめる
export const loginUi = (a) => {
  // 匿名認証でログイン
  a.signInAnonymously().catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(`code:${errorCode} , message:${errorMessage}`);
    // ...
  });
};
export const fb = firebase;
// サインアウト時の動作確認
// auth.signOut();
