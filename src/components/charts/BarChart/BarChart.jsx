import React from "react";
import PropTypes from "prop-types";

import {
  scaleLinear,
  scaleTime,
  scaleOrdinal,
  schemeCategory20
} from "d3-scale";
import { timeFormat } from "d3-time-format";
import { nest } from "d3-collection";
import { extent, format } from "d3";

import Axis from "../Axis";
import Brush from "../Brush";
import ToolTip from "../ToolTip";

import Bar from "./Bar";

import "./BarChart.css";

function getTitle(title, margin, size = 20, offset = 10) {
  const x = 20;
  const y = size;
  return (
    <text x={x} y={y} fontSize={size}>
      {title}
    </text>
  );
}

function logWheelEvent(e) {
  console.log(`delta: Y: ${e.deltaY}`);
}

// extend range of transaction times by 12 hours left and right
function getXDomain(data) {
  const ex = extent(data.map(d => d.date || d.date));
  const start = new Date(ex[0].getTime() - 1000 * 60 * 60 * 12);
  const end = new Date(ex[1].getTime() + 1000 * 60 * 60 * 12);

  return [start, end];
}

class BarChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: "",
      ttX: 0,
      ttY: 0,
      ttOffset: 0,
      selectionStart: null,
      selectionEnd: null
    };
  }

  onBrush = (low, high) => {
    this.setState({ selectionStart: low, selectionEnd: high });
  };

  onMouseEnter = evt => {
    const x = evt.target.x.baseVal.value;
    const y = evt.target.y.baseVal.value;
    const width = evt.target.width.baseVal.value;
    const height = evt.target.height.baseVal.value;

    this.setState({
      hover: evt.target.id,
      ttX: x + width / 2,
      ttY: y + height / 2,
      ttOffset: width / 2 + 4
    });
  };

  onMouseLeave = evt => {
    this.setState({ hover: "" });
  };

  render() {
    const { data, tags, width, height, margin, title, onClick } = this.props;

    let { selectionStart, selectionEnd } = this.state;
    if (!selectionStart) {
      [selectionStart, selectionEnd] = getXDomain(data);
    }

    const tagColors = new Map(tags.map(t => [t.label, t.color]));
    const nested = nest()
      .key(function(d) {
        const date = d.date || d.date;
        return date.toISOString();
      })
      .entries(data);

    nested.forEach(pair => {
      let n = pair.values.length;
      let credits = pair.values.filter(t => t.amount > 0);

      if (credits.length === 0) {
        n = 1;
      }

      pair.values.forEach((v, i) => {
        if (n === 1) {
          v.perDay = [0, 1];
        } else {
          v.perDay = [i, n];
        }

        v.color = v.tags.length
          ? tagColors.get(v.tags[v.tags.length - 1])
          : "#cbcbcb";
      });
    });

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const displayData = data
      .filter(d => d.date >= selectionStart)
      .filter(d => d.date < selectionEnd);

    const xScale = scaleTime()
      .range([0, chartWidth])
      .domain([selectionStart, selectionEnd]);

    const xScaleBrush = scaleTime()
      .range([0, chartWidth])
      .domain(getXDomain(data));

    const extY = extent(
      data.map(d => d.balance - d.amount).concat(data.map(d => d.balance))
    );

    const yScale = scaleLinear().range([chartHeight, 0]).domain(extY);
    const yScaleBrush = scaleLinear().range([40, 0]).domain(extY);

    const evtListeners = {
      onClick,
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave
    };

    const bars = displayData.map((_data, idx) => (
      <Bar
        key={idx}
        data={_data}
        xScale={xScale}
        yScale={yScale}
        hover={this.state.hover}
        evtListeners={evtListeners}
      />
    ));
    const brushBars = displayData.map((_data, idx) => (
      <Bar key={idx} data={_data} xScale={xScaleBrush} yScale={yScaleBrush} />
    ));

    const { hover, ttX, ttY, ttOffset } = this.state;
    const tooltip = this.props.data
      .filter(d => d.id === hover)
      .map(d => (
        <ToolTip
          x={ttX}
          y={ttY}
          color={d.color}
          data={d}
          key={d.id}
          offset={ttOffset}
          chartWidth={chartWidth}
        />
      ));

    return (
      <svg
        className="barchart"
        width={width}
        height={height}
        onWheel={logWheelEvent}
      >
        {title && getTitle(title, margin)}
        <defs>
          <clipPath id="barclip">
            <rect
              className="mainchart"
              x={0}
              y={0}
              width={width - margin.left - margin.right}
              height={height - margin.top - margin.bottom}
            />
          </clipPath>
        </defs>
        <g
          transform={`translate(${margin.left},${margin.top})`}
          clipPath="url(#barclip)"
        >
          {bars}
          {tooltip}
        </g>

        <Axis
          orientation="bottom"
          scale={xScale}
          width={chartWidth}
          height={chartHeight}
          offset={10}
          tickArguments={[6]}
          tickFormat={timeFormat("%d %b %y")}
          margin={margin}
        />

        <Axis
          orientation="left"
          scale={yScale}
          width={chartWidth}
          height={chartHeight}
          offset={10}
          margin={margin}
          tickFormat={format("($.2f")}
        />

        <Brush
          x={margin.left}
          y={height - 60}
          width={chartWidth}
          height={40}
          xScale={xScaleBrush}
          selectionStart={this.state.selectionStart}
          selectionEnd={this.state.selectionEnd}
          onBrush={this.onBrush}
        >
          {brushBars}
        </Brush>
      </svg>
    );
  }
}

BarChart.defaultProps = {
  width: 900,
  height: 400,
  margin: { top: 45, right: 20, bottom: 100, left: 80 },
  colorFunc: scaleOrdinal(schemeCategory20),
  onClick: evt => {
    console.info("clicked", evt.target.id);
  },
  hideToolTip: () => {},
  showToolTip: () => {},
  selectedArea: "",
  title: "BarChart"
};

BarChart.propTypes = {
  data: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.object,
  colorFunc: PropTypes.func,
  onClick: PropTypes.func,
  hideToolTip: PropTypes.func,
  showToolTip: PropTypes.func,
  selectedArea: PropTypes.string,
  title: PropTypes.string
};

export default BarChart;
