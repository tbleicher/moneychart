import React from 'react';
import PropTypes from 'prop-types';
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';

const presetColors = [
  '#3182bd', // blue
  '#6baed6',
  '#9ecae1',
  '#c6dbef', 
  '#e6550d', // orange
  '#fd8d3c',
  '#fdae6b',
  '#fdd0a2', 
  '#31a354', // green
  '#74c476',
  '#a1d99b',
  '#c7e9c0', 
  '#756bb1', // violet
  '#9e9ac8',
  '#bcbddc',
  '#dadaeb', 
  '#636363', // grey
  '#969696',
  '#bdbdbd',
  '#d9d9d9',
  '#0000ff', // blue
  '#ff0000', // red
  '#009900', // green 
  '#000000'  // black
]; 

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayColorPicker: false,
      hex: props.hex
    };
  }

  componentWillReceiveProps(props) {
    if (props.hex !== this.state.hex) {
      this.setState({ hex: props.hex });
    }
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
    if (this.props.hex !== this.state.hex) {
      this.props.onChangeColor(this.state.hex);
    }
  };

  handleChange = color => {
    this.setState({ hex: color.hex });
  };

  render() {
    const styles = reactCSS({
      default: {
        color: {
          padding: '0',
          width: '36px',
          height: '18px',
          border: '1px solid #cbcbcb',
          borderRadius: '2px',
          background: this.state.hex
        },
        swatch: {
          padding: '1px',
          background: '#fff',
          borderRadius: '1px',
          display: 'inline-block',
          cursor: 'pointer'
        },
        popover: {
          position: 'absolute',
          zIndex: '2'
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px'
        }
      }
    });
    return (
      <div>
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color} />
        </div>

        {this.state.displayColorPicker ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <SketchPicker
              color={this.state.hex}
              onChangeComplete={this.handleChange}
              presetColors={presetColors}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

ColorPicker.propTypes = {
  hex: PropTypes.string,
  onChangeColor: PropTypes.func
};

ColorPicker.defaultProps = {
  hex: '#969696',
  onChangeColor: () => {}
};

export default ColorPicker;
