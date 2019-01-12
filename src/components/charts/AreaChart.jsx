import React from "react";
import PropTypes from "prop-types";

import { curveStepAfter } from "d3";

import { area } from "d3-shape";

const AreaChart = props => {
  const { data, style, xScale, yScale } = props;

  const string = area()
    .x(d => xScale(d.date))
    .y1(d => yScale(d.balance))
    .curve(curveStepAfter)
    .y0(yScale(0))(data);

  return <path d={string} style={style} />;
};

AreaChart.propTypes = {
  data: PropTypes.array.isRequired,
  style: PropTypes.object,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired
};

AreaChart.defaultProps = {
  style: {
    fill: "yellow",
    fillOpacity: 0.5,
    stroke: "none",
    strokeWidth: "3px"
  }
};

export default AreaChart;
