"use struct";

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CircleModel from './models/Circle';
import App from './App';
import * as serviceWorker from './serviceWorker';

const models = {
  circle: new CircleModel()
};

models.circle.request();

ReactDOM.render(
  <App models={models} />,
  document.getElementById('root')
);

// アプリをオフラインで動作させてより速くロードしたい場合は、以下で unregister() を
// register() に変更できます。これにはいくつかの落とし穴があります。
// サービスワーカーの詳細: https://bit.ly/CRA-PWA

serviceWorker.unregister();

// 要求スペック
//   config#onUpdate(registration);
//   config#onSuccess(registration);
// serviceWorker.register(config);
