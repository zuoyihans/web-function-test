import React from 'react';
import InputUpdateProps from './InputUpdateProps';

class Step extends React.Component {
  constructor(props){
    super(props)
    this.state={
      ...this.props,
    }
    // this.updateDescription = this.updateDescription.bind(this);
    // this.createUpdator = this.createUpdator.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      ...nextProps,
    })
  }

  // updateDescription(value){
  //   const tmpstate = {...this.state.step};
  //   tmpstate.description = value;
  //   this.setState({
  //     step: tmpstate,
  //   });
  //   this.state.updateProps(this.state.index, tmpstate);
  // }

  // updateKeyValue(key, value){
  //   const tmpstate = {...this.state.step};
  //   tmpstate[key] = value;
  //   this.setState({
  //     step: tmpstate,
  //   });
  //   this.state.updateProps(this.state.index, tmpstate);
  // }

  createUpdator(key){
    let updateProps = (value) => {
      const tmpstate = {...this.state.step};
      tmpstate[key] = value;
      this.setState({
        step: tmpstate,
      });
      this.state.updateProps(this.state.index, tmpstate);
    }
    updateProps = updateProps.bind(this);
    return updateProps
  }

  render() {
    return (
      <div>
        <h6>step: {this.state.step.description}</h6>
        <InputUpdateProps name={`step${this.state.index + 1}`} value={this.state.step.description} updateProps={this.createUpdator('description')}></InputUpdateProps>  
      </div>
    )
  }
}

export default Step;