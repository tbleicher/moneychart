import React from "react";
import ReactDOM from "react-dom";
import { PropTypes } from "prop-types";

import Section from "../Section";
import { ChartContainer, PieChart } from "../charts";

import "./Dashboard.css";
import AccountsSelector from "./AccountsSelector";

class Dashboard extends React.Component {
  static propTypes = {
    accounts: PropTypes.array.isRequired
  };

  static defaultProps = {
    accounts: []
  };

  constructor(props) {
    super(props);
    this.state = {
      title: "Overview",
      width: 900
    };

    this.updateSize = this.updateSize.bind(this);
    this.updateSizeListener = this.updateSizeListener.bind(this);
  }

  componentDidMount() {
    this.updateSize();
  }

  componentWillMount() {
    window.addEventListener("resize", this.updateSizeListener);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateSizeListener);
  }

  updateSize() {
    const node = ReactDOM.findDOMNode(this);
    this.setState({ width: node.offsetWidth });
  }

  updateSizeListener(e) {
    this.updateSize();
  }

  renderSelector = () => {
    const { accounts } = this.props;

    return (
      <div className="account-selector">
        {accounts.map(acc => (
          <span key={acc.id}>
            <input type="checkbox" name="checkbox" id={acc.id} value="value" />
            <label htmlFor={acc.id}>{acc.name}</label>
          </span>
        ))}
      </div>
    );
  };

  render() {
    const height = 400;
    const pieWidth = 340;
    const barWidth = this.state.width - pieWidth - 60;

    const accounts = this.props.accounts.filter(acc => acc.display);
    const selected = this.props.accounts.find(acc => acc.selected);

    if (!this.props.accounts.length) {
      return (
        <section className="views">
          <h2>{this.state.title}</h2>
          <div className="dashboard">
            <span>waiting for data</span>
          </div>
        </section>
      );
    }

    return (
      <Section title="Overview">
        <AccountsSelector />
        <div className="dashboard">
          <div>
            <ChartContainer
              title="Bar Chart"
              accounts={accounts}
              data={selected ? selected.transactions : []}
              tags={selected ? selected.tags : []}
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
        </div>
      </Section>
    );
  }
}

export default Dashboard;
