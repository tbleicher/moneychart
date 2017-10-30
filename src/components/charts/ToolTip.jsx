import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'd3';
import { timeFormat } from 'd3-time-format';

import './ToolTip.css'


const formatTime = timeFormat("%e %B");
const formatCurrency = format("($.2f");


function getToolTipText(data, x=4, dy=14) {
  const lines = [
    data.debit !== 0
      ? 'debit: ' + formatCurrency(data.debit)
      : 'credit: ' + formatCurrency(data.credit),
    'balance: ' + formatCurrency(data.balance),
    'date: ' + formatTime(data.valueDate),
  ];

  return lines.map((line, idx) => {
    return <text x={x} y={(idx+1)*dy} key={idx}>{line}</text>
  });
}

function ToolTip(props) {
  const { x, y, width, height, offset, data, color, chartWidth } = props;
  const text = getToolTipText(data);

  let ttX = x + offset;
  if (chartWidth && (x + width) > chartWidth ) {
    ttX = x - offset - width;
  }
  const ttY = y-height/2;
  
  return (
    <g className='tooltip'
      transform={`translate(${ttX},${ttY})`}>
      <rect x={0} y={0} width={width} height={height} 
        style={{fill: color}} />
      {text}
    </g>
  );
}

ToolTip.defaultProps = {
  chartWidth: 0,
  offset: 0,
  width: 120,
  height: 46,
};

ToolTip.propTypes ={
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  color: PropTypes.string,
  offset: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  chartWidth: PropTypes.number,
};

export default ToolTip;
