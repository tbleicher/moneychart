import React from 'react';
import Dashboard from './Dashboard';

//import './Dashboard.css';


export default class DashboardView extends React.Component {

  render() {
    return (
      <div>
        <section className='views'>
          <h1>Dashboard</h1>
          <Dashboard />
        </section>
      </div>
    );
  }
}
