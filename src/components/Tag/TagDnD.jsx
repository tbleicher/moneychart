import React from "react";
import PropTypes from "prop-types";
import { DragSource } from "react-dnd";

import { TAGDND } from "../../reducers/Tags";

import "./Tag.css";

const tagSource = {
  beginDrag(props) {
    // Return the data describing the dragged item
    const item = { label: props.data.label };
    return item;
  },

  endDrag(props, monitor, component) {
    // When dropped on a compatible target, do something
    //const item = monitor.getItem();
    // dropResult is object returned from drop() function of DragTarget
    const dropResult = monitor.getDropResult();
    if (dropResult && dropResult.id) {
      console.log(`addedTag ${dropResult.label} to ${dropResult.id}`);

      // TODO: save transactions?
    }
  }
};

function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  };
}

function displayLabel(label) {
  const parts = label.split("::");
  const idx = parts.length - 1;
  return [idx, parts[idx]];
}

class TagDnD extends React.Component {
  render() {
    const { connectDragSource, isDragging, data } = this.props;
    const bgcolor = data.color || "#fff";
    const opacity = isDragging ? 0.5 : 1;
    const [level, label] = displayLabel(data.label || "");
    const className = `ttag level${level}`;

    return connectDragSource(
      <span
        className={className}
        key={data.id}
        onClick={label => this.props.onClick(data.id)}
        style={{ backgroundColor: bgcolor, opacity }}
      >
        {label}
      </span>
    );
  }
}

TagDnD.propTypes = {
  data: PropTypes.shape({
    color: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    label: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func
};

TagDnD.defaultProps = {
  onClick: () => {}
};

export default DragSource(TAGDND, tagSource, collect)(TagDnD);
