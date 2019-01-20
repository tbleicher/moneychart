import React from "react";
import PropTypes from "prop-types";

import { DropTarget } from "react-dnd";

import { TAGDND } from "../../reducers/Tags";

const dropTarget = {
  // hover(props, monitor, component) {
  //   console.log("hover:", props.dropId);
  // },
  drop(props, monitor, component) {
    const { dropId, tags, updateTransaction } = props;
    const item = monitor.getItem();

    if (!tags.includes(item.label)) {
      const _tags = [...tags, item.label];

      updateTransaction({ id: dropId, tags: _tags });
    }
  }
};

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver()

    //isOverCurrent: monitor.isOver({ shallow: true }),

    //canDrop: monitor.canDrop(),

    //itemType: monitor.getItemType()
  };
}

const TransactionsTableRow = ({
  children,
  className,
  dropId,
  isOver,
  connectDropTarget,
  style,
  tags,
  updateTransaction,
  ...rest
}) => {
  const _className = className ? `rt-tr ${className}` : "rt-tr";

  // define background color based on drag-hover and selected state
  const bg = isOver ? { backgroundColor: "#ffd" } : {};
  const _style = style ? { ...style, ...bg } : { ...bg };

  return connectDropTarget(
    <div className={_className} role="row" {...rest} style={_style}>
      {children}
    </div>
  );
};

TransactionsTableRow.propTypes = {
  className: PropTypes.string,
  dropId: PropTypes.string,
  isOver: PropTypes.bool,
  connectDropTarget: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired,
  updateTransaction: PropTypes.func
};

TransactionsTableRow.defaultProps = {
  style: {},
  tags: []
};

// export default TransactionsTableRow;
export default DropTarget(TAGDND, dropTarget, collect)(TransactionsTableRow);
