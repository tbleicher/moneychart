import React from 'react';
import PropTypes from 'prop-types';

const TextFieldGroup = ({ field, value, label, error, showAdd, showRemove, type, onAddClick, onChange, onRemoveClick }) => {
  const divClass = (error) ? 'form-group has-error' : 'form-group';
  const spanClass = (error) ? 'help-block has-error' : 'help-block';

  return (
    <div className={divClass}>
      <label className="control-label">{label}</label>
      <input
        value={value}
        onChange={onChange}
        type={type}
        name={field}
        className="form-control"
      />
      {showRemove && <span className="ttag danger" onClick={onRemoveClick}>-</span>}
      {showAdd && <span className="ttag" onClick={onAddClick}>+</span>}
      {error && <span className={spanClass}>{error}</span>}
    </div>
  );
}

TextFieldGroup.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  showAdd: PropTypes.bool,
  showRemove: PropTypes.bool,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onAddClick: PropTypes.func,
  onRemoveClick: PropTypes.func,
}

TextFieldGroup.defaultProps = {
  showAdd: false,
  showRemove: false,
  type: 'text',
  onAddClick: ()  => {},
  onRemoveClick: ()  => {},
}

export default TextFieldGroup;
