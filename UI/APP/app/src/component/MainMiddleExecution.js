import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import ExecutionStep from './ExecutionStep';

import { httpRequest } from '../util';


const mapStateToProps = state => { 
  const { cunrrentFileDetail } = state.ComponentFile;
  return { cunrrentFileDetail };
};

class MainMiddleExecution extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      executionStep: this.filterComponent(this.props.cunrrentFileDetail),
      deleteParmKey:[],
      saveButtonShow:true,
    }
    this.putParm= this.putParm.bind(this);
    this.deleteParm = this.deleteParm.bind(this);
    this.saveComponentFile = this.saveComponentFile.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.cunrrentFileDetail.fileName === this.props.cunrrentFileDetail.fileName) {
      this.setState({
        executionStep: this.filterComponent(nextProps.cunrrentFileDetail),

      })
    } else {
      this.setState({
        executionStep: this.filterComponent(nextProps.cunrrentFileDetail),
        deleteParmKey: [],
        actionParam: {}
      })
    }
    
  }

  filterComponent(cunrrentFileDetail){
    let tmpList = Object.entries(cunrrentFileDetail).filter((element)=>(element[0]!=='fileName' && element[0] !== 'folder')?true:false);
    tmpList.sort((a, b) => {
      if (a[1].index < b[1].index) { return -1; }
      if (a[1].index > b[1].index) { return 1; }
      return 0;
    })
    return tmpList
  }

  putParm(key, obj) {
    this.setState({
      actionParam: {
        ...this.state.actionParam,
        [key]:{...obj},
      }
    })
  }

  deleteParm(key) {
    this.setState({
      actionParam: _.omit(this.state.actionParam, [key]),
      deleteParmKey: [...this.state.deleteParmKey, key]
    })
  }
  saveComponentFile() {
    const { cunrrentFileDetail } = this.props;
    const { fileName, folder} = cunrrentFileDetail;
    const tmpCurrentFileDetail = [];
    Object.keys(cunrrentFileDetail).forEach(key => {
      if(key !== 'fileName' && key !== 'folder') {
        tmpCurrentFileDetail.push(cunrrentFileDetail[key])
      }
    })
    
    const urlCase = "/jsonfile";
    const postDataCase = {
      filepath: `${folder}/${fileName}`,
      filedata: tmpCurrentFileDetail,
    }
    const httpMethod = "POST";
   

    const { actionParam, deleteParmKey } = this.state;
    const urlParm = "/jsonfile4parm";
    const postDataParm = {
      filepath: './execution/param.json',
      filedata: {
        parmJson: actionParam,
        deleteKey: deleteParmKey,
      },
    };
    let cb = () => {
      this.setState({
        saveButtonShow:true,
      })
    }
    cb = cb.bind(this);
    this.setState({
      saveButtonShow:false,
    }, () => {
      httpRequest(postDataCase, urlCase, httpMethod, ()=>{
        httpRequest(postDataParm, urlParm, httpMethod, cb)
      });
    })
    
  }

  render() {
    const allSteps = this.state.executionStep.map((executionStep, index) => {
      return (
        <ExecutionStep key={index} index={index} putParm={this.putParm} delParm={this.deleteParm} executionStep={executionStep}></ExecutionStep>
      )
    })
    let saveButton ="";
    if (Object.prototype.hasOwnProperty.call(this.props.cunrrentFileDetail, 'fileName')) {
      saveButton = (
        <button type="button" className="btn btn-primary btn-sm col-2" onClick={this.saveComponentFile}>
          <span className="fas fa-save"> Save</span>
        </button>
      )
      if (this.state.saveButtonShow) {
        saveButton = (
          <button type="button" className="btn btn-primary btn-sm col-2" onClick={this.saveComponentFile}>
            <span className="fas fa-save"> Save</span>
          </button>
        )
      } else {
        saveButton = (
          <i class="fas fa-sync fa-spin"></i>
        )
      }
    } 
     
    return (
      <div className="col-sm-6 auto-mx border">
        Execution Detail
        
        {allSteps}
        <div className='row justify-content-around'>
          {saveButton}
        </div>
      </div>
    )
  }

}

export default connect(mapStateToProps)(MainMiddleExecution);