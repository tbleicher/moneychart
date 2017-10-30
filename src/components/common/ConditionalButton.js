import React from 'react';
import styles from './ConditionalButton.css';


export default class ConditionalButton extends React.Component {
  render() {
    if (this.props.count === 0) {
      return null;
    } else {
      return (
        <div onClick={this.props.onClick} className={styles.cbutton}>
          deselect all
        </div>
      );
    }
  }
}
