import React from 'react';
import PropTypes from 'prop-types';
import { brushX, event, select, timeDay } from 'd3';

import './Brush.css';


function getDayRange(selection, xScale) {
  if (!selection) {
    return [null, null];
  }

  const inv = selection.map(xScale.invert, xScale);
  const low = timeDay.floor(inv[0]);
  const high = timeDay.ceil(inv[1]);
  return [low, high];
}


class Brush extends React.Component {

  constructor(props) {
    super(props);
    
    this.width = 0;
    this.brush = brushX();
    this.onBrushEvent = this.onBrushEvent.bind(this);
    this.resizeBrush = this.resizeBrush.bind(this);
  }

  componentDidMount() {
    const { selectionStart, selectionEnd, xScale, width } = this.props;
    const g = select(this.brushGroup);

    this.resizeBrush(width);

    if (selectionStart) {
      const x0 = xScale(selectionStart);
      const x1 = xScale(selectionEnd);
      this.brush.move(g, [x0,x1]);
    }
  }

  componentDidUpdate(prevProps) {
      this.resizeBrush(prevProps.width);
  }

  onBrushEvent() {
    if (!event.selection) {
      return;
    }

    const [ low, high ] = getDayRange(event.selection, this.props.xScale)
    if (event.type === 'brush') {
      this.props.onBrush(low,high);
    } else if (event.type === 'start') {
      this.props.onBrushStart(low,high);
    } else if (event.type === 'end') {
      this.props.onBrushEnd(low,high);
    }
  }
  
  resizeBrush(width) {
    const g = select(this.brushGroup);

    g.call(this.brush);
    this.width = width;
  }

  render () {
    const { x, y, width, height } = this.props;

    this.brush
      .extent([[0,0], [width, height]])
      .on("brush start end", this.onBrushEvent);
    
    return (
      <g className='x brush'
        transform={`translate(${x},${y})`}
        ref={(g) => { this.brushGroup = g; }} >
        <rect className='background' stroke='red' x={0} y={0} width={width} height={height} />
        {this.props.children}
      </g>
    );
  }
}

  Brush.defaultProps = {
    onBrush: function() {},
    onBrushStart: function() {},
    onBrushEnd: function() {},
    selectionStart: null,
    selectionEnd: null,
  }

  Brush.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    xScale: PropTypes.func.isRequired,
    selectionStart: PropTypes.any,
    selectionEnd: PropTypes.any,
    onBrush: PropTypes.func,
    onBrushStart: PropTypes.func,
    onBrushEnd: PropTypes.func,
  }

  export default Brush;
