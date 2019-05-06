import React from 'react';
import { connect } from 'react-redux';
import InputUpdateProps from './InputUpdateProps';
import Step from './Step';


const mapStateToProps = state => { 
  const { cunrrentComponentFile } = state.ComponentFile;
  return { cunrrentComponentFile };
};

class MainMiddle extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      description: this.props.cunrrentComponentFile.description,
      actions: [...this.props.cunrrentComponentFile.actions],
    };
    this.updateDescription = this.updateDescription.bind(this);
    this.updateStep = this.updateStep.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      description: nextProps.cunrrentComponentFile.description,
      actions: [...nextProps.cunrrentComponentFile.actions],
    })
  }
  updateDescription(value){
    this.setState({
      description:value,
    })
  }
  updateStep(index,step) {
    const tmpactions = [...this.state.actions];
    tmpactions[index] = {...step};
    this.setState(
      {
        actions: tmpactions,
      }
    )
  }

  render(){
    return (
      <div className="col-sm-6 auto-mx border">
        component detail
        {/* <h5> {this.state.description}</h5> */}
        <InputUpdateProps name="description" value={this.state.description} updateProps={this.updateDescription}></InputUpdateProps>
        {
          this.state.actions.map(
            (step, index) => {
              return (
                <div >
                  <div key={index} >
                    {/* <h6>{step.description} -> {index}</h6>
                    <h6>{step.actionParam}</h6> */}
                    <Step step={step} index={index} updateProps={this.updateStep}/>
                  </div>
                  <br/>
                </div>
              )
            }
          )
        }
      </div>
    )
  }
}

export default connect(mapStateToProps)(MainMiddle);