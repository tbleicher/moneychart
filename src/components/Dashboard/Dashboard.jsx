import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import Section from '../Section'; 
import { BarChart, PieChart } from '../charts';

import './Dashboard.css';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Overview',
      width: 900
    };

    this.updateSize = this.updateSize.bind(this);
    this.updateSizeListener = this.updateSizeListener.bind(this);
  }

  componentDidMount() {
    this.updateSize();
  }

  componentWillMount() {
    window.addEventListener('resize', this.updateSizeListener);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSizeListener);
  }

  updateSize() {
    const node = ReactDOM.findDOMNode(this);
    this.setState({ width: node.offsetWidth });
  }

  updateSizeListener(e) {
    this.updateSize();
  }

  render() {
    const height = 400;

    if (!this.props.transactions.length) {
      return (
        <section className="views">
        <h2>{this.state.title}</h2>
        <div className="dashboard">
          <span>waiting for data</span>
        </div>
        </section>
      );
    } else {
      const pieWidth = 340;
      const barWidth = this.state.width - pieWidth - 60;

      return (
        <Section title="Overview">
          <div className="dashboard">
            <BarChart
              title="Bar Chart"
              data={this.props.transactions}
              tags={this.props.tags}
              width={barWidth}
              height={height}
            />
            <PieChart
              title="Expenses Breakdown"
              data={this.props.transactions}
              tags={this.props.tags}
              width={pieWidth}
            />
          </div>
        </Section>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    transactions: state.transactions,
    tags: state.tags
  };
}

export default connect(mapStateToProps)(Dashboard);
