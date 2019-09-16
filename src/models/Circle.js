"use struct";

const EventEmitter = require('events');

const Endpoint = 'https://cors-anywhere.herokuapp.com/https://techbookfest.org/api';

const BoothToken = /^(.+?)([0-9]+)(.*)$/;

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

    // 保持している情報
    this._store = {
      orderBy: {
        booth: [], // 配置順
      },
      lookupBy: {
        booth: {}, // 配置をキーにサークルIDを引く
      },
      circles: {}, // サークルIDをキーにして収納されたサークルの情報
    };

    this._waitCircleList = null;
  }

  // サークルを要求
  request(options) {
    options = options || {};
    options.circleId = options.circleId || null;

    const eventId = 'tbf07';
    let reqUrls = [];
    let reqCircleList = false;

    if (options.circleId) {
      reqUrls.push(`${Endpoint}/circle/${options.circleId}`);
    }
    else {
      this._waitCircleList = reqCircleList = true;
      reqUrls.push(`${Endpoint}/circle?eventID=${eventId}&eventExhibitCourseID=3&visibility=site&limit=100&onlyAdoption=true`);
    //  reqUrls.push(`${Endpoint}/circle?eventID=${eventId}&visibility=site&limit=100&onlyAdoption=true`);
    }

    // 情報を要求
    const req = () => {
      const reqUrl = reqUrls.shift();
      if (!reqUrl) { // 取得完了
        if (reqCircleList) { console.log('CircleModel request comp!');
          this._waitCircleList = false;
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

          console.log('CircleModel request',data);

          if (!data.list) {
            const circleInfo = data;
            // サークル情報更新
            this._store.circles[circleInfo.id] = circleInfo;
            // 配置からサークルIdを引くための情報を更新
            for (let j = 0, space; space = circleInfo.spaces[j]; ++j) {
              this._store.lookupBy.booth[space] = circleInfo.id;
              if (this._store.orderBy.booth.indexOf(space) < 0) {
                this._store.orderBy.booth.push(space);
              }
            }
          }
          else {
            for (let i = 0, circleInfo; circleInfo = data.list[i]; ++i) {
              // サークル情報更新
              this._store.circles[circleInfo.id] = circleInfo;
              // 配置からサークルIdを引くための情報を更新
              for (let j = 0, space; space = circleInfo.spaces[j]; ++j) {
                this._store.lookupBy.booth[space] = circleInfo.id;
                if (this._store.orderBy.booth.indexOf(space) < 0) {
                  this._store.orderBy.booth.push(space);
                }
              }
            }
          }

          this._store.orderBy.booth = this._store.orderBy.booth.sort((a, b) => {
            // 運＜協＜あ〜
            const spaceOrderA = booth2order(a);
            const spaceOrderB = booth2order(b);
            return spaceOrderA - spaceOrderB;
          });
          
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
    if (0 <= ['change','loaded'].indexOf(name) &&
        false === this._waitCircleList) {
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
    if (false !== this._waitCircleList) {
      return -2;
    }
    return this._store.orderBy.booth.indexOf(((this._store.circles[circleId]||{}).spaces||[])[0]);
  }

  // サークルを取得
  getCircle(circleId) {
    return false === this._waitCircleList && this._store.circles[circleId];
  }

  // 配置の一番最初を取得
  getFirstBooth() {
    return (
      false === this._waitCircleList &&
      this.getCircleByBooth(this._store.orderBy.booth[0])
    );
  }

  // 配置の一番最後を取得
  getLastBooth() {
    return (
      false === this._waitCircleList &&
      this.getCircleByBooth(this._store.orderBy.booth[this._store.orderBy.booth.length - 1])
    );
  }

  // 前のサークルを取得
  getPrevSiblingsBooth(circleId) {
    const circleInfo = this._store.circles[circleId];
    const boothNo = ((circleInfo||{}).spaces||[])[0]; // ToDo:配置が複数あり連続していない場合は... ループしそう...
    const orderIndex = this._store.orderBy.booth.indexOf(boothNo);
    return false === this._waitCircleList && this.getCircleByBooth(this._store.orderBy.booth[orderIndex - 1]);
  }

  // 次のサークルを取得
  getNextSiblingsBooth(circleId) {
    const circleInfo = this._store.circles[circleId];
    const boothNo = ((circleInfo||{}).spaces||[])[0]; // ToDo:配置が複数あり連続していない場合は... ループしそう...
    const orderIndex = this._store.orderBy.booth.indexOf(boothNo);
    return false === this._waitCircleList && this.getCircleByBooth(this._store.orderBy.booth[orderIndex + 1]);
  }
}
