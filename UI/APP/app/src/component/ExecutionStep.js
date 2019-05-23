import React from 'react';
import { connect } from 'react-redux';
import { deleteComponentInCurrentFile } from '../redux/actionCreator';

import { queryReturnJson } from '../util';


class ExecutionStep extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      showParm: false
    }
    this.getComponentFile = this.getComponentFile.bind(this);
    this.parmShowOff = this.parmShowOff.bind(this);
  }
  async getComponentFile(fileName) {
    const url = `http://localhost:3001/component/${fileName}`;
    const queryResult = await queryReturnJson(url)
    console.log(queryResult);
    this.setState({
      showParm: true
    })
  }
  parmShowOff() {
    this.setState({
      showParm: false
    })
  }

  render() {
    const parmItem = (this.state.showParm)?(
      <div className="col border rounded">
        <div className="row align-items-center  ">
          <div className="col-2">
          parms
          </div>
          
        </div>
        <div className="row align-items-center ">
          <button type="button" className="btn btn-sm col-1" onClick={this.parmShowOff}>
              <span className="fas fa-minus" ></span>
            </button>
        </div>
      </div>
      
    ):'';
    return (
      <div className="col-sm-11 ">
        <div className="row no-gutters align-items-center border rounded ">
          <button type="button" className="btn btn-sm col-1" onClick={()=>{this.getComponentFile(this.props.executionStep[1].component)}}>
            <span className="fas fa-plus" ></span>
            {/* <div> </div>
            <span className="fas fa-minus"></span> */}
          </button>
          <b className="col-2" > Case{this.props.index + 1}: </b>
          <div className="col-8" > {this.props.executionStep[1].component}</div>
          <button type="button" className="btn btn-sm col-1" onClick={()=>{this.props.deleteComponentInCurrentFile(this.props.executionStep[0])}}>
            <span className="fas fa-ban"></span>
          </button>
        </div>

        {parmItem}
      </div>
    )
  }
}

export default connect(null, { deleteComponentInCurrentFile })(ExecutionStep);