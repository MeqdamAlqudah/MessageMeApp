import React from 'react';
import PropTypes from 'prop-types';

const FlashMessage = ({ show, text }) => {
  const closeMenuHandler = () => {
    show();
  };
  return (
    <div className="shoWflashMessage">
      <p>{text}</p>
      <button type="button" onClick={closeMenuHandler}>X</button>
    </div>
  );
};
FlashMessage.propTypes = {
  show: PropTypes.func,
  text: PropTypes.string,
};

FlashMessage.defaultProps = {
  show: () => {},
  text: '',

};
export default FlashMessage;
