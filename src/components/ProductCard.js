"use struct";

import React from 'react';

import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Form from 'react-bootstrap/Form'

import FavoriteStart from './FavoriteStart'

const Type2Text = {
  'fanzine':  '同人誌',
  'commerce': '商業誌',
};

// 製品表示用
function ProductCard({ models, circleInfo, productInfo }) {
  const firstImage = productInfo && productInfo.images && productInfo.images[0] || { url: '', width: 0, height: 1 };
  return (
    <div className='product-card'>
      <Card >
        <Card.Header>
          <Badge variant="secondary">{(circleInfo.spaces||[])[0]}</Badge>
          {circleInfo.name||' '}
          <FavoriteStart models={models}
            circleId={circleInfo && circleInfo.id} productId={productInfo && productInfo.id} />
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
          <div className='card-text'
            // Card.Text だと "<div> cannot appear as a descendant of <p>" が出る
          >
            <Form>
            <Form.Group controlId="name">
                  <Form.Label>頒布物</Form.Label>
                  <div className='form-control-plaintext' >{productInfo.name}</div>
                </Form.Group>
                <Form.Group controlId="page">
                  <Form.Label>種類 / ページ / 価格</Form.Label>
                  <div className='form-control-plaintext' >{`${Type2Text[productInfo.type]} / ${productInfo.page} ページ / ${productInfo.price?productInfo.price+' 円':''}`}</div>
                </Form.Group>
                <Form.Group controlId="firstAppearanceEventName">
                  <Form.Label>初出</Form.Label>
                  <div className='form-control-plaintext' >{productInfo.firstAppearanceEventName}</div>
                </Form.Group>
                <Form.Group controlId="description">
                  <Form.Label>概要</Form.Label>
                  <pre className='form-control-plaintext' >{productInfo.description}</pre>
                </Form.Group>
              </Form>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProductCard;