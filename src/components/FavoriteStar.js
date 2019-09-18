
"use struct";

import React, { useState, useEffect, useCallback } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarChecked } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarUnchecked } from '@fortawesome/free-regular-svg-icons'

// 製品表示用
function FavoriteStar({ models, circleId, productId, isCurrent }) {
  const { favorite } = models;

  const [ favorited,  setFavorited ] = useState(favorite.isFavorite(circleId, productId));

  const setFavorite   = useCallback(() => favorite.setFavorite  (circleId, productId), [favorite, circleId, productId]);
  const unsetFavorite = useCallback(() => favorite.unsetFavorite(circleId, productId), [favorite, circleId, productId]);

  useEffect(() => {//console.log('CircleSelectView','useEffect');
    const onFavoriteChange = (params) => {
      if (!params) {
        setFavorited(favorite.isFavorite(circleId, productId));
      }
      else {
        if (circleId  === params.circleId &&
            productId === params.productId) {
          setFavorited(params.favorite);
        }
      }
    };
    // 通知先を登録
    if (isCurrent) {
      favorite.on('change',onFavoriteChange);
      //console.log('fav on',[circleId, productId]);
    }
    // クリーンアップ関数を返す
    return isCurrent ? (() => {
      favorite.off('change',onFavoriteChange);
      //console.log('fav off',[circleId, productId]);
    }) : (() => {});
  }, [isCurrent, favorite, circleId, productId]);

  return (
    <div
      style={{ paddingLeft: 8 }}
      onClick={favorited ? unsetFavorite : setFavorite}
    >
      <FontAwesomeIcon
        icon={favorited ? faStarChecked : faStarUnchecked}
        color={"#ffcc00"}
        size="lg"
      />
    </div>
  );
}

export default FavoriteStar;
