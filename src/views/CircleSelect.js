"use struct";

import React, { useEffect, useState } from 'react';

import { Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'

import CircleCard from '../components/CircleCard'
import ProductCard from '../components/ProductCard'

const CarouselButtonNormalStyle = { background: 'transparent', border: '0px solid transparent' };
const CarouselButtonHiddenStyle = Object.assign({ display: 'none' }, CarouselButtonNormalStyle);

function CircleSelectView({ models, history, params }) {
  const { circle, product } = models;
  const { event, circleId, productId } = params;
  //console.log('CircleSelectView',{models, history, params});

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
  }, [circle, circleId, product, productList]);

  useEffect(() => {
    if (circleId) {
      const productInfo_ = product.getProduct(circleId, productId);
      productInfo_ ? setProductInfo(productInfo_)
                   : product.request({ circleId: circleId });
    }
  }, [circleId, product, productId]);

  useEffect(() => {//console.log('CircleSelectView','useEffect');
    const onCircleChange = () => {
      //console.log('CircleSelectView','onCircleChange',circleId,circle.getCircle(circleId));
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
      //console.log('CircleSelectView','onCircleLoaded',circleId,circle.getCircle(circleId));
      // サークルの製品を取得
        setCircleList(circle.getCircleListOrderByBooth());
        setCircleInfo(circle.getCircle(circleId));
        setProductList(product.getProductList(circleId));
        setProductInfo(product.getProduct(circleId, productId));
    };
    const onProductChange = () => {
      //console.log('CircleSelectView','onProductChange',circleId,productId,product.getProduct(circleId, productId));
      setProductList(product.getProductList(circleId));
      setProductInfo(product.getProduct(circleId, productId));
    };
    const onProductLoaded = () => {
      //console.log('CircleSelectView','onProductLoaded',circleId,productId,product.getProduct(circleId, productId));
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

  const circleInfo_  = circleInfo  || { id: circleId };
  const productInfo_ = productInfo || { id: productId };

  return (
    <div className="card-container">
      {!productInfo || !productInfo.name
        ? <CircleCard
            key={`_${circleId}`}
            isCurrent={true}
            models={models}
            circleInfo={circleInfo_}
          />
        : <ProductCard
            key={`_${circleId}_${productId}`}
            isCurrent={true}
            models={models}
            circleInfo={circleInfo_}
            productInfo={productInfo_}
          />
      }
      <Button
        variant="link"
        className={"circle-prev"+(circle.hasPrevSiblingsBooth(circleId)?'':' btn-hidden')}
        onClick={() => {//console.log('ButtonBack');
          const prevCircle = circle.getPrevSiblingsBooth(circleId);
          history.push(`/${event}/circle/${prevCircle.id}`);
        }}
      >
        <FontAwesomeIcon icon={faAngleLeft} color={"black"} size="3x" />
      </Button>
      <Button
        variant="link"
        className={"circle-next"+(circle.hasNextSiblingsBooth(circleId)?'':' btn-hidden')}
        onClick={() => {//console.log('ButtonNext');
          const nextCircle = circle.getNextSiblingsBooth(circleId);
          history.push(`/${event}/circle/${nextCircle.id}`);
        }}
      >
        <FontAwesomeIcon icon={faAngleRight} color={"black"} size="3x" />
      </Button>
      <Button
        variant="link"
        className={"product-prev"+(productId?'':' btn-hidden')}
        onClick={() => {//console.log('ButtonTop');
          const prevProduct = product.getPrevSiblings(circleId, productId);
          history.push(
            prevProduct
              ? `/${event}/circle/${circleId}/${prevProduct.id}`
              : `/${event}/circle/${circleId}`
            );
        }}
      >
        <FontAwesomeIcon icon={faAngleUp} color={"black"} size="3x" />
      </Button>
      <Button
        variant="link"
        className={"product-next"+(product.hasNextProduct(circleId,productId)?'':' btn-hidden')}
        onClick={() => {//console.log('ButtonButton');
          const nextProduct = product.getNextSiblings(circleId, productId);
          history.push(
            nextProduct
              ? `/${event}/circle/${circleId}/${nextProduct.id}`
              : `/${event}/circle/${circleId}`
            );
        }}
      >
        <FontAwesomeIcon icon={faAngleDown} color={"black"} size="3x" />
      </Button>
    </div>
  );
}

export default CircleSelectView;
