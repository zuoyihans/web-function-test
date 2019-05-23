import { BrowserRouter, Route, Link } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
// import { changeModule, initOBJLeftFiles, initOBJRightFiles } from './redux/actionCreator';

import ComponentMain from './component/ComponentMain';
import ExecutionMain from './component/ExecutionMain';

// import { queryFileList } from './util';


const mapStateToProps = state => { 
  const { currentModel } = state.ComponentFile;
  return { currentModel };
};

class AppRouter extends React.Component {
  // constructor(props) {
  //   super(props);
  //   // this.handleModuleType = this.handleModuleType.bind(this);
  //   // this.handleModuleType('component');
  // }

  // handleModuleType(value) {
  //   this.props.changeModule(value);
    // if (value === 'component') {
    //   const filesList = await queryFileList("http://localhost:3001/components");
    //   this.props.initOBJLeftFiles(filesList);
    // } else {
    //   const filesListLeft = await queryFileList("http://localhost:3001/executions");
    //   this.props.initOBJLeftFiles(filesListLeft);
    //   const filesListRight = await queryFileList("http://localhost:3001/components");
    //   this.props.initOBJRightFiles(filesListRight);
    // }
  // }

  render() {
    return (
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-light bg-info rounded">
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              {/* <li className="nav-item" onClick={()=>{this.handleModuleType('component')}}> */}
              <li className="nav-item" >
                <Link to="/" className={(this.props.currentModel === 'component')?"nav-link active":"nav-link"}>Home</Link>
              </li>
              <li className="nav-item" >
                <Link to="/execution" className={(this.props.currentModel === 'execution')?"nav-link active":"nav-link"}>Execution</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Route path="/" exact component={ComponentMain} />
        <Route path="/execution" exact component={ExecutionMain} />
      </BrowserRouter>
    )
  }
}

export default connect(mapStateToProps)(AppRouter);
