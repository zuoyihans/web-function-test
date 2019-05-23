import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import ExecutionStep from './ExecutionStep';


const mapStateToProps = state => { 
  const { cunrrentFileDetail } = state.ComponentFile;
  return { cunrrentFileDetail };
};

class MainMiddleExecution extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      executionStep: this.filterComponent(this.props.cunrrentFileDetail),
    }
    this.addParm= this.addParm.bind(this);
    this.deleteParm = this.deleteParm.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      executionStep: this.filterComponent(nextProps.cunrrentFileDetail),
    })
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
  addParm(key, obj) {
    this.setState({
      actionParam: {
        ...this.state.actionParam,
        [key]:{...obj},
      }
    })

  }
  deleteParm(key) {
    this.setState({
      actionParam: _.omit(this.state.actionParam, [key])
    })
  }
//TODO: ADD PARAM.

  render() {
    console.log('executionstep',this.state.executionStep)
    const allSteps = this.state.executionStep.map((executionStep, index) => {
      return (
        <ExecutionStep key={index} index={index} addParm={this.addParm} delParm={this.deleteParm} executionStep={executionStep}></ExecutionStep>
      )
    })
    const saveButton = (
      <button type="button" className="btn btn-primary btn-sm col-2" onClick={this.saveComponentFile}>
        <span className="fas fa-save"> Save</span>
      </button>
    )
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