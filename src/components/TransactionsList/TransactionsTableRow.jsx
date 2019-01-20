import React from "react";
import PropTypes from "prop-types";
import { DropTarget } from "react-dnd";

import { TAGDND } from "../../reducers/Tags";

//import './TransactionRow.css';

const dropTarget = {
  hover(props, monitor, component) {
    //console.log('hover:', props.data.id)
  },
  drop(props, monitor, component) {
    console.log("drop", props, monitor, component);

    const item = monitor.getItem();
    const data = component.props.data;

    const dataTags = data.tags || [];
    console.log("old tags", dataTags);

    if (!dataTags.includes(item.label)) {
      // const tags = mergeTags(dataTags, item.label);
      // props.updateTransaction({ id: data.id, tags });
      // console.log("new tags", tags);

      return { id: data.id, label: item.label };
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

const CustomRow = ({
  children,
  className,
  isOver,
  connectDropTarget,
  ...rest
}) => {
  const _className = className ? `rt-tr-group ${className}` : "rt-tr-group";

  console.log("rest", rest);
  return connectDropTarget(
    <div className={_className} role="rowgroup" {...rest}>
      {children}
    </div>
  );
};

// export default CustomRow;
export default DropTarget(TAGDND, dropTarget, collect)(CustomRow);
