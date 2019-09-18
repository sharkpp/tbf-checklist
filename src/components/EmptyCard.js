"use struct";

import React from 'react';

import { Card, Spinner } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarUnchecked } from '@fortawesome/free-regular-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';


// サークル表示用
function EmptyCard({}) {
  return (
    <div className='circle-card'>
      <Card >
        <Card.Header>
          <span>&nbsp;</span>
          <span className='spacer' />
          <FontAwesomeIcon
            icon={faExternalLinkAlt}
            color={"gray"}
            size="lg"
            style={{ marginLeft: 8 }}
          />
          <FontAwesomeIcon
            icon={faStarUnchecked}
            color={"gray"}
            size="lg"
            style={{ marginLeft: 8 }}
          />
        </Card.Header>
        <div className="loading">
          <Spinner animation="border" />
        </div>
      </Card>
    </div>
  );
}

export default EmptyCard;
