import React from "react";
import PropTypes from "prop-types";

const _12H = 12 * 60 * 60 * 1000;

const Bar = props => {
  const { data, xScale, yScale, hover, evtListeners } = props;

  const xDate = new Date(data.date.getTime() - _12H);
  const dW = xScale(new Date(data.date.getTime() + _12H)) - xScale(xDate);
  const gap = 0.2 * dW > 10 ? 10 : 0.2 * dW;
  const wDay = dW - gap;
  // const offset = (data.perDay[0] * wDay) / data.perDay[1];
  const offset = 0;

  const x = xScale(xDate) + gap / 2 + offset;
  // const w = wDay / data.perDay[1] > 1 ? wDay / data.perDay[1] : 1;
  const w = wDay;

  const y1 = yScale(Math.min(data.balance, data.balance - data.amount));
  const y2 = yScale(Math.max(data.balance, data.balance - data.amount));

  const y = Math.min(y1, y2);
  const h = Math.abs(y1 - y2);

  let opacity = 0.9;
  if (hover !== "" && hover !== data.id) {
    opacity = 0.5;
  }

  const style = {
    fill: data.color || "#cbcbcb",
    opacity
  };

  return (
    <rect
      className="barchart bar"
      key={data.id}
      id={data.id}
      x={x}
      y={y}
      width={w}
      height={h}
      style={style}
      {...evtListeners}
    />
  );
};

Bar.propTypes = {
  data: PropTypes.object.isRequired,
  evtListeners: PropTypes.object.isRequired,
  hover: PropTypes.string.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired
};

Bar.defaultProps = {
  hover: "",
  evtListeners: {}
};

export default Bar;
