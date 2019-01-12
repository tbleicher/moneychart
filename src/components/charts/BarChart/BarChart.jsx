import React from "react";
import PropTypes from "prop-types";

import Bar from "./Bar";

import "./BarChart.css";

const BarChart = props => {
  const { data, xScale, yScale, hover, evtListeners } = props;

  const bars = data.map((_data, idx) => (
    <Bar
      key={idx}
      data={_data}
      xScale={xScale}
      yScale={yScale}
      hover={hover}
      evtListeners={evtListeners}
    />
  ));

  return <g>{bars}</g>;
};

BarChart.propTypes = {
  data: PropTypes.array.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  hover: PropTypes.string,
  evtListeners: PropTypes.object
};

export default BarChart;
