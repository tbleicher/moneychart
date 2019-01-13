import React from "react";

import { area, stack } from "d3-shape";
import { curveStepAfter } from "d3";

import { interpolateData } from "./utils";

const getAccountStyle = (key, data, style) => {
  const account = data.find(acc => acc.name === key);

  if (!account) return style;

  return { ...style, fill: account.color || style.fill };
};

const StackLayout = props => {
  const { data, style, xScale, yScale } = props;

  // fix missing data and build array of objects with [name, balance] info
  const values = interpolateData(data);

  const stackGenerator = stack().keys(data.map(d => d.name));
  const series = stackGenerator(values);

  const areaGenerator = area()
    .x(d => xScale(d.data.date))
    .y1(d => yScale(d[0]))
    .y0(d => yScale(d[1]))
    .curve(curveStepAfter);

  const paths = series.map((accData, index) => {
    const string = areaGenerator(accData);
    const _style = getAccountStyle(accData.key, data, style);

    return <path key={accData.key} d={string} style={_style} />;
  });

  return <g>{paths}</g>;
};

StackLayout.defaultProps = {
  style: {
    fill: "green",
    fillOpacity: 0.5
    // stroke: "black"
    // strokeWidth: "0.5px"
  }
};

export default StackLayout;
