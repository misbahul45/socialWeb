import PropTypes from 'prop-types';

const ButtonIcon = ({ text, className, textClassName, onClick, type, children }) => {
  return (
    <button name="button icon" type={type} onClick={onClick} className={className}>
      {children}
      <p className={textClassName}>{text}</p>
    </button>
  );
};

ButtonIcon.propTypes = {
  text: PropTypes.any,
  className: PropTypes.string,
  textClassName: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  children: PropTypes.node,
};

export default ButtonIcon;
