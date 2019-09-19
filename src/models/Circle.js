"use struct";

const EventEmitter = require('events');

const BoothToken = /^(.+?)([0-9]+)(.*)$/; // 配置を、種別、番号、フロア に分割するための正規表現

const KeyLocalStorageOld = 'circle-cache';
const KeyLocalStoragePrefix = 'c:';

// 配置を順番に
function booth2order(booth) {
  const spaceToken = [].concat(BoothToken.exec(booth)||['',0,'']).slice(1);
  const spaceCategory = spaceToken[0].codePointAt(0);
  return (
    0x3041 <= spaceCategory && spaceCategory <= 0x3093
      ? spaceCategory - 0x3041 + 10
      : ['運','協'].indexOf(spaceToken[0])
  ) * 1000 + +spaceToken[1];
}

export default class CircleModel {

  constructor() {

    // イベント通知
    this._event = new EventEmitter();

    this._waitRequest = {};
    this._waitRequestList = false;

    // 保持している情報
    this._store = this._getDefault();

    // 古いキャッシュを削除
    sessionStorage.removeItem(KeyLocalStorageOld);

    // セッションからの復帰
    for (let i = 0; i < sessionStorage.length; i++) {
      try {
        const key = sessionStorage.key(i);
        if (KeyLocalStoragePrefix === key.substr(0, KeyLocalStoragePrefix.length)) {
          let circleInfo = JSON.parse(sessionStorage.getItem(key));
          if (circleInfo && circleInfo.id) {
            this._updateCircle(circleInfo, true);
          }
        }
      }
      catch (e) {}
    }
    this._store.orderBy.booth = this._store.orderBy.booth.sort((a, b) => {
      // 運＜協＜あ〜
      const spaceOrderA = booth2order(a);
      const spaceOrderB = booth2order(b);
      return spaceOrderA - spaceOrderB;
    });
  }

  _getDefault() {
    return {
      loadCompleted: false,
      orderBy: {
        booth: [], // 配置順
      },
      lookupBy: {
        booth: {}, // 配置をキーにサークルIDを引く
      },
      circles: {}, // サークルIDをキーにして収納されたサークルの情報
    };
  }

  _updateCircle(circleInfo, noSave) {
    // サークル情報更新
    delete circleInfo.event;
    delete circleInfo.eventExhibitCourse;
    this._store.circles[circleInfo.id] = circleInfo;
    // 配置からサークルIdを引くための情報を更新
    for (let j = 0, space; undefined !== (space = circleInfo.spaces[j]); ++j) {
      this._store.lookupBy.booth[space] = circleInfo.id;
      if (this._store.orderBy.booth.indexOf(space) < 0) {
        this._store.orderBy.booth.push(space);
      }
    }
    if (!noSave) {
      sessionStorage.setItem(
        KeyLocalStoragePrefix+circleInfo.id,
        JSON.stringify(circleInfo)
      );
    }
  }

  // サークルを要求
  request(options) {
  }

  // 通知を登録
  on(name, listner) {
    this._event.on(name, listner);
    if (0 <= ['change','loaded'].indexOf(name) &&
        false === this._waitRequestList) {
      listner(name);
    }
  }

  // 通知を解除
  off(name, listner) {
    this._event.removeListener(name, listner);
  }

  getCircleListOrderByBooth() {
    return (this._store.orderBy.booth||[]).map((boothNo) => {
      const circleInfo = this.getCircleByBooth(boothNo) || {};
      return circleInfo.id;
    });
  }

  // サークル情報を配置から取得
  getCircleByBooth(boothNo) {
    return this._store.circles[
      this._store.lookupBy.booth[
        boothNo
      ]
    ];
  }

  // サークル情報を配置から取得
  getCircleBoothOrder(circleId) {
    if (false !== this._waitRequestList) {
      return -2;
    }
    return this._store.orderBy.booth.indexOf(((this._store.circles[circleId]||{}).spaces||[])[0]);
  }

  // サークルを取得
  getCircle(circleId) {
    return this._store.circles[circleId];
  }

  // 配置の一番最初を取得
  getFirstBooth() {
    return (
      false === this._waitRequestList &&
      this.getCircleByBooth(this._store.orderBy.booth[0])
    );
  }

  // 配置の一番最後を取得
  getLastBooth() {
    return (
      false === this._waitRequestList &&
      this.getCircleByBooth(this._store.orderBy.booth[this._store.orderBy.booth.length - 1])
    );
  }

  // 前のサークルがあるか？
  hasPrevCircle(circleId) {
    const circleInfo = this._store.circles[circleId];
    return !!(circleInfo && circleInfo.prevCircleExhibitInfoID);
  }

  // 次のサークルがあるか？
  hasNextCircle(circleId) {
    const circleInfo = this._store.circles[circleId];
    return !!(circleInfo && circleInfo.nextCircleExhibitInfoID);
  }

  // 前のサークルを取得
  getPrevCircle(circleId) {
    const circleInfo = this._store.circles[circleId];
    return circleInfo && circleInfo.prevCircleExhibitInfoID && this._store.circles[circleInfo.prevCircleExhibitInfoID];
  }

  // 次のサークルを取得
  getNextCircle(circleId) {
    const circleInfo = this._store.circles[circleId];
    return circleInfo && circleInfo.nextCircleExhibitInfoID && this._store.circles[circleInfo.nextCircleExhibitInfoID];
  }

  // 前のサークルを取得
  getPrevCircleId(circleId) {
    const circleInfo = this._store.circles[circleId];
    return circleInfo && circleInfo.prevCircleExhibitInfoID;
  }

  // 次のサークルを取得
  getNextCircleId(circleId) {
    const circleInfo = this._store.circles[circleId];
    return circleInfo && circleInfo.nextCircleExhibitInfoID;
  }

  mergeFavorite(favList) {
    let reqList = {};
    favList.forEach(favItem => {
      if (favItem.circleId) {
        const circleInfo = this._store.circles[favItem.circleId];
        if (!circleInfo) {
          favItem.circleName  = favItem.circleId;
            reqList[favItem.circleId] = true;
          return;
        }
        favItem.space       = circleInfo.spaces[0];
        favItem.circleName  = circleInfo.name;
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
