"use struct";

const EventEmitter = require('events');

const KeyLocalStorage = 'favorite';

const eventId = 'tbf07';

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

  setFavorite(circleId, productId) { console.log('setFavorite', circleId, productId);
    if (circleId) {
      this._store[eventId] = this._store[eventId] || {};
      this._store[eventId][circleId] = this._store[eventId][circleId] || { 'circle': null };
      const key = productId ? productId : 'circle';
      const updated = true !== this._store[eventId][circleId][key];
      this._store[eventId][circleId][key] = true;
      if (updated) {
        localStorage.setItem(KeyLocalStorage, JSON.stringify(this._store));
        this._event.emit('change', { circleId: circleId, productId: productId, favorite: true });
      }
    }
  }

  unsetFavorite(circleId, productId) { console.log('unsetFavorite', circleId, productId);
    if (circleId) {
      this._store[eventId] = this._store[eventId] || {};
      this._store[eventId][circleId] = this._store[eventId][circleId] || { 'circle': null };
      const key = productId ? productId : 'circle';
      const updated = true === this._store[eventId][circleId][key];
      delete this._store[eventId][circleId][key];
      if (updated) {
        localStorage.setItem(KeyLocalStorage, JSON.stringify(this._store));
        this._event.emit('change', { circleId: circleId, productId: productId, favorite: false });
      }
    }
  }

}
