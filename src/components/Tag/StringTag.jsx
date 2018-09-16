import React from "react";
import PropTypes from "prop-types";
import "./Tag.css";

function displayLabel(label) {
  const parts = label.split("::");
  const idx = parts.length - 1;
  return [idx, parts[idx]];
}

const StringTag = props => {
  const label = displayLabel(props.label)[1];
  return (
    <span
      className="ttag"
      style={{ backgroundColor: props.color }}
      key={props.label}
      onClick={label => props.onClick(label)}
    >
      {label}
    </span>
  );
};

StringTag.propTypes = {
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

StringTag.defaultProps = {
  onClick: () => {},
  color: "#969696"
};

export default StringTag;
