
"use struct";

import React, { useState, useEffect, useCallback } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarChecked } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarUnchecked } from '@fortawesome/free-regular-svg-icons'

// 製品表示用
function FavoriteStar({ models, circleId, productId, isCurrent }) {
  const { favorite } = models;

  const [ favorited,  setFavorited ] = useState(favorite.isFavorite(circleId, productId));

  const setFavorite   = useCallback(() => favorite.setFavorite(circleId, productId), []);
  const unsetFavorite = useCallback(() => favorite.unsetFavorite(circleId, productId), []);

  useEffect(() => {//console.log('CircleSelectView','useEffect');
    const onFavoriteChange = (params) => {
      if (circleId == params.circleId && productId == params.productId) {
        setFavorited(params.favorite);
      }
    };
    // 通知先を登録
    isCurrent && favorite.on('change',onFavoriteChange);
    // クリーンアップ関数を返す
    return () => {
      isCurrent && favorite.off('change',onFavoriteChange);
    };
  }, [isCurrent, favorite, circleId, productId]);

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      right: 0,
      padding: '.75rem',
    }}
    onClick={favorited ? unsetFavorite : setFavorite}
    >
      <FontAwesomeIcon
        icon={favorited ? faStarChecked : faStarUnchecked}
        color={"#ffcc00"}
        size="lg"
        onClick={favorited ? unsetFavorite : setFavorite}
      />
    </div>
  );
}

export default FavoriteStar;
