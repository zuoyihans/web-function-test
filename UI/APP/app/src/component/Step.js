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
  constructor(props) {
    super(props);
    this.updateActionCreator = this.updateActionCreator.bind(this);
    this.updateActionType = this.updateActionType.bind(this);
    this.elementByActionType = this.elementByActionType.bind(this);
  }

  updateActionType(value){
    const tmpActionStep = this.props.step;
    tmpActionStep.actionType = value;
    this.props.updateProps(this.props.index,tmpActionStep);
  }

  updateActionCreator(key) {
    let updateProps = (value) => {
      const tmpActionStep = {...this.props.step};
      tmpActionStep[key] = value;
      this.props.updateProps(this.props.index, tmpActionStep);
    }
    updateProps = updateProps.bind(this);
    return updateProps
  }

  initStepProps(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key)?obj[key]:`NEW ${key}`;
  }

  elementByActionType(step){
    switch(step.actionType) {
      case STEP_TYPE_OPENURL: {
        return (
          <div >
            <InputUpdateProps name={`actionParam`} value={this.initStepProps(this.props.step, 'actionParam')} updateProps={this.updateActionCreator('actionParam')}></InputUpdateProps>
          </div>
        )
      }
      case STEP_TYPE_INPUT: {
        return (
          <div>
            <InputUpdateProps name={`objectXpath`} value={this.initStepProps(this.props.step,'objectXpath')} updateProps={this.updateActionCreator('objectXpath')}></InputUpdateProps>
            <InputUpdateProps name={`actionParam`} value={this.initStepProps(this.props.step, 'actionParam')} updateProps={this.updateActionCreator('actionParam')}></InputUpdateProps>
          </div>
        )
      }
      case STEP_TYPE_CLICK: {
        return (
          <div>
            <InputUpdateProps name={`objectXpath`} value={this.initStepProps(this.props.step,'objectXpath')} updateProps={this.updateActionCreator('objectXpath')}></InputUpdateProps>
          </div>
        )
      }
      case STEP_TYPE_CHECKBOX: {
        return (
          <div>
            <InputUpdateProps name={`objectXpath`} value={this.initStepProps(this.props.step,'objectXpath')} updateProps={this.updateActionCreator('objectXpath')}></InputUpdateProps>
            <InputUpdateProps name={`actionParam`} value={this.initStepProps(this.props.step, 'actionParam')} updateProps={this.updateActionCreator('actionParam')}></InputUpdateProps>
          </div>
        )
      }
      case STEP_TYPE_VERIFYTEXT: {
        return (
          <div>
            <InputUpdateProps name={`objectXpath`} value={this.initStepProps(this.props.step, 'objectXpath')} updateProps={this.updateActionCreator('objectXpath')}></InputUpdateProps>
            <InputUpdateProps name={`actionParam`} value={this.initStepProps(this.props.step, 'actionParam')} updateProps={this.updateActionCreator('actionParam')}></InputUpdateProps>
          </div>
        )
      }
      case STEP_TYPE_FILEUPLOAD: {
        return (
          <div>
            <InputUpdateProps name={`objectXpath`} value={this.initStepProps(this.props.step, 'objectXpath')} updateProps={this.updateActionCreator('objectXpath')}></InputUpdateProps>
            <InputUpdateProps name={`actionParam`} value={this.initStepProps(this.props.step, 'actionParam')} updateProps={this.updateActionCreator('actionParam')}></InputUpdateProps>
          </div>
        )
      }
      case STEP_TYPE_SELECT: {
        return (
          <div>
            <InputUpdateProps name={`selectLocator`} value={this.initStepProps(this.props.step,'selectLocator')} updateProps={this.updateActionCreator('selectLocator')}></InputUpdateProps>
            <InputUpdateProps name={`actionParam`} value={this.initStepProps(this.props.step, 'actionParam')} updateProps={this.updateActionCreator('actionParam')}></InputUpdateProps>
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

  render(){
    return (
      <div className="col-sm-11 border rounded bg-info">
        
        <div className="row">
          <b className="col-11" > STEP{this.props.index + 1}:</b>
          <button type="button" className="btn btn-info btn-sm col-1" onClick={this.props.deleteActionStep}>
            <span className="fas fa-ban"></span>
          </button>
        </div>
        <InputUpdateProps name={'description'} value={this.props.step.description} updateProps={this.updateActionCreator('description')}></InputUpdateProps>
        <div className="row">
          <StepActionType type={this.props.step.actionType} updateProps={this.updateActionCreator('actionType')}/>
          <CheckBoxUpdateProps value={Object.prototype.hasOwnProperty.call(this.props.step, 'frameCheckBox')?this.props.step.frameCheckBox:false} updateProps={this.updateActionCreator('frameCheckBox')}> </CheckBoxUpdateProps>
        </div>
        {this.props.step.frameCheckBox?(
          <div>
            <InputUpdateProps name={'frame'} value={Object.prototype.hasOwnProperty.call(this.props.step, 'frame')?this.props.step.frame:'new frame'} updateProps={this.updateActionCreator('frame')}></InputUpdateProps>
          </div>
        ):""}
        {this.elementByActionType(this.props.step)}
      </div>
    )
  }

}

export default Step;