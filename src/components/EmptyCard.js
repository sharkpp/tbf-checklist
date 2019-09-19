"use struct";

import React from 'react';

import { Card, Spinner } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarUnchecked } from '@fortawesome/free-regular-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';


// サークル表示用
function EmptyCard() {
  return (
    <div className='circle-card'>
      <Card >
        <Card.Header>
          閉鎖されました
        </Card.Header>
        <div className="loading">
          <p>諸事情によりこのサイトは閉鎖されました。</p>
          <p>メニューより、お気に入り一覧の表示、エクスポートのみ可能です。</p>
          <p>サークル名などはキャッシュに残っている場合にのみ表示されます。</p>
          <p>ご迷惑をおかけいたしますが、ご理解の程よろしくお願い申し上げます。</p>
        </div>
      </Card>
    </div>
  );
}

export default EmptyCard;
