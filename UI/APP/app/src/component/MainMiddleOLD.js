import React from 'react';
import { connect } from 'react-redux';
import InputUpdateProps from './InputUpdateProps';
import Step from './Step';
import URL from 'url';

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
  const { cunrrentComponentFile } = state.ComponentFile;
  return { cunrrentComponentFile };
};

class MainMiddle extends React.Component {
  constructor(props){
    super(props);
   
    this.state ={
      ...this.props.cunrrentComponentFile,
      // link: this.props.cunrrentComponentFile.link,
      // description: this.props.cunrrentComponentFile.description,
      // actions: [...this.props.cunrrentComponentFile.actions],
    };
    this.updateDescription = this.updateDescription.bind(this);
    this.updateStep = this.updateStep.bind(this);
    this.createStep = this.createStep.bind(this);
    this.saveComponentFile = this.saveComponentFile.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      link: nextProps.cunrrentComponentFile.link,
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
    const tmpactions = this.state.actions;
    if (!Object.prototype.hasOwnProperty.call(step, "description")){
      tmpactions.splice(index, 1);
    } else {
      tmpactions[index] = {...step};
    }
    
    this.setState(
      {
        actions: [...tmpactions],
      }
    )
  }
  createStep(index,step) {
    const tmpactions = this.state.actions;
    tmpactions.splice(index+1,0,step);
    this.setState({
      actions:[...tmpactions],
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

  saveComponentFile() {
    // const tmpActions = this.state.actions.map(this.filterStep)
    const data = {
      filepath: `.${URL.parse(this.state.link).path}`,
      filedata: {
        description: this.state.description,
        actions: this.state.actions.map(this.filterStep),
      }
    }
    const url = "http://"/:/jsonfile";
    fetch(url, {
      body: JSON.stringify(data),
      method: 'POST',
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, same-origin, *omit
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      },
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // *client, no-referrer
    })
    .then(response => console.log(response))
  }

  

  render(){
    const tmpCunrrentComponentFile = this.props.cunrrentComponentFile;
    let result;
    if (Object.prototype.hasOwnProperty.call(tmpCunrrentComponentFile, 'description')) {
      if (this.state.actions.length !== 0) {
        result = (
          <div className="col-sm-6 auto-mx border">
            Component Detail
            {/* <h5> {this.state.link}</h5> */}
            <InputUpdateProps name="description" value={this.state.description} updateProps={this.updateDescription}></InputUpdateProps>
            { 
              this.state.actions.map(
                (step, index) => {
                  return (
                    <div key={index}>
                      <Step step={step} index={index} updateProps={this.updateStep} createPropsStep={this.createStep}/>
                      <br/>
                    </div>
                  );
                }
              )
            }
            <div className="row justify-content-around">
              <button type="button" className="btn btn-primary btn-sm col-2" onClick={this.saveComponentFile}>
                <span className="fas fa-save"> Save</span>
              </button>
            </div>
          </div>
        )
      } else {
        const step = {
          description: "please input description",
          actionType: "please select description",
        };
        const index = 0;
        result = (
          <div className="col-sm-6 auto-mx border">
            Component Detail
            <InputUpdateProps name="description" value={this.state.description} updateProps={this.updateDescription}></InputUpdateProps>
            <div>
              <Step step={step} index={index} updateProps={this.updateStep} createPropsStep={this.createStep}/>
              <br/>
            </div>
            <div className="row justify-content-around">
              <button type="button" className="btn btn-primary btn-sm col-2" onClick={this.saveComponentFile}>
                <span className="fas fa-save"> Save</span>
              </button>
            </div>
          </div>
        )
      }
    } else {
      result = (
        <div className="col-sm-6 auto-mx border">
          {/* <div className="row">
            <button type="button" className="btn btn-primary btn-sm col-3" onClick={this.createComponentFile}>
              <span className="fas fa-plus"> New Component</span>
            </button>
          </div> */}
        </div>
      )
    }
    return result;
  }
}

export default connect(mapStateToProps)(MainMiddle);