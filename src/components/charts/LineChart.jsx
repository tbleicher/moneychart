import React from "react";
import PropTypes from "prop-types";

import { curveStepAfter } from "d3";

import { line } from "d3-shape";

const LineChart = props => {
  const { data, style, xScale, yScale } = props;

  const string = line()
    .x(d => xScale(d.date))
    .y(d => yScale(d.balance))
    .curve(curveStepAfter)(data);

  return <path d={string} style={style} />;
};

LineChart.propTypes = {
  data: PropTypes.array.isRequired,
  style: PropTypes.object,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired
};

LineChart.defaultProps = {
  style: {
    fill: "none",
    stroke: "#a00",
    strokeWidth: "3px"
  }
};

export default LineChart;
