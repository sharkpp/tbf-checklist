"use struct";

import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarChecked } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarUnchecked } from '@fortawesome/free-regular-svg-icons'

import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Form from 'react-bootstrap/Form'

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

export default ProductCard;
