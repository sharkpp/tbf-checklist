"use struct";

import React from 'react';

import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { Redirect } from "react-router-dom";

function EventSelectView() {
  return (
    <div>
      <Redirect to="/7/circle/" />
      <LinkContainer to="/7/circle/">
        <Button>技術書典７</Button>
      </LinkContainer>
    </div>
  );
}

export default EventSelectView;
