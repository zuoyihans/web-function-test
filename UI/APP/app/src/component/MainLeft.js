import React from 'react';
import { connect } from 'react-redux';
import { addOBJLeftFile } from '../redux/actionCreator';

import InputUpdatePropsWhenblurOrEnter from './InputUpdatePropsWhenblurOrEnter';
import ItemFileName from './ItemFileName';

import { httpRequest } from '../util';

const mapStateToProps = state => { 
  const { objLeftFiles, currentIndex, currentModel } = state.ComponentFile;
  return { objLeftFiles, currentIndex, currentModel };
};

class MainLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentKey: '',
      showInputFileName: false,
      newFileName: "",
    }
    this.selectKey = this.selectKey.bind(this);
    this.createComponentFile = this.createComponentFile.bind(this);
  }

  selectKey(key) {
    this.setState({
      currentKey: key,
    })
  }

  createComponentFile(value) {
    this.setState({
      showInputFileName:false
    })
    let objFile = {
      fileName : value,
      folder: this.props.currentModel === 'component'?'./component':'./execution'
    }
    
    let cb = () => {
      this.props.addOBJLeftFile({
        objFile,
        currentIndex: this.props.currentIndex,
        nextIndex: this.props.currentIndex + 1,
      })
    }
    cb = cb.bind(this);
    const url = "http://localhost:3001/jsonfile";
    let filedata = {};
    if (objFile.folder === 'component') {
      filedata = {
        description:'NEW COMPONENT',
        actions: [],
      };
    }

    const createData = {
      filepath: `${objFile.folder}/${objFile.fileName}`,
      filedata,
    }
    const httpMethod = "POST";
    httpRequest(createData, url, httpMethod, cb);
  }

  render() {
    const newComponentFile = this.state.showInputFileName?(
      <div className="row justify-content-center">
        <div className="col">
          <InputUpdatePropsWhenblurOrEnter name="Name" value={this.state.newFileName} updateProps={this.createComponentFile}></InputUpdatePropsWhenblurOrEnter>
        </div>
      </div>
    ):(
      <div className="row justify-content-center">
        <button type="button" className="btn btn-info btn-sm col-11" onClick={e=>this.setState({ showInputFileName: !this.state.showInputFileName})}>
            <span className="fas fa-plus"> New Component</span>
        </button>
      </div>
    );

    return (
      <div className="col-sm-3 mx-auto border">
        <ul className="list-group list-group-flush">
          {
            Object.entries(this.props.objLeftFiles).map((element) => {
              return (
                <ItemFileName element={element} key={element[0]} currentKey={this.state.currentKey} selectKey={this.selectKey}></ItemFileName>
              )
            })
          }
        </ul>
        {newComponentFile}
      </div>
    )
  }
}

export default connect(mapStateToProps, { addOBJLeftFile })(MainLeft);