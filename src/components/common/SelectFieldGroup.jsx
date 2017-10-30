import React from 'react';
import PropTypes from 'prop-types';

const SelectFieldGroup = ({ field, options, selected, label, error, onChange }) => {
  const divClass = (error) ? 'form-group has-error' : 'form-group';
  const spanClass = (error) ? 'help-block has-error' : 'help-block';

  const optionsList = options.map(o => <option key={o.value} value={o.value}>{o.label}</option>);

  return (
    <div className={divClass}>
      <label className="control-label">{label}</label>
      <select
        name={field}
        onChange={onChange}
        value={selected}>
        {optionsList}
      </select>
      {error && <span className={spanClass}>{error}</span>}
    </div>
  );
}

SelectFieldGroup.propTypes = {
  options: PropTypes.array.isRequired,
  selected: PropTypes.string,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

SelectFieldGroup.defaultProps = {
  selected: '',
}

export default SelectFieldGroup;
