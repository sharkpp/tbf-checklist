"use struct";

import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarChecked } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarUnchecked } from '@fortawesome/free-regular-svg-icons'

import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Form from 'react-bootstrap/Form'

// サークル表示用
function CircleCard({ models, circleInfo }) {
  const circleCut = circleInfo && circleInfo.circleCutImage || { url: '', width: 0, height: 1 };
  return (
    <div className='circle-card'>
      <Card >
        <Card.Header>
          <Badge variant="secondary">{(circleInfo.spaces||[])[0]}</Badge>
          {circleInfo.name||' '}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            padding: '.75rem',
          }}>
            <FontAwesomeIcon icon={faStarUnchecked} color={"#ffcc00"} size="lg" />
          </div>
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

export default CircleCard;
