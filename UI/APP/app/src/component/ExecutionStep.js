import React from 'react';
import { connect } from 'react-redux';
import { deleteComponentInCurrentFile } from '../redux/actionCreator';

import { queryReturnJson } from '../util';

import InputUpdatePropsWhenblurOrEnter from './InputUpdatePropsWhenblurOrEnter';

class ExecutionStep extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      showParm: false,
      parmDetail: {},
    }
    this.parmShowOff = this.parmShowOff.bind(this);
    this.parmShowOn = this.parmShowOn.bind(this);
    this.creator4UpdateParms = this.creator4UpdateParms.bind(this);
    this.deleteParms = this.deleteParms.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({
      showParm: false,
      parmDetail: {},
    })
  }

  async parmShowOn() {
    if (Object.prototype.hasOwnProperty.call(this.state.parmDetail, 'ukey')) {
      this.setState({
        showParm: true
      });
    } else {
      const parmDetail = {
        ukey: this.props.executionStep[1].ukey,
        component: this.props.executionStep[1].component,
        parms:{}
      }
      const parmsKey = await this.getParmsKey(parmDetail.component);
      const parmObj = await this.getparmObj(parmDetail.ukey);
      if (parmObj) {
        parmsKey.forEach(val => {
          if (Object.prototype.hasOwnProperty.call(parmObj, val)) {
            parmDetail.parms[val] = parmObj[val];
          } else {
            parmDetail.parms[val] = 'new parm';
          }
        })
      } else {
        parmsKey.forEach(val => {
          parmDetail.parms[val] = 'new parm';
        })
      }
      
      this.setState({
        showParm: true,
        parmDetail,
      })

    }
  }

  async getParmsKey(fileName) {
    let url;
    if(fileName.indexOf('.json')=== -1) {
      url = `http://localhost:3001/component/${fileName}.json`;
    } else {
      url = `http://localhost:3001/component/${fileName}`;
    }
    const queryResult = await queryReturnJson(url)
    const filterResult = [];

    queryResult.actions.forEach(element => {
      for (let k in element) {
        if (k === 'actionParam') {
          filterResult.push(element[k])
        }
        if (k === 'objectParams') {
          const tmpKKObject = element[k];
          for (let kk in tmpKKObject) {
            filterResult.push(tmpKKObject[kk])
          }
        }
      }
    });
    return filterResult;
  }

  async getparmObj(ukey) {
    const paramQueryResult = await queryReturnJson("http://localhost:3001/paramfile");
    const { paramfile } =paramQueryResult;
    return paramfile[ukey];
  }

  parmShowOff() {
    this.setState({
      showParm: false
    })
  }

  creator4UpdateParms(key) {

    let updateParms=(value) =>{
      this.setState({
        parmDetail:{
          ...this.state.parmDetail,
          parms:{
            ...this.state.parmDetail.parms,
            [key]: value,
          }
        }
      }, () => {this.props.putParm(this.state.parmDetail.ukey, this.state.parmDetail.parms)})
    }
    updateParms = updateParms.bind(this);

    return updateParms;
  }

  deleteParms() {
    this.props.delParm(this.state.parmDetail.ukey);
    this.props.deleteComponentInCurrentFile(this.props.executionStep[0]);
  }

  render() {
    const parmItem = (this.state.showParm)?(
      <div className="col border rounded">
        <div className="row align-items-center  ">
          <div className="col">
            {Object.keys(this.state.parmDetail.parms).map((key) => {
              return (
                <div key={key}>
                  <InputUpdatePropsWhenblurOrEnter name={key} value={this.state.parmDetail.parms[key]} updateProps={this.creator4UpdateParms(key)}></InputUpdatePropsWhenblurOrEnter>
                </div>
              )
            })}
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
          <button type="button" className="btn btn-sm col-1" onClick={this.parmShowOn}>
            <span className="fas fa-plus" ></span>
          </button>
          <b className="col-2" > Case{this.props.index + 1}: </b>
          <div className="col-8" > {this.props.executionStep[1].component}</div>
          <button type="button" className="btn btn-sm col-1" onClick={this.deleteParms}>
            <span className="fas fa-ban"></span>
          </button>
        </div>
        {parmItem}
      </div>
    )
  }
}

export default connect(null, { deleteComponentInCurrentFile })(ExecutionStep);