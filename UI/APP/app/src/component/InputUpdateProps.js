import React from 'react';

class InputUpdateProps extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: this.props.value, 
      name: this.props.name,
      updateProps: this.props.updateProps,
    }
  }

  updateInput(value) {
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
      <div className="input-group input-group-sm mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" >{this.state.name}:</span>
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