import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* eslint-disable react/prefer-stateless-function */
class Header extends Component {
  static defaultProps = {
    foo: '',
  }

  static propTypes = {
    foo: PropTypes.string,
  }

  render() {
    return <h1>Header {this.props.foo}</h1>;
  }
}

export default Header;
