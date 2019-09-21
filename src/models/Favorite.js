"use struct";

const EventEmitter = require('events');
const FileDownload = require('js-file-download');

const KeyLocalStorage = 'favorite';

const eventId = 'tbf07';

const KeyCircle = 'circle';

export default class FavoriteModel {

  constructor() {

    // イベント通知
    this._event = new EventEmitter();

    // 保持している情報
    this._store = JSON.parse(localStorage.getItem(KeyLocalStorage) || '{}');
  }

  // 通知を登録
  on(name, listner) {
    this._event.on(name, listner);
  }

  // 通知を解除
  off(name, listner) {
    this._event.removeListener(name, listner);
  }

  isFavorite(circleId, productId) {
    return !!(productId
      ? (this._store[eventId] && this._store[eventId][circleId] && this._store[eventId][circleId][productId])
      : (this._store[eventId] && this._store[eventId][circleId] && this._store[eventId][circleId]['circle'])
    );
  }

  setFavorite(circleId, productId) { //console.log('setFavorite', circleId, productId);
    if (circleId) {
      this._store[eventId] = this._store[eventId] || {};
      this._store[eventId][circleId] = this._store[eventId][circleId] || { [KeyCircle]: null };
      const key = productId ? productId : KeyCircle;
      const updated = true !== this._store[eventId][circleId][key];
      this._store[eventId][circleId][key] = true;
      if (updated) {
        localStorage.setItem(KeyLocalStorage, JSON.stringify(this._store));
        this._event.emit('change', { circleId: circleId, productId: productId, favorite: true });
      }
    }
  }

  unsetFavorite(circleId, productId) { //console.log('unsetFavorite', circleId, productId);
    if (circleId) {
      this._store[eventId] = this._store[eventId] || {};
      this._store[eventId][circleId] = this._store[eventId][circleId] || { [KeyCircle]: null };
      const key = productId ? productId : KeyCircle;
      const updated = true === this._store[eventId][circleId][key];
      delete this._store[eventId][circleId][key];
      if (updated) {
        localStorage.setItem(KeyLocalStorage, JSON.stringify(this._store));
        this._event.emit('change', { circleId: circleId, productId: productId, favorite: false });
      }
    }
  }

  export() {
    FileDownload(JSON.stringify(this._store), 'favorite.json');
  }

  import(text) {
    try {
      let data = JSON.parse(text);
      // ここで内容をチェック
      this._store = data;
      localStorage.setItem(KeyLocalStorage, JSON.stringify(this._store));
      this._event.emit('change');
      return true;
    }
    catch (e) {
      console.debug(e);
      return false;
    }
  }

  list(eventId_) {

    let favList = [];
    let hasProduct = {};

    // お気に入りの一覧を取得
    const circleList = this._store[eventId_]||{};
    for (let circleId in circleList) {
      const productList = circleList[circleId]||{};
      for (let productId in productList) {
        if (productList[productId]) {
          if (KeyCircle === productId) {
            favList.push({ eventId: eventId, circleId: circleId });
          }
          else {
            favList.push({ eventId: eventId, circleId: circleId });
            favList.push({ eventId: eventId, circleId: circleId, productId: productId });
            hasProduct[circleId] = true;
          }
        }
      }
    }
    // 頒布物をチェックしている場合はサークルのお気に入りをリストから除く
    let foundCircle = {};
    favList = favList.reduce((r, favItem) => {
      if (!favItem.productId) {
        if (!foundCircle[favItem.circleId]) {
          foundCircle[favItem.circleId] = true;
          r.push(favItem);
        }
      }
      else {
        r.push(favItem);
      }
      return r;
    }, []);

    return favList;
  }

}
