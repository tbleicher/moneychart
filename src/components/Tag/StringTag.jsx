import React from 'react';
import PropTypes from 'prop-types';
import './Tag.css';

function displayLabel(label) {
  const parts = label.split('::');
  const idx = parts.length - 1;
  return [idx, parts[idx]];
}

class StringTag extends React.Component {
  render() {
    const label = displayLabel(this.props.label)[1];
    return (
      <span
        className="ttag"
        style={{ backgroundColor: this.props.color }}
        key={this.props.label}
        onClick={label => this.props.onClick(label)}
      >
        {label}
      </span>
    );
  }
}

StringTag.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

StringTag.defaultProps = {
  onClick: () => {},
  color: '#969696'
};

export default StringTag;
