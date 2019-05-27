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
    console.log('this.state.actionParam', this.state.actionParam)
    this.setState({
      actionParam: {
        ...this.state.actionParam,
        [key]:{...obj},
      }
    },()=>console.log('after', this.state.actionParam))
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
    let cb = () => {
    }
    cb = cb.bind(this);
    const urlCase = "http://localhost:3001/jsonfile";
    const postDataCase = {
      filepath: `${folder}/${fileName}`,
      filedata: tmpCurrentFileDetail,
    }
    const httpMethod = "POST";
    httpRequest(postDataCase, urlCase, httpMethod, cb);

    const { actionParam, deleteParmKey } = this.state;
    const urlParm = "http://localhost:3001/jsonfile4parm";
    const postDataParm = {
      filepath: './execution/param.json',
      filedata: {
        parmJson: actionParam,
        deleteKey: deleteParmKey,
      },
    };
    httpRequest(postDataParm, urlParm, httpMethod, cb);
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