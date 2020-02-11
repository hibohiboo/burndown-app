import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import * as serviceWorker from './serviceWorker';
import App from './components/App';
import store from './store';
import userModule from './modules/userModule';
import { loginUi, auth } from './firebase';
library.add(fab, fas, far);

const init = (uid: string) => {
  store.dispatch(userModule.actions.setUser({ uid, authed: false, board: '' }));
  render(
    <Provider store={store}>
      <App />
    </Provider>
    ,
    document.getElementById('root'),
  );
}

// 認証済かチェック
auth.onAuthStateChanged((payload) => {
  if (!payload) {
    loginUi(auth);
    return;
  }
  const { uid } = payload;

  // 認証していたらレンダリング
  init(uid);
});


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
