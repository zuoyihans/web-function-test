import React from 'react';
import { connect } from 'react-redux';

import { httpRequest, queryFileDetail } from '../util';
import { updateOBJLeftFile, updateCurrentFileDetail, deleteOBJLeftFile, recoverCurrentFileDetail } from '../redux/actionCreator';
import InputUpdatePropsWhenblurOrEnter from './InputUpdatePropsWhenblurOrEnter';

class ItemFileName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      InputShow: false
    };
    this.renameComponentFile = this.renameComponentFile.bind(this);
    this.selectToRename = this.selectToRename.bind(this);
    this.deleteComponentFile = this.deleteComponentFile.bind(this);
  }

  renameComponentFile(value) {
    const key = this.props.element[0];
    const fileObj = this.props.element[1];
    const oldFileName = fileObj.fileName;
    const folder = fileObj.folder;
    fileObj.fileName = value;

    let cb = () => {
      this.setState({
        InputShow:false
      });
      this.props.updateOBJLeftFile({[key]: fileObj});
    }
    cb = cb.bind(this);
    const postData = {
      oldfilepath: `${folder}/${oldFileName}`,
      newfilepath: `${folder}/${value}`,
    };
    const url = "http://localhost:3001/renamejsonfile";
    const httpMethod = "POST";
    httpRequest(postData, url, httpMethod, cb)
  }
  
  async selectedComponentFile(element) {
    this.props.selectKey(element[0]);
    const url = `http://localhost:3001/${element[1].folder}/${element[1].fileName}`;
    const currentFileDetail = await queryFileDetail(url);
    currentFileDetail.fileName = element[1].fileName;
    currentFileDetail.folder = element[1].folder;
    this.props.updateCurrentFileDetail(currentFileDetail);
  }

  selectToRename() {
    this.setState({
      InputShow:true
    });
  };

  deleteComponentFile() {
    const confirm = window.confirm('Do you want to delete this file');
    if (confirm) {
      let cb = () => {
        this.props.deleteOBJLeftFile([this.props.element[0]])
        this.props.currentKey === this.props.element[0] && this.props.recoverCurrentFileDetail()
      }
      cb.bind(this);
      const deleteObj = this.props.element[1];
      const url = "http://localhost:3001/jsonfile";
      const deleteData = {
        filepath: `${deleteObj.folder}/${deleteObj.fileName}`,
      }
      const httpMethod = "DELETE";
      httpRequest(deleteData, url, httpMethod, cb);
    } 
  }

  render() {
    const result = this.state.InputShow?(
      <InputUpdatePropsWhenblurOrEnter name="Name" value={this.props.element[1].fileName} updateProps={this.renameComponentFile}></InputUpdatePropsWhenblurOrEnter>
    ):(
      <li 
        className={this.props.currentKey === this.props.element[0]?"list-group-item active":"list-group-item"} 
        onClick={e => this.selectedComponentFile(this.props.element)}
      >
        {this.props.element[1].fileName}
      </li>
    );
    return (
      <div className="row no-gutters align-items-center border border-bottom-0">
        <div className="col-10">
          {result}
        </div>
        <div className=" col-1" style={{cursor:"pointer"}} onClick={this.selectToRename}>
          <i className="fas fa-arrow-right fa-pen"></i>
        </div>
        <div className=" col-1" style={{cursor:"pointer"}} onClick={this.deleteComponentFile}>
          <i className="fas fa-arrow-right fa-ban"></i>
        </div>
      </div>
    )
  }
}

export default connect(null, { updateOBJLeftFile, updateCurrentFileDetail, deleteOBJLeftFile, recoverCurrentFileDetail })(ItemFileName);
