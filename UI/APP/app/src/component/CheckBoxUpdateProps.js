
import React from 'react';

class CheckBoxUpdateProps extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: this.props.value, 
      updateProps: this.props.updateProps,
    }
    this.updateValue = this.updateValue.bind(this);
  }

  updateValue() {
    const value = !this.state.value;
    this.setState({
      value,
    })
    this.state.updateProps(value);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      ...nextProps,
    })
  }

  render() {
    return (
      <div className="form-check col-md-auto" >
        <input className="form-check-input" type="checkbox" value="ddd" id="defaultCheck1" onChange={this.updateValue} checked={this.state.value}></input>
        <label className="form-check-label" htmlFor="defaultCheck1">
          frame
        </label>
      </div>
    )
  }
}

export default CheckBoxUpdateProps;