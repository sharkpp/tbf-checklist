"use struct";

const EventEmitter = require('events');
const { booth2order } = require('./Circle');

const Endpoint = 'https://api-gw98.herokuapp.com/https://techbookfest.org/api';

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
    options = options || {};
    options.circleId = options.circleId || null;

    let reqUrls = [];
    let reqCircleId = options.circleId;

    if (options.circleId) {
      if (this._reqWait[options.circleId]) {
        console.debug(`request wait for ${options.circleId}`);
        return;
      }
      if (this._store.products[options.circleId]) {
        console.debug(`use cache for ${options.circleId}`);
        return;
      }
      this._reqWait[options.circleId] = true;
      reqUrls.push(`${Endpoint}/product?circleExhibitInfoID=${options.circleId}&limit=100`);
    }
    else {
      return;
    }

    // 情報を要求
    const req = () => {
      const reqUrl = reqUrls.shift();
      if (!reqUrl) { // 取得完了
        delete this._reqWait[reqCircleId];
        this._event.emit('change');
        this._event.emit('loaded');
      }
      else { // 取得継続中
        fetch(reqUrl, {
          method: 'GET'
        }).then((res) => {
          return res.json();
        }).then((data) => {
          if (data.cursor) { // 継続カーソルが存在するので次を追加
            reqUrls.unshift(`${reqUrl.replace(/&cursor=.+$/,'')}&cursor=${data.cursor}`);
          }

          //console.log('ProductModel request',data);

          if (data.list) {
            for (let i = 0, productInfo;
                undefined !== (productInfo = data.list[i]); ++i) {
              this._updateCircle(productInfo);
            }
          }

          this._event.emit('change');

          // 次を要求
          return req();
        }).catch((err) => {
          return console.error(err);
        });
      }
    };

    req();
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

  // お気に入りの情報に頒布物情報をマージする
  mergeFavorite(favList) {
    let reqList = {};
    favList.forEach(favItem => {
      if (favItem.circleId && favItem.productId) {
        const productInfo = (this._store.products[favItem.circleId]||{})[favItem.productId];
        if (!productInfo) {
          reqList[favItem.circleId] = true;
          return;
        }
        favItem.productName  = productInfo.name;
        favItem.productPrice = productInfo.price;
        favItem.seq = productInfo.seq;
      }
    });
    favList = favList.sort((a, b) => {
      if (a.circleId !== b.circleId) {
        return booth2order(a.space) - booth2order(b.space);
      }
      const seqA = a.seq||-1;
      const seqB = b.seq||-1;
      return seqA - seqB;
    }).map((favItem) => {
      delete favItem.seq;
      return favItem;
    });
    // 足りないものを要求
    setTimeout(() => {
      Object.keys(reqList).forEach((circleId) => {
        this.request({ circleId });
      });
    });
  }

  // キャッシュを削除
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
