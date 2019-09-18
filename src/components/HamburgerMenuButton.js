"use struct";

import React  from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default class HamburgerMenuButton extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.onClick(e);
  }

  render() {
    return (
      <a href="#" onClick={this.handleClick}>
        <FontAwesomeIcon icon={faBars} color={"gray"} size="2x" />
      </a>
    );
  }
}