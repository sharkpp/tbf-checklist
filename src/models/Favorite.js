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

}
