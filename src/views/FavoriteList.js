"use struct";

import React, { useState, useEffect, useCallback } from 'react';

import { ButtonToolbar, Button } from 'react-bootstrap';
import { Table } from 'react-bootstrap';

function FavoriteListView({ history, models }) {
  const { circle, product, favorite } = models;

  const [ favList, setFavList ] = useState(favorite.list('tbf07'));
  const [ priceTotal, setPriceTotal ] = useState({ price: 0, withUnknown: false });

  useEffect(() => {//console.log('CircleSelectView','useEffect');
    const updateFavList = () => {
      let favList = favorite.list('tbf07');
      circle.mergeFavorite(favList);
      product.mergeFavorite(favList);
      setFavList(favList);
      // 価格の合計を計算
      setPriceTotal(favList.reduce((r, favItem) => {
        if (favItem.productId) {
          if (undefined === favItem.productPrice) {
            r.withUnknown = true;
          }
          else {
            r.price += favItem.productPrice;
          }
        }
        return r;
      }, { price: 0, withUnknown: false }));
    };
    // 通知先を登録
    circle.on('change',updateFavList);
    circle.on('loaded',updateFavList);
    product.on('change',updateFavList);
    product.on('loaded',updateFavList);
    favorite.on('change',updateFavList);
    return () => { // クリーンアップ関数を返す
      circle.off('change',updateFavList);
      circle.off('loaded',updateFavList);
      product.off('change',updateFavList);
      product.off('loaded',updateFavList);
      favorite.off('change',updateFavList);
    };
  }, [circle,product,favorite]);

  const handleBackClick = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <div className='page-container'>
      <h3>
        お気に入り一覧
      </h3>
      <Table className='fav-list' striped bordered size="sm">
        <thead>
          <tr>
            <th className='circle-space'>配置</th>
            <th className='circle-name' colSpan={2}>サークル名/頒布物</th>
            <th className='product-price'>価格</th>
          </tr>
        </thead>
        <tbody>
          {favList.map((favItem, index) => {
            return (!favItem.productId
              ? <tr key={`fav-${favItem.circleId}-circle`}>
                  <td className='circle-space' >
                    {favItem.space||''}
                  </td>
                  <td className='circle-name' colSpan={2}>
                    <a style={{ padding: 0 }} href={`/${favItem.eventId.replace(/^[a-z]+0*/, '')}/circle/${favItem.circleId}`} onClick={(e) => {
                      history.push(`/${favItem.eventId.replace(/^[a-z]+0*/, '')}/circle/${favItem.circleId}`);
                      e.preventDefault();
                    }} >
                      {favItem.circleName||''}
                    </a>
                  </td>
                  <td className='product-price' >
                  </td>
                </tr>
              : <tr key={`fav-${favItem.circleId}-${favItem.productId}`}>
                  <td className='product-circle-space' >
                    {favItem.space||''}
                  </td>
                  <td className='product-circle-name'>
                    {favItem.circleName||''}
                  </td>
                  <td className='product-name'>
                    <a style={{ padding: 0 }} href={`/${favItem.eventId.replace(/^[a-z]+0*/, '')}/circle/${favItem.circleId}/${favItem.productId}`} onClick={(e) => {
                      history.push(`/${favItem.eventId.replace(/^[a-z]+0*/, '')}/circle/${favItem.circleId}/${favItem.productId}`);
                      e.preventDefault();
                    }} >
                      {favItem.productName||''}
                    </a>
                  </td>
                  <td className='product-price' >
                    {undefined===favItem.productPrice?'':`${favItem.productPrice} 円`}
                  </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th className='circle-space' >合計</th>
            <td colSpan={3} className='product-price' >{`${priceTotal.withUnknown?'※不明含む ':''}${priceTotal.price} 円`}</td>
          </tr>
        </tfoot>
      </Table>
      <ButtonToolbar>
        <Button variant="secondary" onClick={handleBackClick}>戻る</Button>
      </ButtonToolbar>
    </div>
  );
}

export default FavoriteListView;
