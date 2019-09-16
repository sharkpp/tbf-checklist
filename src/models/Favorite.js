"use struct";

const EventEmitter = require('events');

export default class FavoriteModel {

  constructor() {

    // イベント通知
    this._event = new EventEmitter();

    // 保持している情報
    this._store = {
    };
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
      ? (this._store[circleId] && this._store[circleId][productId])
      : (this._store[circleId] && this._store[circleId]['circle'])
    );
  }

  setFavorite(circleId, productId) { console.log('setFavorite', circleId, productId);
    if (circleId) {
      this._store[circleId] = this._store[circleId] || { 'circle': null };
      const key = productId ? productId : 'circle';
      const updated = true !== this._store[circleId][key];
      this._store[circleId][key] = true;
      updated && this._event.emit('change', { circleId: circleId, productId: productId, favorite: true });
    }
  }

  unsetFavorite(circleId, productId) { console.log('unsetFavorite', circleId, productId);
    if (circleId) {
      this._store[circleId] = this._store[circleId] || { 'circle': null };
      const key = productId ? productId : 'circle';
      const updated = false !== this._store[circleId][key];
      this._store[circleId][key] = false;
      updated && this._event.emit('change', { circleId: circleId, productId: productId, favorite: false });
    }
  }

}
