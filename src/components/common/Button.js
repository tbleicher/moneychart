import React from 'react';
import './ConditionalButton.css';


export default class Button extends React.Component {
  render() {
    return (
      <div onClick={this.props.onClick} className='cbutton'>
        {this.props.label}
      </div>
    );
  }
}
