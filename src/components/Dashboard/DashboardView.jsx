import React from "react";
import DashboardContainer from "./DashboardContainer";

export default class DashboardView extends React.Component {
  render() {
    return (
      <div>
        <section className="views">
          <h1>Dashboard</h1>
          <DashboardContainer />
        </section>
      </div>
    );
  }
}
