import URL from 'url';

import React from 'react';
import { connect } from 'react-redux';

import { refreshCurrentComponentFileAsync, refreshComponentFiles } from '../redux/actionCreator';
import InputUpdatePropsWhenblurOrEnter from './InputUpdatePropsWhenblurOrEnter'

const mapStateToProps = state => { 
  const { componentFiles, idList } = state.ComponentFile;
  return { componentFiles, idList };
};

class MainLeft extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectIndex: "",
      renameIndex: "",
      showInputFileName: false,
      idList: [],
      componentFiles: {},
      newComponentFileName: "",
    };
    this.createComponentFile = this.createComponentFile.bind(this);
    this.renameComponentFileName = this.renameComponentFileName.bind(this);
    this.selectComponentFile = this.selectComponentFile.bind(this);
  }

  selectComponentFile = (selectIndex, link) => {
    console.log(this.state)
    this.setState({ selectIndex: selectIndex });
    this.props.refreshCurrentComponentFileAsync(link);
  }

  createComponentFile(value) {
    const tmpcomponentFiles = {...this.state.componentFiles};
    const tmpidList = [...this.state.idList];

    const index = tmpidList.length.toString();
    const tmpComponentFile = {
      fileName: value,
      id: index,
      link: `http://localhost:3001/component/${value}`
    };
    tmpcomponentFiles[index] = {...tmpComponentFile};
    tmpidList.push(index);
    this.setState({
      showInputFileName: !this.state.showInputFileName,
      newComponentFileName: value,
      componentFiles: tmpcomponentFiles,
      idList: tmpidList,
      selectIndex: index,
    });
    this.props.refreshComponentFiles(tmpcomponentFiles, tmpidList);
    this.saveComponentFile(tmpComponentFile, index);
  }

  saveComponentFile(tmpComponentFile, index) {
    // const tmpActions = this.state.actions.map(this.filterStep)
    const data = {
      filepath: `.${URL.parse(tmpComponentFile.link).path}`,
      filedata: {
        description: "NEW COMPONENT FILE",
        actions: [],
      }
    }
    const url = "http://localhost:3001/jsonfile";
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
    .then(response => this.selectComponentFile(index, tmpComponentFile.link))
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      ...nextProps
    })
  }

  renameComponentFileName(value) {
    const tmpRenameIndex = this.state.renameIndex;
    const tmpComponentFiles = {...this.state.componentFiles};
    const oldFileName = tmpComponentFiles[tmpRenameIndex].fileName;
    const newFileName = value;
    const oldLink = tmpComponentFiles[tmpRenameIndex].link;
    const newLink = oldLink.replace(/(.*)/,`$1${newFileName}`)
    tmpComponentFiles[tmpRenameIndex].fileName = newFileName;
    tmpComponentFiles[tmpRenameIndex].link = newLink;
    
    const indexOfLast = oldLink.lastIndexOf("/");
    const linkBase = oldLink.substring(0, indexOfLast + 1);
    tmpComponentFiles[tmpRenameIndex].link = `${linkBase}${newFileName}`;
    const oldPath = URL.parse(oldLink).path;
    const newPath = oldPath.replace(oldFileName, newFileName);
    
    let refreshCurrentComponentFile = () => {this.selectComponentFile(this.state.selectIndex, this.state.componentFiles[this.state.selectIndex].link)}
    refreshCurrentComponentFile = refreshCurrentComponentFile.bind(this);

    // 设置state之后的回调函数： 更新currentComponentFile.
    let cb = () => {
      this.setState({
        renameIndex: "",
        componentFiles: {...tmpComponentFiles}
      }, refreshCurrentComponentFile);
    }
    
    cb = cb.bind(this);
    // 回调函数cb：post请求成功后设置state
    this.renamePost(`.${oldPath}`, `.${newPath}`, cb);
  }

  renamePost(oldPath, newPath, cb) {
    const data = {
      oldfilepath: oldPath,
      newfilepath: newPath,
    }
    const url = "http://localhost:3001/renamejsonfile";
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
    .then(() => cb())
  }

  selectRenameIndex(elememt){
    this.setState({
      renameIndex: elememt
    })
  }

  render(){
    const newComponentFile = this.state.showInputFileName?(
      <div className="row justify-content-center">
        <div className="col">
          <InputUpdatePropsWhenblurOrEnter name="Name" value={this.state.newComponentFileName} updateProps={this.createComponentFile}></InputUpdatePropsWhenblurOrEnter>
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
            this.state.idList.map((elememt) => {
              let reanmeInputShow;
              if (this.state.renameIndex === elememt) {
                reanmeInputShow = (
                  <InputUpdatePropsWhenblurOrEnter name="Name" value={this.state.componentFiles[elememt].fileName} updateProps={this.renameComponentFileName}></InputUpdatePropsWhenblurOrEnter>
                )
              } else {
                reanmeInputShow = (
                  <li 
                    className={this.state.selectIndex === elememt ?"list-group-item active":"list-group-item"} 
                    onClick={e => this.selectComponentFile(elememt, this.state.componentFiles[elememt].link)}
                  >
                    {this.state.componentFiles[elememt].fileName}
                  </li>
                )
              }
              return (
                <div className="row no-gutters align-items-center border border-bottom-0" key={elememt}>
                  <div className="col-10">
                    {reanmeInputShow}
                  </div>
                  <div className=" col-1" style={{cursor:"pointer"}} onClick={() => this.selectRenameIndex(elememt)}>
                    <i className="fas fa-arrow-right fa-pen"></i>
                  </div>
                  <div className=" col-1" style={{cursor:"pointer"}}>
                    <i className="fas fa-arrow-right fa-ban"></i>
                  </div>
                </div>
              )
            })
          }
        </ul>
        {newComponentFile}
      </div>
    )
  }
}

export default connect(mapStateToProps, { refreshComponentFiles, refreshCurrentComponentFileAsync })(MainLeft);