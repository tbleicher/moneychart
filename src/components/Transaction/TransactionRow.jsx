import React from "react";
import PropTypes from "prop-types";
import { DropTarget } from "react-dnd";
import { format } from "d3";

import { StringTag } from "../Tag";
import { TAGDND } from "../../reducers/Tags";
import { mergeTags } from "../../utils/TransactionParser";

//import './TransactionRow.css';

const dropTarget = {
  hover(props, monitor, component) {
    //console.log('hover:', props.data.id)
  },
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const data = component.props.data;

    const dataTags = data.tags || [];
    console.log("old tags", dataTags);

    if (!dataTags.includes(item.label)) {
      const tags = mergeTags(dataTags, item.label);
      props.updateTransaction({ id: data.id, tags });
      console.log("new tags", tags);

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

const formatCurrency = format("($.2f");

class TransactionRow extends React.Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onClick(this.props.data.id);
  }

  formatDate(d) {
    return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
  }

  render() {
    const { amount, balance, description, id, selected } = this.props.data;

    const date = new Date(this.props.data.date);
    const tags = this.props.data.tags || [];

    const { isOver, connectDropTarget } = this.props;
    const bg = selected ? "#ff0" : isOver ? "#9f9" : "";

    const stringTags = tags.map((t, idx) => {
      const color = this.props.tagColorMap.get(t) || "#99cc00";

      return <StringTag label={t} key={t + idx} color={color} />;
    });

    return connectDropTarget(
      <tr className="transactionRow" style={{ backgroundColor: bg }} key={id}>
        <td>{this.formatDate(date)}</td>
        <td onClick={this.onClick}>{description}</td>
        <td>{formatCurrency(amount)}</td>
        <td>{formatCurrency(balance)}</td>
        <td>{stringTags}</td>
      </tr>
    );
  }
}

TransactionRow.defaultProps = {
  onClick: () => {},
  tagColorMap: new Map()
};

TransactionRow.propTypes = {
  data: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    balance: PropTypes.number.isRequired,
    description: PropTypes.string,
    id: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    tags: PropTypes.array.isRequired
  }).isRequired,
  tagColorMap: PropTypes.object,
  onClick: PropTypes.func
};

export default DropTarget(TAGDND, dropTarget, collect)(TransactionRow);
