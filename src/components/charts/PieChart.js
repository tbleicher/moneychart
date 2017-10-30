import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import './PieChart.css';

function transactions_summary(allTransactions) {
  
  const transactions = allTransactions.filter(t => {
    return t.credit === 0;
  });

  var tags = new Set(
    transactions.map(function(t) {
      // tags[0] is undefined for untagged transactions
      return t.tags.length 
        ? t.tags[t.tags.length-1]
        : 'other';
    })
  );
  console.log(tags)

  let data = Array.from(tags).map(function(tag) {
    let tagged = transactions.filter(function(t, idx, arr) {
      // undefined matches untagged transactions
      return t.tags.length 
        ? (t.tags[t.tags.length-1] === tag)
        : 'other';
    });
    let total = tagged.reduce(function(memo, t) {
      return memo + t.debit;
    }, 0);

    return {
      // replace undefined with display name
      name: tag || 'other',
      count: tagged.length,
      total: total
    };
  });
  console.log(data);
  return data;
}

function createChart(dom, props) {
  var width = props.width;
  var height = props.height;
  var legendWidth = props.legendWidth;

  var margin = { left: 20, right: 20 + legendWidth, top: 20, bottom: 20 };

  var data = transactions_summary(props.data);
  var tagColors = new Map(props.tags.map(t => [t.label, t.color]));
  
  var sum = data.reduce(function(memo, num) {
    //return memo + num.count;
    return memo + num.total;
  }, 0);

  if (data.length === 0) {
    return;
  }

  var pieWidth = width - (margin.left + margin.right);
  var pieHeight = height - (margin.top + margin.bottom);
  var outerRadius = d3.min([pieWidth, pieHeight]) / 2;
  var innerRadius = outerRadius / 4;
  var offsetX = d3.max([pieWidth / 2, outerRadius]);
  var pieCentreX = margin.left + offsetX;
  var pieCentreY = margin.bottom + pieHeight / 2;

  d3.select('.dashboard .piechart').remove();
  var chart = d3
    .select('.dashboard')
    .append('svg')
    .attr('class', 'piechart')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + pieCentreX + ',' + pieCentreY + ')');

  d3.select('.piechart')
    .append('text')
    .attr('x', 20)
    .attr('y', 20)
    .attr('font-size', 20)
    .text(props.title);

  var arc = d3
    .arc()
    .outerRadius(outerRadius)
    .innerRadius(innerRadius);

  var pie = d3.pie().value(function(d) {
    //return d.count;
    return d.total;
  });

  var g = chart
    .selectAll('.arc')
    .data(pie(data))
    .enter()
    .append('g')
    .attr('class', 'arc')
    .on('click', function(d) {
      console.log('you clicked ' + d.data.name);
    })
    .on('mouseover', function(d, i) {
      d3
        .select(this)
        .transition()
        .duration(200)
        //.ease('bounce')
        .attr('transform', function(d) {
          var dist = 10;
          d.midAngle = (d.endAngle - d.startAngle) / 2 + d.startAngle;
          var x = Math.sin(d.midAngle) * dist;
          var y = -Math.cos(d.midAngle) * dist;
          return 'translate(' + x + ',' + y + ')';
        });

      d3
        .select(this)
        .append('text')
        .style('fill', function(d) {
          return tagColors.get(d.data.name) || '#969696';
        })
        .attr('id', 'percent')
        .attr('transform', 'translate(0,-5)')
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em')
        .style('font', 'bold 15px Arial')
        .text(function(d) {
          return (d.value / sum * 100).toFixed(1) + ' %';
        });
      g
        .filter(function(e) {
          return e.value !== d.value;
        })
        .style('opacity', 0.5);
    })
    .on('mouseout', function(d, i) {
      d3
        .select(this)
        .transition()
        .duration(200)
        //.ease('bounce')
        .attr('transform', 'translate(0,0)');
      d3.select('#percent').remove();
      g
        .filter(function(e) {
          return e.value !== d.value;
        })
        .style('opacity', 1);
    });

  g
    .append('path')
    .style('fill', function(d, i) {
      return tagColors.get(d.data.name) || '#969696';
    })
    .transition()
    .delay(function(d, i) {
      return i * 150;
    })
    .duration(200)
    .attrTween('d', function(d) {
      var i = d3.interpolate(d.startAngle, d.endAngle);
      return function(t) {
        d.endAngle = i(t);
        return arc(d);
      };
    });

  // var center = g.filter(function(d) {
  //     return d.endAngle - d.startAngle > .1;
  //   })
  //   .append("text").style("fill", "white")
  //   .attr('transform', function(d) {
  //     return "translate(" + arc.centroid(d) + ")";
  //   })
  //   .attr("text-anchor", "middle").attr("dy", ".35em")
  //   .text(function(d) {
  //     //return d.value;
  //     return d.value.toFixed(2);
  //   });

  var legendOffsetX = outerRadius + margin.left;
  var legendOffsetY = data.length * 10;
  var legend = chart
    .selectAll('.legend')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'legend')
    .attr('transform', function(d, i) {
      var yOffset = legendOffsetY - (i + 1) * 20;
      return 'translate(' + legendOffsetX + ',' + yOffset + ')';
    });

  var rect = legend
    .append('rect')
    .attr('width', 15)
    .attr('height', 15)
    .style('fill', function(d, i) {
      return tagColors.get(d.name) || '#969696';
    })
    .style('opacity', 0);

  var name = legend
    .append('text')
    .attr('x', 24)
    .attr('y', 12)
    .text(function(d) {
      var text = d.name;
      if (text.length > 30) {
        text = text.substring(0, 26);
        text += '...';
      }
      return text;
    })
    .style('opacity', 0);

  rect
    .transition()
    .delay(function(d, i) {
      return i * 100;
    })
    .duration(150)
    .style('opacity', 1);

  name
    .transition()
    .delay(function(d, i) {
      return i * 100;
    })
    .duration(150)
    .style('opacity', 1);
}

class PieChart extends React.Component {
  componentDidMount() {
    var dom = ReactDOM.findDOMNode(this);
    createChart(dom, this.props);
  }

  shouldComponentUpdate() {
    var dom = ReactDOM.findDOMNode(this);
    createChart(dom, this.props);
    return false;
  }

  render() {
    return (
      <div className="piechart">
        <h4>{this.props.title}</h4>
      </div>
    );
  }
}

PieChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  title: PropTypes.string,
  data: PropTypes.array,
  tags: PropTypes.array
};

PieChart.defaultProps = {
  data: [],
  tags: [],
  width: 300,
  height: 350,
  title: '',
  Legend: true,
  legendWidth: 100
};

export default PieChart;
