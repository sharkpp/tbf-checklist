"use struct";

const EventEmitter = require('events');

const KeyLocalStoragePrefix = 'p:';

export default class ProductModel {

  constructor() {

    // イベント通知
    this._event = new EventEmitter();

    // 保持している情報
    this._store = this._getDefault();
    this._reqWait = {};

    // セッションからの復帰
    for (let i = 0; i < sessionStorage.length; i++) {
      try {
        const key = sessionStorage.key(i);
        if (KeyLocalStoragePrefix === key.substr(0, KeyLocalStoragePrefix.length)) {
          let productInfo = JSON.parse(sessionStorage.getItem(key));
          if (productInfo && productInfo.id) {
            this._updateCircle(productInfo, true);
          }
        }
      }
      catch (e) {}
    }
  }

  // 製品を要求
  request(options) {
  }

  _getDefault() {
    return {
      orderBy: {
        seq: {},
      },
      products: {}, // サークルIDをキーにして収納された本の情報
    };
  }

  _updateCircle(productInfo, noSave) {
    // サークル情報更新
    const circleId = productInfo.circleExhibitInfoID;
    this._store.products[circleId] = this._store.products[circleId] || {};
    this._store.products[circleId][productInfo.id] = productInfo;
    this._store.orderBy.seq[circleId] = this._store.orderBy.seq[circleId] || [];
    this._store.orderBy.seq[circleId][productInfo.seq-1] = productInfo.id;
    if (!noSave) {
      sessionStorage.setItem(
        KeyLocalStoragePrefix+productInfo.id,
        JSON.stringify(productInfo)
      );
    }
  }

  // 通知を登録
  on(name, listner) {
    this._event.on(name, listner);
  }

  // 通知を解除
  off(name, listner) {
    this._event.removeListener(name, listner);
  }

  // 製品を取得
  getProductOrder(circleId, productId) {
    const orderBySeq = this._store.orderBy.seq[circleId] || [];
    return orderBySeq ? orderBySeq.indexOf(productId) : -1;
  }

  // 製品を取得
  getProductList(circleId) {
    const products = this._store.products[circleId];
    return products && Object.keys(products);
  }

  // 製品を取得
  getProductByIndex(circleId, index) {
    const products   = this._store.products[circleId] || {};
    const orderBySeq = this._store.orderBy.seq[circleId] || [];
    return products[orderBySeq[index]] || false;
  }

  // 製品を取得
  getProduct(circleId, productId) {
    const product = (this._store.products[circleId] || {})[productId] || false;
    return product;
  }

  // 製品を取得
  getProductCount(circleId) {
    const orderBySeq = this._store.orderBy.seq[circleId];
    return orderBySeq ? orderBySeq.length : -1;
  }

  // 次の製品を取得
  hasNextProduct(circleId, productId) {
    const orderBySeq = this._store.orderBy.seq[circleId];
    const indexBySeq = orderBySeq && orderBySeq.indexOf(productId);
    return !!(orderBySeq && orderBySeq[indexBySeq + 1]);
  }

  // 前の製品を取得
  getPrevSiblings(circleId, productId) {
    const products   = this._store.products[circleId];
    const orderBySeq = this._store.orderBy.seq[circleId];
    const indexBySeq = orderBySeq && orderBySeq.indexOf(productId);
    return (orderBySeq && products[orderBySeq[indexBySeq - 1]]) || false;
  }

  // 次の製品を取得
  getNextSiblings(circleId, productId) {
    const products   = this._store.products[circleId];
    const orderBySeq = this._store.orderBy.seq[circleId];
    const indexBySeq = orderBySeq && orderBySeq.indexOf(productId);
    return (orderBySeq && products[orderBySeq[indexBySeq + 1]]) || false;
  }

  mergeFavorite(favList) {
    let reqList = {};
    favList.forEach(favItem => {
      if (favItem.circleId && favItem.productId) {
        const productInfo = (this._store.products[favItem.circleId]||{})[favItem.productId];
        if (!productInfo) {
          favItem.productName = favItem.productId;
          reqList[favItem.circleId] = true;
          return;
        }
        favItem.productName  = productInfo.name;
        favItem.productPrice = productInfo.price;
      }
    });
    // 足りないものを要求
    Object.keys(reqList).forEach((circleId) => {
      this.request({ circleId });
    });
  }

  clearCache() {
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (KeyLocalStoragePrefix === key.substr(0, KeyLocalStoragePrefix.length)) {
        sessionStorage.removeItem(key);
      }
    }
    this._store = this._getDefault();
    this._event.emit('change');
  }
}
