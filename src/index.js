import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// アプリをオフラインで動作させてより速くロードしたい場合は、以下で unregister() を
// register() に変更できます。これにはいくつかの落とし穴があります。
// サービスワーカーの詳細: https://bit.ly/CRA-PWA

serviceWorker.unregister();
