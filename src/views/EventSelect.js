"use struct";

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

function EventSelectView() {
  return (
    <div>
      <LinkContainer to="/7/circle/">
        <Button>技術書典７</Button>
      </LinkContainer>
    </div>
  );
}

export default EventSelectView;
