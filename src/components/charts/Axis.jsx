/*
 *  based on https://github.com/codesuki/react-d3-components/blob/master/src/Axis.jsx
 *  Copyright (c) 2015 Neri Marschik
 *
 *  changed to meet eslint standards, cleanup and coverted to es6 class
 *  by Thomas Bleicher, (c) 2017
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

const { array, func, oneOf, number, string } = PropTypes;

function d3ScaleExtent(domain) {
  const start = domain[0];
  const stop = domain[domain.length - 1];
  return start < stop ? [start, stop] : [stop, start];
}

function d3ScaleRange(scale) {
  return scale.rangeExtent ? scale.rangeExtent() : d3ScaleExtent(scale.range());
}

function getPathData(props) {
  const { orientation, outerTickSize, scale, sign } = props;
  const range = d3ScaleRange(scale);
  if (orientation === 'bottom' || orientation === 'top') {
    return `M${range[0]}, ${sign * outerTickSize}V0H${range[1]}V${sign *
      outerTickSize}`;
  }
  return `M${sign * outerTickSize}, ${range[0]}H0V${range[1]}H${sign *
    outerTickSize}`;
}

function getLabelElement(label, className, width, orientation) {
  if (orientation === 'bottom' || orientation === 'top') {
    return (
      <text
        className={`${className} label`}
        textAnchor={'end'}
        x={width}
        y={-6}
      >
        {label}
      </text>
    );
  }
  const dy = orientation === 'left' ? '.75em' : '-1.25em';
  return (
    <text
      className={`${className} label`}
      textAnchor="end"
      y={6}
      dy={dy}
      transform="rotate(-90)"
    >
      {label}
    </text>
  );
}

function getTickElement(tick, index, opts) {
  const { x, x2, y, y2, dy, textAnchor, tickRotation } = getTextOptions(opts);
  const position = opts.activeScale(tick);
  const translate =
    opts.orientation === 'bottom' || opts.orientation === 'top'
      ? `translate(${position}, 0)`
      : `translate(0, ${position})`;
  const key = `${tick}.${index}`;

  return (
    <g key={key} className="tick" transform={translate}>
      <line x2={x2} y2={y2} stroke="#aaa" />
      <text
        x={x}
        y={y}
        dy={dy}
        textAnchor={textAnchor}
        transform={`rotate(${tickRotation})`}
      >
        {opts.tickFormat(tick)}
      </text>
    </g>
  );
}

function getTickFormat(scale, tickArguments) {
  if (scale.tickFormat) {
    return scale.tickFormat(...tickArguments);
  }
  return x => x;
}

function getTicks(width, height, scale, tickArguments, tickValues, zero) {
  let ticks;
  if (tickValues) {
    ticks = tickValues;
  } else if (scale.ticks) {
    ticks = scale.ticks(...tickArguments);
  } else {
    ticks = scale.domain();
  }
  // TODO: is there a cleaner way? removes the 0 tick if axes are crossing
  if (zero !== height && zero !== width && zero !== 0) {
    ticks = ticks.filter(element => element !== 0);
  }
  return ticks;
}

function getTranslateString(props) {
  const { orientation, height, width, margin, offset } = props;
  const offsets = {
    top: [margin.left, margin.top - offset],
    bottom: [margin.left, margin.top + height + offset],
    left: [margin.left - offset, margin.top],
    right: [margin.left + width + offset, margin.top]
  };
  const [x, y] = offsets[orientation];

  return `translate(${x}, ${y})`;
}

function getTextOptions(options) {
  const {
    innerTickSize,
    orientation,
    sign,
    tickDirection,
    tickSpacing
  } = options;

  let x = 0;
  let y = 0;
  let x2 = 0;
  let y2 = 0;
  let dy;
  let textAnchor;
  let tickRotation = 0;

  if (orientation === 'bottom' || orientation === 'top') {
    y = sign * tickSpacing;
    y2 = sign * innerTickSize;
    dy = sign < 0 ? '0em' : '.71em';
    textAnchor = 'middle';

    if (tickDirection === 'vertical') {
      tickRotation = -90;
      x = -tickSpacing;
      y = -innerTickSize;
      textAnchor = 'end';
    } else if (tickDirection === 'diagonal') {
      tickRotation = -60;
      x = -tickSpacing;
      y = 0;
      textAnchor = 'end';
    }
  } else {
    x = sign * tickSpacing;
    x2 = sign * innerTickSize;
    dy = '.32em';
    textAnchor = sign < 0 ? 'end' : 'start';

    if (tickDirection === 'vertical') {
      tickRotation = -90;
      x -= sign * tickSpacing;
      y = -(tickSpacing + innerTickSize);
      textAnchor = 'middle';
    } else if (tickDirection === 'diagonal') {
      tickRotation = -60;
      x -= sign * tickSpacing;
      y = -(tickSpacing + innerTickSize);
      textAnchor = 'middle';
    }
  }
  return { x, x2, y, y2, dy, textAnchor, tickRotation };
}

class Axis extends React.Component {
  render() {
    const {
      label,
      width,
      height,
      className,
      innerTickSize,
      orientation,
      scale,
      tickArguments,
      tickDirection,
      tickPadding,
      tickValues,
      zero
    } = this.props;
    
    const activeScale = scale.rangeBand
      ? e => scale(e) + scale.rangeBand() / 2
      : scale;

    const sign = orientation === 'top' || orientation === 'left' ? -1 : 1;

    const ticks = getTicks(
      width,
      height,
      scale,
      tickArguments,
      tickValues,
      zero
    );
    const tickFormat =
      this.props.tickFormat || getTickFormat(scale, tickArguments);
    const tickSpacing = Math.max(innerTickSize, 0) + tickPadding;

    const tickOptions = {
      activeScale,
      innerTickSize,
      orientation,
      sign,
      tickDirection,
      tickFormat,
      tickSpacing
    };

    const tickElements = ticks.map((tick, index) =>
      getTickElement(tick, index, tickOptions)
    );

    const translate = getTranslateString(this.props);
    const axisBackground = <rect className="axis-background" fill="none" />;
    const pathData = getPathData({
      orientation,
      outerTickSize: this.props.outerTickSize,
      scale,
      sign
    });
    const pathElement = (
      <path className="domain" d={pathData} fill="none" stroke="#aaa" />
    );
    const labelElement = getLabelElement(label, className, width, orientation);

    return (
      <g
        className={className}
        transform={translate}
        style={{ shapeRendering: 'crispEdges' }}
      >
        {axisBackground}
        {tickElements}
        {pathElement}
        {labelElement}
      </g>
    );
  }
}

Axis.propTypes = {
  tickArguments: array,
  tickValues: array,
  tickFormat: func,
  tickDirection: oneOf(['horizontal', 'vertical', 'diagonal']),
  innerTickSize: number,
  tickPadding: number,
  outerTickSize: number,
  offset: number,
  scale: func.isRequired,
  className: string,
  zero: number,
  orientation: oneOf(['top', 'bottom', 'left', 'right']).isRequired,
  label: string,
  height: number.isRequired,
  width: number.isRequired
};

Axis.defaultProps = {
  margin: { top: 20, right: 30, bottom: 30, left: 40 },
  tickArguments: [6],
  tickValues: null,
  tickFormat: null,
  tickDirection: 'horizontal',
  innerTickSize: 6,
  tickPadding: 3,
  offset: 0,
  outerTickSize: 6,
  className: 'axis',
  zero: 0,
  label: ''
};

export default Axis;
