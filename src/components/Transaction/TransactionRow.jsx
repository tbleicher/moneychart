import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { format } from 'd3';

import { StringTag } from '../Tag';
import { Types } from '../Tag';
import { mergeTags } from '../../utils/TransactionParser';

//import './TransactionRow.css';


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


class TransactionRow extends React.Component {

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
    const bg = selected ? '#ff0' : isOver ? '#9f9' : '';
    
    
    const stringTags = tags.map((t, idx) => {
      const color = this.props.tagColorMap.get(t) || '#99cc00';

      return <StringTag label={t} key={t+idx} color={color}/>
    });
    
    return connectDropTarget(
      <tr className='transactionRow' style={{backgroundColor: bg}} key={id} >
        <td>{this.formatDate(transactionDate)}</td>
        <td onClick={this.onClick}>{description}</td>
        <td>{formatCurrency(debit)}</td>
        <td>{formatCurrency(credit)}</td>
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
  data: PropTypes.object.isRequired,
  tagColorMap: PropTypes.object, 
  onClick: PropTypes.func,
};

export default DropTarget(Types.TAGDND, dropTarget, collect)(TransactionRow);
