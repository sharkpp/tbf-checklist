"use struct";

import React, { useEffect, useState, useCallback } from 'react';

import { Button } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'

import EmptyCard from '../components/EmptyCard'
import HamburgerMenuButton from '../components/HamburgerMenuButton'

function CircleSelectView({ models, history, params }) {
  const { circle, product, favorite } = models;
  const { event, circleId, productId } = params;
  //console.log('CircleSelectView',{models, history, params});

  const [ circleList,  setCircleList  ] = useState();
  const [ circleInfo,  setCircleInfo  ] = useState();
  const [ productList, setProductList ] = useState();
  const [ productInfo, setProductInfo ] = useState();

  const handleFavoriteList = useCallback(() => {
    history.push(`/fav/list`);
  }, [history]);

  const handleFavoriteSave = useCallback(() => {
    favorite.export();
  }, [favorite]);

  const handleFavoriteLoad = useCallback(() => {
    history.push(`/fav/import`);
  }, [favorite, history]);

  const handleClearCache = useCallback(() => {
    circle.clearCache();
    product.clearCache();
  }, [circle, product]);

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

  const circleInfo_  = circleInfo  || { id: circleId };
  const productInfo_ = productInfo || { id: productId };

  return (
    <div className="card-container">
      <EmptyCard />

      <Dropdown className='card-menu-btn'>
        <Dropdown.Toggle as={HamburgerMenuButton} id="dropdown-custom-components">
          
        </Dropdown.Toggle>

        <Dropdown.Menu >
          <Dropdown.Item eventKey="1" onSelect={handleFavoriteList}>お気に入り一覧</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="2" onSelect={handleFavoriteSave}>お気に入りをエクスポート</Dropdown.Item>
          <Dropdown.Item eventKey="3" onSelect={handleFavoriteLoad} disabled>お気に入りをインポート</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="3" onSelect={handleClearCache}>キャッシュをクリア</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>


    </div>
  );
}

export default CircleSelectView;
