import React from 'react';
import PropTypes from 'prop-types';

const Hello = ({ name }) => <h1>Hellosddddd, {name}</h1>;

Hello.propTypes = {
  name: PropTypes.string,
};

Hello.defaultProps = {
  name: 'John',
};

export default Hello;
