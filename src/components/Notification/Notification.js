import React from 'react';
import './Notification.css';

export default class Notification extends React.Component {
  render() {
  	if (this.props.message === '') {
  		return null;
  	}
  	else {
	  return (
        <div className='notification'>
          {this.props.message}
        </div>
      );
    }
  }
}