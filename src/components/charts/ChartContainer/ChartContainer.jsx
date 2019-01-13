import React from "react";
import PropTypes from "prop-types";

import { format } from "d3";
import {
  scaleLinear,
  scaleTime,
  scaleOrdinal,
  schemeCategory20
} from "d3-scale";
import { timeFormat } from "d3-time-format";

import Axis from "../Axis";
import Brush from "../Brush";
import ToolTip from "../ToolTip";

import BarChart from "../BarChart";
import LineChart from "../LineChart";
import StackedLayout from "../StackLayout";

import { getXDomain, getYDomain, nestData } from "./utils";

import "./ChartContainer.css";

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

const getChartSize = ({ height, margin, width }) => {
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  return { chartHeight, chartWidth };
};

const getScales = (data, chartWidth, chartHeight) => {
  const extX = getXDomain(data);
  const extY = getYDomain(data);

  const xScale = scaleTime()
    .range([0, chartWidth])
    .domain(extX);

  const yScale = scaleLinear()
    .range([chartHeight, 0])
    .domain(extY);

  return [xScale, yScale];
};

class ChartContainer extends React.Component {
  constructor(props) {
    super(props);

    const { chartWidth, chartHeight } = getChartSize(props);

    const displayData = props.data ? [...props.data] : [];
    displayData.sort((a, b) => a.date - b.date);

    this.state = {
      displayData,
      chartHeight,
      chartWidth,
      hover: "",
      ttX: 0,
      ttY: 0,
      ttOffset: 0,
      selectionStart: null,
      selectionEnd: null
    };
  }

  componentWillReceiveProps(nextProps) {
    const { chartWidth, chartHeight } = getChartSize(nextProps);

    if (!this.state.xScale || nextProps.data !== this.props.data) {
      const [xScale, yScale] = getScales(
        nextProps.data,
        chartWidth,
        chartHeight
      );
      const [xScaleBrush, yScaleBrush] = getScales(
        nextProps.data,
        chartWidth,
        40
      );

      this.setState({ xScale, yScale, xScaleBrush, yScaleBrush });
    }

    this.setState({
      chartWidth,
      chartHeight
    });
  }

  getEventListeners = () => {
    return {
      onClick: this.props.onClick,
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave
    };
  };

  onBrush = (selectionStart, selectionEnd) => {
    const { data } = this.props;

    const displayData = data
      .filter(d => d.date >= selectionStart)
      .filter(d => d.date < selectionEnd);
    // sort data for line chart
    displayData.sort((a, b) => a.date - b.date);

    const xScale = scaleTime()
      .range([0, this.state.chartWidth])
      .domain([selectionStart, selectionEnd]);

    this.setState({
      displayData,
      selectionStart,
      selectionEnd,
      xScale
    });
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

  renderAxis = (orientation, options = {}) => {
    const { margin } = this.props;
    const { chartWidth, chartHeight } = this.state;

    const scale =
      orientation === "bottom" ? this.state.xScale : this.state.yScale;

    return (
      <Axis
        orientation={orientation}
        scale={scale}
        width={chartWidth}
        height={chartHeight}
        offset={10}
        margin={margin}
        {...options}
      />
    );
  };

  renderBars = () => {
    const { displayData, hover, xScale, yScale } = this.state;

    return (
      <BarChart
        data={displayData}
        xScale={xScale}
        yScale={yScale}
        hover={hover}
        evtListeners={this.getEventListeners()}
      />
    );
  };

  renderBrush = () => {
    const { height, margin } = this.props;
    const {
      chartWidth,
      displayData,
      selectionStart,
      selectionEnd,
      xScaleBrush,
      yScaleBrush
    } = this.state;

    return (
      <Brush
        x={margin.left}
        y={height - 60}
        width={chartWidth}
        height={40}
        xScale={xScaleBrush}
        selectionStart={selectionStart}
        selectionEnd={selectionEnd}
        onBrush={this.onBrush}
      >
        <BarChart
          data={displayData}
          xScale={xScaleBrush}
          yScale={yScaleBrush}
        />
      </Brush>
    );
  };

  renderChartContent = () => {
    const { accounts, margin } = this.props;
    const { displayData, xScale, yScale } = this.state;

    const groupOptions = {
      transform: `translate(${margin.left},${margin.top})`,
      clipPath: "url(#chartclip)"
    };

    if (accounts.length > 1) {
      return (
        <g {...groupOptions}>
          <StackedLayout data={accounts} xScale={xScale} yScale={yScale} />
        </g>
      );
    }

    return (
      <g {...groupOptions}>
        <StackedLayout data={accounts} xScale={xScale} yScale={yScale} />
        {this.renderBars()}
        {this.renderTooltip()}

        {/* <AreaChart data={displayData} xScale={xScale} yScale={yScale} /> */}

        <LineChart data={displayData} xScale={xScale} yScale={yScale} />
      </g>
    );
  };

  renderTooltip = () => {
    const { chartWidth, hover, ttX, ttY, ttOffset } = this.state;

    return this.props.data
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
  };

  render() {
    const { data, tags, width, height, margin, title } = this.props;
    const { xScale } = this.state;

    // skip rendering if scale has not been calculated via willReceiveProps
    if (!xScale) return null;

    const tagColors = new Map(tags.map(t => [t.label, t.color]));
    nestData(data, tagColors);

    return (
      <svg
        className="barchart"
        width={width}
        height={height}
        onWheel={logWheelEvent}
      >
        {title && getTitle(title, margin)}
        <defs>
          <clipPath id="chartclip">
            <rect
              className="mainchart"
              x={0}
              y={0}
              width={width - margin.left - margin.right}
              height={height - margin.top - margin.bottom}
            />
          </clipPath>
        </defs>

        {this.renderChartContent()}

        {this.props.axisLeft &&
          this.renderAxis("left", { tickFormat: format("($.2f") })}

        {this.props.axisBottom &&
          this.renderAxis("bottom", {
            tickArguments: [6],
            tickFormat: timeFormat("%d %b %y")
          })}

        {this.props.brush && this.renderBrush()}
      </svg>
    );
  }
}

ChartContainer.defaultProps = {
  accounts: [],
  axisLeft: true,
  axisBottom: true,
  brush: true,
  data: [],
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
  tags: [],
  title: "ChartContainer"
};

ChartContainer.propTypes = {
  accounts: PropTypes.array.isRequired,
  axisLeft: PropTypes.bool,
  axisBottom: PropTypes.bool,
  brush: PropTypes.bool,
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

export default ChartContainer;
