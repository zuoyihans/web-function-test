import React from 'react';

class InputUpdateProps extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: this.props.value, 
      name: this.props.name,
      updateProps: this.props.updateProps,
    }
    // this.updateInput = this.updateInput.bind(this);
    // this.updateInput4Blur = this.handleBlur.bind(this);
  }

  handleBlur(e) {
    this.state.updateProps(this.state.value);
  }

  handleKeyUp(e) {
    if (e.keyCode === 13) {
      this.state.updateProps(this.state.value);
    }
  }

  updateInput(value) {
    this.setState({
      value,
    });
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      ...nextProps,
    })
  }

  render() {
    return (
      <div className="input-group input-group-sm">
        <div className="input-group-prepend">
          <span className="input-group-text" >{this.state.name}:</span>
        </div>
        <input
          type="text" className="form-control" 
          value={this.state.value}
          onChange={e => this.updateInput(e.target.value)}
          onKeyUp={e => this.handleKeyUp(e)}
          onBlur={e => this.handleBlur(e)}
        />
      </div>
    )
  }
}

export default InputUpdateProps;