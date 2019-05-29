import React from 'react';
import { connect } from 'react-redux';

import { updateCurrentFileDetail } from '../redux/actionCreator'
import InputUpdateProps from './InputUpdateProps';
import Step from './Step';
import { httpRequest } from '../util';

import {
  STEP_TYPE_OPENURL,
  STEP_TYPE_INPUT,
  STEP_TYPE_CLICK,
  STEP_TYPE_CHECKBOX,
  STEP_TYPE_VERIFYTEXT,
  STEP_TYPE_FILEUPLOAD,
  STEP_TYPE_SELECT,
} from '../constants';

const mapStateToProps = state => { 
  const { cunrrentFileDetail } = state.ComponentFile;
  return { cunrrentFileDetail };
};

class MainMiddleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.cunrrentFileDetail,
    };
    this.updateFileDescription = this.updateFileDescription.bind(this);
    this.updateFileActionStep = this.updateFileActionStep.bind(this);
    this.createFileActionStep = this.createFileActionStep.bind(this);
    this.deleteFileActionStep = this.deleteFileActionStep.bind(this);
    this.saveComponentFile = this.saveComponentFile.bind(this);
  }

  updateFileDescription(value) {
    this.setState({
      description: value,
    });
  }

  updateFileActionStep(index,actionStep) {
    const tmpActions = [...this.state.actions];
    tmpActions.splice(index, 1, actionStep);
    this.setState({
      actions:[...tmpActions]
    });
  }
  createFileActionStep() {
    const tmpActions = [...this.state.actions];
    const tmpActionStep = {description:'NEW ACTIONSTEP'};
    tmpActions.push(tmpActionStep);
    this.setState({
      actions:[...tmpActions]
    });
  }
  deleteFileActionStep(index) {
    const tmpActions = [...this.state.actions];
    tmpActions.splice(index, 1);
    this.setState({
      actions:[...tmpActions]
    });
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps.cunrrentFileDetail,
    })
  }

  filterStep(step) {
    const { description, actionType} = step
    const tmpStep = {
      description,
      actionType,
    }
    if (Object.prototype.hasOwnProperty.call(step, "frame") && step.frame.trim() !== "") {
      tmpStep.frame = step.frame;
    }
    switch(actionType) {
      case STEP_TYPE_OPENURL: {
        tmpStep.actionParam = step.actionParam;
        break;
      }
      case STEP_TYPE_INPUT: {
        tmpStep.objectXpath = step.objectXpath;
        tmpStep.actionParam = step.actionParam;
        break;
      }
      case STEP_TYPE_CLICK: {
        tmpStep.objectXpath = step.objectXpath;
        break;
      }
      case STEP_TYPE_CHECKBOX: {
        tmpStep.objectXpath = step.objectXpath;
        tmpStep.actionParam = step.actionParam;
        break;
      }
      case STEP_TYPE_VERIFYTEXT: {
        tmpStep.objectXpath = step.objectXpath;
        tmpStep.actionParam = step.actionParam;
        break;
      }
      case STEP_TYPE_FILEUPLOAD: {
        tmpStep.objectXpath = step.objectXpath;
        tmpStep.actionParam = step.actionParam;
        break;
      }
      case STEP_TYPE_SELECT: {
        tmpStep.selectLocator = step.selectLocator;
        tmpStep.actionParam = step.actionParam;
        break;
      }
      default: {

      }
    }
    return tmpStep;
  }

  saveComponentFile(){
    const {
      fileName,
      folder,
    } = this.props.cunrrentFileDetail;
    const {
      description,
      actions
    } = this.state;

    let cb = () => {
    }
    cb = cb.bind(this);
    const url = "/jsonfile";
    const postData = {
      filepath: `${folder}/${fileName}`,
      filedata: {
        description,
        actions: actions.map(this.filterStep),
      },
    }
    const httpMethod = "POST";
    httpRequest(postData, url, httpMethod, cb);
  }

  render() {
    const saveButton = (
          <button type="button" className="btn btn-primary btn-sm col-2" onClick={this.saveComponentFile}>
            <span className="fas fa-save"> Save</span>
          </button>
    )
    const newStep = (
        <button type="button" className="btn btn-primary btn-sm col-2" onClick={this.createFileActionStep}>
          <span className="fas fa-plus"> New Step</span>
        </button>
    )
    const allActionsSteps = Object.prototype.hasOwnProperty.call(this.state,'actions')?(
      this.state.actions.map((actionStep,index)=>{
        return (
          <div key={index}>
            <Step step={actionStep} index={index} updateProps={this.updateFileActionStep} deleteActionStep={()=>this.deleteFileActionStep(index)}></Step>
          </div>
        )
      })
    ):(
      <div></div>
    );
    return (
      <div className="col-sm-6 auto-mx border">
        Component Detail
        { this.props.cunrrentFileDetail.description ? (
          <div>
            <InputUpdateProps name="description" value={this.state.description} updateProps={this.updateFileDescription} />
            {allActionsSteps}
            <div className='row justify-content-around'>
              {newStep}
              {saveButton}
            </div>
          </div>
        ):''}
        
      </div>
    )
  }
}

export default connect(mapStateToProps, { updateCurrentFileDetail })(MainMiddleComponent);