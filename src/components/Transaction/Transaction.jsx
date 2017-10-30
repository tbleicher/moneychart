import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { format } from 'd3';

import { StringTag } from '../Tag';
import { Types } from '../Tag';
import { mergeTags } from '../../utils/TransactionParser';

import './Transaction.css';


const dropTarget = {
  hover(props, monitor, component) {
    //console.log('hover:', props.data.id)
  },
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const data = component.props.data;

    if (!data.tags.includes(item.label)) {
      const tags = mergeTags(data.tags, item.label);
      props.updateTransaction({ id: data.id, values: { tags }});
      
      return { id: data.id, label: item.label };
    } 
  }
}

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    //isOverCurrent: monitor.isOver({ shallow: true }),
    //canDrop: monitor.canDrop(),
    //itemType: monitor.getItemType()
  };
}

const formatCurrency = format("($.2f");

class Transaction extends React.Component {

  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onClick(this.props.data.id);
  }

  formatDate(d) {
    return `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`;
  }

  render() {
    const {
      credit,
      debit,
      description,
      id,
      selected,
      tags,
      transactionDate,
    } = this.props.data;

    const { isOver, connectDropTarget } = this.props;
    let bg = isOver ? '#9f9' : '';
    bg = selected ? '#ff0' : bg;
    
    const tTags = tags.map((t, idx) =>
      <StringTag label={t} key={t+idx} />
    );
    
    return connectDropTarget(
      <li className='transaction' style={{backgroundColor: bg}} key={id} >
        <span id="date">{this.formatDate(transactionDate)}</span>
        <span id="description" onClick={this.onClick}>{description}</span>
        <div>
          <span>{formatCurrency(debit)}</span>
          <span>{formatCurrency(credit)}</span>
          {tTags}
        </div>
      </li>
    );
  }
}

Transaction.defaultProps = {
  onClick: () => {},
};

Transaction.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default DropTarget(Types.TAGDND, dropTarget, collect)(Transaction);
