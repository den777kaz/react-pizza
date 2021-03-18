import classNames from 'classnames';
import PropTypes from 'prop-types';

const Button = ({ onClick, children, outline }) => {
  return (
    <button
      onClick={onClick}
      className={classNames('button button--cart', {
        'button--outline': outline,
      })}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};

export default Button;
