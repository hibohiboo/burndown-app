import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';

const uiConfig: firebaseui.auth.Config = {
  signInSuccessUrl: '/', // サインインが成功した後にユーザーをリダイレクトするURL。signInSuccessWithAuthResultがTrueの時必須
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  signInFlow: 'popup',
  tosUrl: '/agreement.html',
  privacyPolicyUrl() {
    window.location.assign('/privacy-policy.html');
  },
  callbacks: {
    signInSuccessWithAuthResult(authResult, redirectUrl) {
      // const { user } = authResult;
      // const { credential } = authResult;
      // const { isNewUser } = authResult.additionalUserInfo;
      // const { providerId } = authResult.additionalUserInfo;
      // const { operationType } = authResult;
      console.log('result', authResult);
      console.log('redirect', redirectUrl);
      return true; // true: リダイレクトする。 false: リダイレクトしない
    },
    async signInFailure(error) {
      // const handleUIError = (e: firebaseui.auth.AuthUIError) => {
      //   console.log(e);
      // };
      // return handleUIError(error); // eslint-disable-line no-undef
    },
    uiShown() {
      // document.getElementById('loader').style.display = 'none'; // The widget is rendered. Hide the loader.
    },
  },
};

const start = (auth: firebase.auth.Auth) => {
  const ui = new firebaseui.auth.AuthUI(auth); // eslint-disable-line no-undef
  ui.start('#firebaseui-auth-container', uiConfig);
};

export default start;
