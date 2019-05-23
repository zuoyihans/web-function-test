import React from 'react';
import InputUpdateProps from './InputUpdateProps';
import StepActionType from './StepActionType';
import CheckBoxUpdateProps from './CheckBoxUpdateProps';

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
        actionType: " ",
        objectXpath: "please input objectXpath",
        actionParam: "please input actionParam",
        selectLocator: "please input selectLocator",
        frame: "",
        frameCheckBox: Object.prototype.hasOwnProperty.call(this.props.step, "frame"),
        ...this.props.step,
      },
    }
    this.deleteStep = this.deleteStep.bind(this);
    this.createStep = this.createStep.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      step: {
        actionType: " ",
        objectXpath: "please input objectXpath",
        actionParam: "please input actionParam",
        selectLocator: "please input selectLocator",
        frame: "",
        frameCheckBox: Object.prototype.hasOwnProperty.call(nextProps.step, "frame"),
        ...nextProps.step
      },
    })
  }

  createUpdator(key){
    let updateProps = (value) => {
      const tmpStep = {...this.state.step};
      tmpStep[key] = value;
      this.setState({
        step: tmpStep,
      });
      this.state.updateProps(this.state.index, tmpStep);
    }
    updateProps = updateProps.bind(this);
    return updateProps
  }

  deleteStep(index) {
    let tmpStep = {};
    this.setState({
      step: tmpStep,
    })
    this.state.updateProps(index, tmpStep);
  }

  createStep(index) {
    let tmpStep = {
      description: "please input description"
    };
    this.setState({
      step: tmpStep,
    })
    this.state.createPropsStep(index, tmpStep);
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
          <div>Please select actionType</div>
        )
      }
    }
  }

  render() {
    return (
      <div className="col-sm-11 border rounded bg-info">
        <div className="row">
          <b className="col-11" > STEP{this.state.index + 1}</b>
          <button type="button" className="btn btn-info btn-sm col-1" onClick={()=>this.deleteStep(this.state.index)}>
            <span className="fas fa-ban"></span>
          </button>
        </div>
        <InputUpdateProps name={'description'} value={this.state.step.description} updateProps={this.createUpdator('description')}></InputUpdateProps>
        <div className="row">
          <StepActionType type={this.state.step.actionType} updateProps={this.createUpdator('actionType')}/>
          <CheckBoxUpdateProps value={this.state.step.frameCheckBox} updateProps={this.createUpdator('frameCheckBox')}> </CheckBoxUpdateProps>
        </div>
        {this.state.step.frameCheckBox?(
          <div>
            <InputUpdateProps name={'frame'} value={this.state.step.frame} updateProps={this.createUpdator('frame')}></InputUpdateProps>
          </div>
        ):""}
        {this.elementByActionType(this.state.step)}
        <div className="row">
          <button type="button" className="btn btn-primary btn-sm col-2" onClick={()=>this.createStep(this.state.index)}>
            <span className="fas fa-plus"> New Step</span>
          </button>
        </div>
      </div>
    )
  }
}

export default Step;