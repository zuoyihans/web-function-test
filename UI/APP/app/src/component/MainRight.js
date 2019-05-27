import React from 'react';
import { connect } from 'react-redux';
import { addComponentInCurrentFile } from '../redux/actionCreator';

import { queryReturnJson } from '../util';

const mapStateToProps = state => { 
  const { objRightFiles, cunrrentFileDetail } = state.ComponentFile;
  return { objRightFiles, cunrrentFileDetail };
};

class MainRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nextKey: 0,
      nextIndex: 1,
    }
  }
  componentWillReceiveProps(nextProps) {
    const tmpList = this.filterComponent(nextProps.cunrrentFileDetail);
    let nextKey = 0;
    let nextIndex = 1;
    if (tmpList && tmpList.length > 0 && tmpList.every((element) => Object.prototype.hasOwnProperty.call(element[1], 'index'))) {
      nextKey = tmpList.length;
      nextIndex = tmpList[nextKey-1][1].index + 1
    }
    this.setState({
      nextKey,
      nextIndex,
    })
    this.addNewComponent = this.addNewComponent.bind(this);
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
  async addNewComponent(fileName) {
    if (Object.prototype.hasOwnProperty.call(this.props.cunrrentFileDetail, 'fileName')) {
      const { nextKey, nextIndex } = this.state;
      const url = 'http://localhost:3001/ukey8length';
      const queryResult= await queryReturnJson(url);
      const newComponent = {
        component: fileName,
        index: nextIndex,
        ukey: queryResult.uKey,
      }
      this.props.addComponentInCurrentFile(nextKey,newComponent);
      this.setState({
        nextKey: nextKey + 1,
        nextIndex: nextIndex + 1,
      })
    }
  }
  async getUKey(url){
    const queryResult = await queryReturnJson(url);
    return queryResult.uKey;
  }

  render(){
    return (
      <div className="col-sm-3 mx-auto border">
        <ul className="list-group list-group-flush">
        {
          Object.entries(this.props.objRightFiles).map((element,index) => {
            return (
              <div key={index} className="row  align-items-center border border-left-0 border-botton-0">
                <div className=" col-1" style={{cursor:"pointer"}} onClick={()=>{this.addNewComponent(element[1].fileName)}}>
                  <i className="fas fa-arrow-left"></i>
                </div>
                <li className="list-group-item">
                  {element[1].fileName}
                </li>
              </div>
            )
          })
        }
        </ul>
      </div>
    )
  }
}

export default connect(mapStateToProps, { addComponentInCurrentFile })(MainRight);