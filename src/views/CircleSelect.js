"use struct";

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, WithStore } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'

const Type2Text = {
  'fanzine':  '同人誌',
  'commerce': '商業誌',
};

// サークル表示用
function CircleCard({ circleInfo }) {
  const circleCut = circleInfo && circleInfo.circleCutImage || { url: '', width: 0, height: 1 };
  return (
    <div className='circle-card'>
      <Card >
        <Card.Header>
          <Badge variant="secondary">{(circleInfo.spaces||[])[0]}</Badge>
          {circleInfo.name||' '}
        </Card.Header>
        <div style={{ width: '100%', textAlign: 'center', marginTop: '8px' }} >
          {circleCut.url && <Card.Img
            variant="top"
            src={circleCut.url}
            style={{
              width:  circleCut.width * 200 / circleCut.height,
              height: 200,
            }}
          />}
          {!circleCut.url && <div
            style={{
              display: 'inline-block',
              width:  141,
              height: 200,
              border: '5px solid black',
              overflow: 'hidden'
            }}
          >
            <div style={{ top: '50%', position: 'relative', marginTop: '-0.5em', }}>
              NO IMAGE
            </div>
          </div>}
        </div>
        <Card.Body>
          <Card.Text>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>サークル名</Form.Label>
                <div className='form-control-plaintext' >{!circleInfo.nameRuby?circleInfo.name:`${circleInfo.name}(${circleInfo.nameRuby})`}</div>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>配置</Form.Label>
                <div className='form-control-plaintext' >{circleInfo.spaces&&circleInfo.spaces[0]||''}</div>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>ペンネーム</Form.Label>
                <div className='form-control-plaintext' >{circleInfo.penName}</div>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Webサイト</Form.Label>
                <div className='form-control-plaintext' >{circleInfo.webSiteURL}</div>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>ジャンル</Form.Label>
                <div className='form-control-plaintext' >{circleInfo.genre}</div>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>ジャンル詳細</Form.Label>
                <div className='form-control-plaintext' >{circleInfo.genreFreeFormat}</div>
              </Form.Group>
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

// 製品表示用
function ProductCard({ circleInfo, productInfo }) {
  const firstImage = productInfo && productInfo.images && productInfo.images[0] || { url: '', width: 0, height: 1 };
  return (
    <div className='product-card'>
      <Card >
        <Card.Header>
          <Badge variant="secondary">{(circleInfo.spaces||[])[0]}</Badge>
          {circleInfo.name||' '}
        </Card.Header>
        {false&&<Card.Header>
          {productInfo.name||' '}
        </Card.Header>}
        <div style={{ width: '100%', textAlign: 'center', marginTop: '8px' }} >
          {firstImage.url && <Card.Img
            variant="top"
            src={firstImage.url}
            style={{
              width:  firstImage.width * 200 / firstImage.height,
              height: 200,
            }}
          />}
        </div>
        <Card.Body>
          <Card.Text>
            <Form>
            <Form.Group controlId="formBasicEmail">
                  <Form.Label>頒布物</Form.Label>
                  <div className='form-control-plaintext' >{productInfo.name}</div>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>種類 / ページ / 価格</Form.Label>
                  <div className='form-control-plaintext' >{`${Type2Text[productInfo.type]} / ${productInfo.page} ページ / ${productInfo.price?productInfo.price+' 円':''}`}</div>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>初出</Form.Label>
                  <div className='form-control-plaintext' >{productInfo.firstAppearanceEventName}</div>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>概要</Form.Label>
                  <pre className='form-control-plaintext' >{productInfo.description}</pre>
                </Form.Group>
              </Form>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

class CarouselSelectChange_ extends React.Component {

  constructor(props) {
    super(props);console.log(this.props,this.context);
    this._onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    //this.props.carouselStore.subscribe(this._onChange);
  }

  componentWillUnmount() {
    //this.props.carouselStore.unsubscribe(this._onChange);
  }

  onChange(...args) {
    console.log('CarouselSelectChange','onChange',args);
  }

  render() {
    console.log('CarouselSelectChange',this.state,this.props);
    return <div />;
  }
}
CarouselSelectChange_.contextTypes = {
  carouselStore: PropTypes.object
};
const CarouselSelectChange = WithStore(CarouselSelectChange_, (...args) => { console.log('CarouselSelectChange_', this,args); return args; });

function CircleSelectView({ models, history, params }) {
  const { circle, product } = models;
  const { event, circleId, productId } = params;
  console.log('CircleSelectView',{models, history, params});

  const [ circleList,  setCircleList  ] = useState();
  const [ circleInfo,  setCircleInfo  ] = useState();
  const [ productList, setProductList ] = useState();
  const [ productInfo, setProductInfo ] = useState();

  useEffect(() => {
    const circleInfo_ = circle.getCircle(circleId);
    circleInfo_ ? setCircleInfo(circleInfo_)
                : circle.request({ circleId: circleId });
    //
    const productList_ = product.getProductList(circleId);
    productList_ ? setProductList(productList)
                 : product.request({ circleId: circleId });
  }, [circle, circleId]);

  useEffect(() => {
    if (circleId) {
      const productInfo_ = product.getProduct(circleId, productId);
      productInfo_ ? setProductInfo(productInfo_)
                   : product.request({ circleId: circleId });
    }
  }, [circleId, product, productId]);

  useEffect(() => {//console.log('CircleSelectView','useEffect');
    const onCircleChange = () => {
      console.log('CircleSelectView','onCircleChange',circleId,circle.getCircle(circleId));
      if (!circleId) {
        // サークルを選択していない場合は一番初めのサークルの飛ぶ
        const firstCircleInfo = circle.getFirstBooth();
        if (firstCircleInfo) {
          history.replace(`/${event}/circle/${firstCircleInfo.id}`);
        }
      }
      else {
        // 今のサークルを表示
        setCircleList(circle.getCircleListOrderByBooth());
        setCircleInfo(circle.getCircle(circleId));
        setProductList(product.getProductList(circleId));
        setProductInfo(product.getProduct(circleId, productId));
      }
    };
    const onCircleLoaded = () => {
      console.log('CircleSelectView','onCircleLoaded',circleId,circle.getCircle(circleId));
      // サークルの製品を取得
        setCircleList(circle.getCircleListOrderByBooth());
        setCircleInfo(circle.getCircle(circleId));
        setProductList(product.getProductList(circleId));
        setProductInfo(product.getProduct(circleId, productId));
    };
    const onProductChange = () => {
      console.log('CircleSelectView','onProductChange',circleId,productId,product.getProduct(circleId, productId));
      setProductList(product.getProductList(circleId));
      setProductInfo(product.getProduct(circleId, productId));
    };
    const onProductLoaded = () => {
      console.log('CircleSelectView','onProductLoaded',circleId,productId,product.getProduct(circleId, productId));
      setProductList(product.getProductList(circleId));
      setProductInfo(product.getProduct(circleId, productId));
    };
    // 通知先を登録
    circle.on('change',onCircleChange);
    circle.on('loaded',onCircleLoaded);
    product.on('change',onProductChange);
    product.on('loaded',onProductLoaded);
    // クリーンアップ関数を返す
    return () => {
      circle.off('change',onCircleChange);
      circle.off('loaded',onCircleLoaded);
      product.off('change',onProductChange);
      product.off('loaded',onProductLoaded);
    };
  }, [event, circle, product, circleId, productId, history]);
  //console.log('circleInfo',circleId,circleInfo,circle.getCircleBoothOrder(circleId));
  //console.log('circleList',circleList);

  //const circleList  = circle.getCircleListOrderByBooth() || [];
  //const productList = [null].concat(product.getProductList(circleId) || []);
  
  const circleList_  = circleList || [];
  const curCircleIndex = circle.getCircleBoothOrder(circleId);
  const productList_ = [null].concat(productList || []);
  const curProductIndex = product.getProductOrder(circleId, productId)+1;

  console.log('>>>>',[circleList,circleId,circleInfo,productList,productId,productInfo,product.getProductOrder(circleId, productId)]);
  return (
    <CarouselProvider
        className='circle-list'
        naturalSlideWidth={window.innerWidth}
        naturalSlideHeight={window.innerHeight}
        totalSlides={circleList_.length}
        currentSlide={curCircleIndex}
      >
        <CarouselSelectChange />
        <Slider>
          {circleList_.map((circleId_, index) => {
            const circleInfo_ = circleInfo && circleInfo.id ==  circleId_ ? circleInfo : { id: circleId_ };
            return (
              <Slide key={`_${circleId_}_${index}`} index={index}>
                <CarouselProvider
                  orientation='vertical'
                  key={`_${circleId_}_carousel_${index}`}
                  className='product-list'
                  naturalSlideWidth={window.innerWidth}
                  naturalSlideHeight={window.innerHeight}
                  totalSlides={productList_.length}
                  currentSlide={curProductIndex}
                >
                  <Slider>
                    {productList_.map((productId_, index) => {
                      //console.log('>>',[(circleInfo||{}).id,circleId_,circleId]);
                      const productInfo_ = productInfo && productInfo.id ==  productId_ ? productInfo : { id: productId_ };
                      return (
                        <Slide key={`_${circleId_}_${productId}_${index}`} index={index}>
                          {!productInfo_.name
                            ? <CircleCard
                                key={`_${circleId_}_${productId}_item_${index}`}
                                circleInfo={circleInfo_}
                              />
                            : <ProductCard
                                key={`_${circleId_}_${productId}_item_${index}`}
                                circleInfo={circleInfo_}
                                productInfo={productInfo_}
                              />
                          }
                        </Slide>
                      );
                    })}
                  </Slider>
                  <ButtonBack
                    style={curProductIndex - 1 < 0 ? { display: 'none' } : {}}
                    onClick={() => {console.log('ButtonTop');
                      const prevProduct = product.getPrevSiblings(circleId, productId);
                      history.push(
                        prevProduct
                          ? `/${event}/circle/${circleId}/${prevProduct.id}`
                          : `/${event}/circle/${circleId}`
                        );
                    }}
                  >
                    <FontAwesomeIcon icon={faAngleUp} color={"black"} size="3x"  />
                  </ButtonBack>
                  <ButtonNext
                    style={productList_.length <= curProductIndex + 1 ? { display: 'none' } : {}}
                    onClick={() => {console.log('ButtonButton');
                      const nextProduct = product.getNextSiblings(circleId, productId);
                      history.push(
                        nextProduct
                          ? `/${event}/circle/${circleId}/${nextProduct.id}`
                          : `/${event}/circle/${circleId}`
                        );
                    }}
                  >
                    <FontAwesomeIcon icon={faAngleDown} color={"black"} size="3x" />
                  </ButtonNext>
                </CarouselProvider>
              </Slide>
            );
          })}
        </Slider>
        <ButtonBack
          style={curCircleIndex - 1 < 0 ? { display: 'none' } : {}}
          onClick={() => {console.log('ButtonBack');
            const prevCircle = circle.getPrevSiblingsBooth(circleId);
            history.push(`/${event}/circle/${prevCircle.id}`);
          }}
        >
          <FontAwesomeIcon icon={faAngleLeft} color={"black"} size="3x"  />
        </ButtonBack>
        <ButtonNext
          style={circleList_.length <= curCircleIndex + 1 ? { display: 'none' } : {}}
          onClick={() => {console.log('ButtonNext');
            const nextCircle = circle.getNextSiblingsBooth(circleId);
            history.push(`/${event}/circle/${nextCircle.id}`);
          }}
        >
          <FontAwesomeIcon icon={faAngleRight} color={"black"} size="3x" />
        </ButtonNext>
      </CarouselProvider>
  );

}

export default CircleSelectView;
