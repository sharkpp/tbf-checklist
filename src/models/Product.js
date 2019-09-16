"use struct";

const EventEmitter = require('events');

const Endpoint = 'https://cors-anywhere.herokuapp.com/https://techbookfest.org/api';

export default class ProductModel {

  constructor() {

    // イベント通知
    this._event = new EventEmitter();

    // 保持している情報
    this._store = {
      orderBy: {
        seq: {},
      },
      products: {}, // サークルIDをキーにして収納された本の情報
    };
  }

  // 製品を要求
  request(options) {
    options = options || {};
    options.circleId = options.circleId || null;

    const eventId = 'tbf07';
    let reqUrls = [];
    let reqProductList = false;

    if (options.circleId) {
      reqUrls.push(`${Endpoint}/product?circleExhibitInfoID=${options.circleId}&limit=100`);
    }
    else {
      return;
    }

    // 情報を要求
    const req = () => {
      const reqUrl = reqUrls.shift();
      if (!reqUrl) { // 取得完了
        if (reqProductList) { console.log('ProductModel request comp!');
          this._waitProductList = false;
        }
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

          console.log('ProductModel request',data);

          for (let i = 0, productInfo; productInfo = data.list[i]; ++i) {
            // サークル情報更新
            const circleId = productInfo.circleExhibitInfoID;
            this._store.products[circleId] = this._store.products[circleId] || {};
            this._store.products[circleId][productInfo.id] = productInfo;
            this._store.orderBy.seq[circleId] = this._store.orderBy.seq[circleId] || [];
            this._store.orderBy.seq[circleId][productInfo.seq-1] = productInfo.id;
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

  // 通知を登録
  on(name, listner) {
    this._event.on(name, listner);
  }

  // 通知を解除
  off(name, listner) {
    this._event.removeListener(name, listner);
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

  // 前の製品を取得
  getPrevSiblings(circleId, productId) {
    const products   = this._store.products[circleId];
    const orderBySeq = this._store.orderBy.seq[circleId];
    const indexBySeq = orderBySeq && orderBySeq.indexOf(productId);
    return orderBySeq && products[orderBySeq[indexBySeq - 1]] || false;
  }

  // 次の製品を取得
  getNextSiblings(circleId, productId) {
    const products   = this._store.products[circleId];
    const orderBySeq = this._store.orderBy.seq[circleId];
    const indexBySeq = orderBySeq && orderBySeq.indexOf(productId);console.log('getNextSiblings',orderBySeq,products);
    return orderBySeq && products[orderBySeq[indexBySeq + 1]] || false;
  }

}
