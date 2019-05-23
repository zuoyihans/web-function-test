import React from 'react';

class InputUpdateProps extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: this.props.value, 
    }
  }

  updateInput(value) {
    this.setState({
      value,
    })
    this.props.updateProps(value);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      value: nextProps.value,
    })
  }

  render() {
    return (
      <div className="input-group input-group-sm mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" >{this.props.name}:</span>
        </div>
        <input
          type="text" className="form-control" 
          value={this.state.value}
          onChange={e => this.updateInput(e.target.value)}
        />
      </div>
    )
  }
}

export default InputUpdateProps;