import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import { TagColors } from '../../stores/TagConfig';

import './BarChart.css';


function createChart(dom, props) {

  // move text label to centre of ticks
  function adjustTextLabels(selection) {
    selection.selectAll('.tick text')
      .attr('transform', 'translate(' + daysToPixels(1, xScale) / 2 + ',0)');
  }

  // calculate the width of the days in the timeScale
  function daysToPixels(days, timeScale) {
    var d1 = new Date();
    return timeScale(d3.timeDay.offset(d1, days)) - timeScale(d1);
  }

  function drawBarChart(data, range) {

    // get range from data or reduce _data to given range
    if (!range) {
      range = getDateRange(data);
    } else {
      data = getDataSlice(data, range);
      console.log('data points:', data.length)
    }

    // check that there is something to draw
    if (data.length === 0) {
      console.warn('no data points in selection');
      return;
    }

    var days = d3.timeDay.range(range[0],range[1]);
    var barGap = 10;
    var barWidth = (width-(margin.left+margin.right)) / days.length - barGap;

    // adjust x and y axes
    xScale.domain(range)
    chart.select('.chart_x')
      .transition().duration(500)
      .call(xAxis);

    yScale.domain(getBalanceDomain(data, 0.05));
    yScale.nice();
    chart.select('.chart_y')
      .transition().duration(500)
      .call(yAxis);

    // main chart content
    chart.selectAll('.bar').remove();

    var barGroup = chart.selectAll(".bar")
        .data(data);

    barGroup.enter()
      .append("rect")
        .attr("class", "barchart bar")
        .attr("x", function(d) {
          const barOffset = d.perDay[0]*barWidth/d.perDay[1];
          const _x = xScale(d.valueDate) + barGap/2 + barOffset;
          d.x = _x;
          return _x}
        )
        .attr("width", function (d) {
          return barWidth/d.perDay[1];
          return d.credit === 0 ? barWidth : 2;
        })
        .attr("y", function(d) {
          if (d.credit === 0) {
            var _y = yScale(d.balance+d.debit);
          } else {
            var _y = yScale(d.balance);
          }
          d.y = _y;
          return _y;
        })
        .attr("height", function(d) {
          if (d.credit === 0) {
            return (yScale(d.balance)-yScale(d.balance+d.debit));
          } else {
            return (yScale(d.balance)-yScale(d.balance+d.credit));
          }
        })
        .style("fill", function(d, i) { return d.color; })
        .style("stroke", '#888')

      .on('mouseover', function(d, i) {

        // fade other bars
        barGroup.filter(function(e) {
          return e.color !== d.color;
        }).style('opacity', 0.5);

        // tooltip position
        var ttX = this.x.baseVal.value + this.width.baseVal.value;
        var ttY = this.y.baseVal.value + this.height.baseVal.value/2;
        // move tooltip to the left if close to right edge
        if ( (ttX+ttWidth) > chartWidth ) {
          ttX = this.x.baseVal.value - ttWidth - 4;
        }

        // show tooltip
        tooltip.transition()
          .duration(200)
          .style("opacity", 0.9)
          .attr('transform', 'translate(' + (ttX+2) + ',' + (ttY-23) + ')');

        tooltip.select('rect')
          .style("fill", d.color);

        tooltipText(tooltip, d);
      })

      .on('mouseout', function(d, i) {
        barGroup.filter(function(e) {
          return e.color !== d.color;
        }).style('opacity', 0.9);

        // hide tooltip
        tooltip.transition()
          .duration(200)
          .style("opacity", 0);
      })


    // (re)define tooltip to keep above bars
    chart.select('tooltip').remove();

    var tooltip = chart.append('g')
      .attr("class", 'tooltip')
      .style("opacity", 0);

    tooltip.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr("width", ttWidth)
      .attr("height", 46);

    // end function drawBarChart()
  }


  // return data within time range
  function getDataSlice(data, range) {
    const slice = data.filter( function(d) {
      return ((d.valueDate >= range[0]) && (d.valueDate < range[1]));
    });
    return slice;
  }

  // get time range of data
  function getDateRange(data) {
    var dates = data.map(function(d) { return d.valueDate; });
    dates = dates.sort(function(a,b) { return a-b; } );
    var d1 = d3.timeDay.floor(dates[0]);
    var d2 = d3.timeDay.offset(dates[dates.length-1], 1);
    return [d1,d2];
  }

  // return (padded) domain of balance values
  function getBalanceDomain(data, padding=0.0) {
    var higher = d3.max(data.map( function(d) { return d.balance+d.debit; } ));
    var lower = d3.min(data.map( function(d) { return d.balance-d.credit; } ));
    var d_size = higher-lower;
    return [lower-padding*d_size,higher+padding*d_size]
  }

  function onBrush() {
    var selection = d3.event.selection;
    console.log('onBrush selection:', selection)
    const inv = selection.map(xScaleBrush.invert, xScaleBrush);
    const low = d3.timeDay.floor(inv[0]);
    const high = d3.timeDay.ceil(inv[1]);
    console.log('        low,high:', low, high)
    //XXX
    // console.log('onBrush() brush.extent:', brush.extent());
  }

  function onBrushEnd(e) {
    const ext = brush.extent()();
    const low = d3.timeDay.floor(ext[0]);
    const high = d3.timeDay.ceil(ext[1]);
    const extent = brush.extent()();

    //console.log('onBrushEnd() brush.extent:', );
    drawBarChart(_data, [low,high]);
  }

  // create SVG text elements in tooltip
  function tooltipText(tooltip, data) {
    var lines = [
      data.debit !== 0 ? 'debit: ' + formatCurrency(data.debit) : 'credit: ' + formatCurrency(data.credit),
      'balance: ' + formatCurrency(data.balance),
      'date: ' + formatTime(data.valueDate)];

    tooltip.selectAll('text').remove();
    lines.forEach( function(line, i) {
      tooltip.append('text')
       .text(line)
       .attr('x', 4)
       .attr('y', (i+1)*14);
    });
  }

  // check if we have data for the chart
  const _data = props.data;
  if (_data.length === 0) {
    return;
  }

  // asign colors from app config
  _data.forEach( function (d) {
    d.color = TagColors.get(d.tags[0]) || "#999";
  });

  // group by day to adjust bar width
  const nested = d3.nest()
    .key(function(d) { return d.valueDate.toISOString(); })
    .entries(_data);
  nested.forEach(pair => {
    const n = pair.values.length;
    console.log(n, pair.values[0].valueDate.toISOString());
    pair.values.forEach((v,i) => v.perDay = [i,n])
  });

  // chart geometry
  var width = props.width;
  var height = props.height;
  var contextHeight = 40;

  var margin = {left: 40, right: 10, top: 25, bottom: 25};

  var chartWidth = width - (margin.left+margin.right);
  var chartHeight = height - (margin.top+margin.bottom+contextHeight+20);
  var ttWidth = 120;

  // string formatters
  //var formatCurrency = d3.format('$,2f');
  var formatCurrency = function(n) {
    return `$${n}`;
  }
  var formatDate = d3.timeFormat("%d %b");
  var formatTime = d3.timeFormat("%e %B");

  // d3 setup of scales and domain
  var range = getDateRange(_data);

  var xScale = d3.scaleTime()
    .range([0, chartWidth]);

  var xScaleBrush = d3.scaleTime()
    .range([0, chartWidth]);

  var xAxis = d3.axisBottom()
    .scale(xScale)
    .tickFormat(formatDate);

  var xAxisContext = d3.axisBottom()
    .scale(xScaleBrush)
    .tickFormat(formatDate);

  xScale.domain([range[0],range[1]]);
  xScaleBrush.domain([range[0],range[1]]);

  var yScale = d3.scaleLinear()
    .range([chartHeight, 0]);

  var yContext = d3.scaleLinear()
    .range([contextHeight, 0]);

  var yAxis = d3.axisLeft()
    .scale(yScale);

  var yAxisContext = d3.axisLeft()
    .scale(yContext);

  var brush = d3.brushX()
    .extent([[0,0], [chartWidth,contextHeight]])
    .on("brush", onBrush)
    .on("end", onBrushEnd);

  // initiate domains to range of full data
  yScale.domain(getBalanceDomain(_data, 0.05));
  yScale.nice();
  yContext.domain(getBalanceDomain(_data));
  yContext.nice();

  // first remove all elements (on reload of chart)
  //d3.selectAll('svg').remove();

  var chart = d3.select('.oldchart')
    //.append('svg')
    .attr('class', 'd3')
    .attr('width', width)
    .attr('height', height)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.bottom + ")");

  chart.append("defs")
    .append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", chartWidth)
    .attr("height", chartHeight);


  var context = chart.append("g")
    .attr("class", 'context')
    .attr("transform", "translate(0," + (chartHeight+20) + ")")
    //.attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

  // xAxis of context
  context.append("g")
    .attr("class", 'x axis')
    .attr("transform", "translate(0," + (contextHeight) + ")")
    .call(xAxis)

  // area chart of context
  var areaContext = d3.area()
    //.interpolate("monotone")
    .x(function(d) { return xScaleBrush(d.valueDate); })
    .y0(contextHeight)
    .y1(function(d) { return yContext(d.balance); });

  context.append("path")
      .datum(_data)
      .attr("class", 'area')
      .attr("d", areaContext);

  // brush
  context.append("g")
      .attr("class", 'x brush')
      .call(brush)
      .selectAll("rect")
      .attr("y", -6)
      .attr("height", contextHeight + 7);

  var focus = chart.append("g")
    .attr("class", "focus")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // xAxis of main chart
  chart.append("g")
    .attr("class", 'x axis chart_x')
    .attr("transform", "translate(0," + (chartHeight) + ")")
    .call(xAxis)
    .call(adjustTextLabels);

  // yAxis of main chart
  chart.append("g")
      .attr("class", 'y axis chart_y')
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Balance");


  drawBarChart(_data);

};

var BarChartD3 = React.createClass({

  propTypes: {
    width: PropTypes.number,
    height: PropTypes.number,
    title: PropTypes.string,
    data: PropTypes.array,
  },

  getDefaultProps: function() {
    return {
      data: [],
      width: 300,
      height: 350,
      title: '',
      Legend: true,
    };
  },

  render: function() {
    return (
      <div className="barchart">
        <h4>{this.props.title}</h4>
      </div>
    );
  },

  componentDidMount: function() {
    var dom = ReactDOM.findDOMNode(this);
    createChart(dom, this.props);
  },

  shouldComponentUpdate: function() {
    var dom = ReactDOM.findDOMNode(this);
    createChart(dom, this.props);
    return false;
  }
});

module.exports = BarChartD3;
