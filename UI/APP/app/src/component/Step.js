import React from 'react';
import InputUpdateProps from './InputUpdateProps';
import StepActionType from './StepActionType';

import {
  STEP_TYPE_OPENURL,
  STEP_TYPE_INPUT,
  STEP_TYPE_CLICK,
  STEP_TYPE_CHECKBOX,
  STEP_TYPE_VERIFYTEXT,
  STEP_TYPE_FILEUPLOAD,
  STEP_TYPE_SELECT,
} from '../constants';

class Step extends React.Component {
  constructor(props){
    super(props)
    this.state={
      ...this.props,
      step: {
        actionType: "please select actionType",
        objectXpath: "please input objectXpath",
        actionParam: "please input actionParam",
        selectLocator: "please input selectLocator",
        ...this.props.step,
      },
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      step: {
        actionType: "please select actionType",
        objectXpath: "please input objectXpath",
        actionParam: "please input actionParam",
        selectLocator: "please input selectLocator",
        ...nextProps.step
      },
    })
  }

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

  elementByActionType(step){
    switch(step.actionType) {
      case STEP_TYPE_OPENURL: {
        return (
          <div >
            <InputUpdateProps name={`actionParam`} value={this.state.step.actionParam} updateProps={this.createUpdator('actionParam')}></InputUpdateProps>
          </div>
        )
      }
      case STEP_TYPE_INPUT: {
        return (
          <div>
            <InputUpdateProps name={`objectXpath`} value={this.state.step.objectXpath} updateProps={this.createUpdator('objectXpath')}></InputUpdateProps>
            <InputUpdateProps name={`actionParam`} value={this.state.step.actionParam} updateProps={this.createUpdator('actionParam')}></InputUpdateProps>
          </div>
        )
      }
      case STEP_TYPE_CLICK: {
        return (
          <div>
            <InputUpdateProps name={`objectXpath`} value={this.state.step.objectXpath} updateProps={this.createUpdator('objectXpath')}></InputUpdateProps>
          </div>
        )
      }
      case STEP_TYPE_CHECKBOX: {
        return (
          <div>
            <InputUpdateProps name={`objectXpath`} value={this.state.step.objectXpath} updateProps={this.createUpdator('objectXpath')}></InputUpdateProps>
            <InputUpdateProps name={`actionParam`} value={this.state.step.actionParam} updateProps={this.createUpdator('actionParam')}></InputUpdateProps>
          </div>
        )
      }
      case STEP_TYPE_VERIFYTEXT: {
        return (
          <div>
            <InputUpdateProps name={`objectXpath`} value={this.state.step.objectXpath} updateProps={this.createUpdator('objectXpath')}></InputUpdateProps>
            <InputUpdateProps name={`actionParam`} value={this.state.step.actionParam} updateProps={this.createUpdator('actionParam')}></InputUpdateProps>
          </div>
        )
      }
      case STEP_TYPE_FILEUPLOAD: {
        return (
          <div>
            <InputUpdateProps name={`objectXpath`} value={this.state.step.objectXpath} updateProps={this.createUpdator('objectXpath')}></InputUpdateProps>
            <InputUpdateProps name={`actionParam`} value={this.state.step.actionParam} updateProps={this.createUpdator('actionParam')}></InputUpdateProps>
          </div>
        )
      }
      case STEP_TYPE_SELECT: {
        return (
          <div>
            <InputUpdateProps name={`selectLocator`} value={this.state.step.selectLocator} updateProps={this.createUpdator('selectLocator')}></InputUpdateProps>
            <InputUpdateProps name={`actionParam`} value={this.state.step.actionParam} updateProps={this.createUpdator('actionParam')}></InputUpdateProps>
          </div>
        )
      }
      default: {
        return (
          <div>error : {step.actionType} not exists</div>
        )
      }
    }
  }

  render() {
    return (
      <div className="col-sm-11 border rounded bg-info">
        {/* <h6>step: {this.state.step.description}</h6> className="col-sm-11" */}
        <b>STEP{this.state.index + 1}</b>
        <InputUpdateProps name={'description'} value={this.state.step.description} updateProps={this.createUpdator('description')}></InputUpdateProps>
        <StepActionType type={this.state.step.actionType} updateProps={this.createUpdator('actionType')}/>
        
        {this.elementByActionType(this.state.step)}
      </div>
    )
  }
}

export default Step;