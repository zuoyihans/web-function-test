
import React from 'react';
import { connect } from 'react-redux';

import MainLeft from './MainLeft';
import MainMiddleExecution from './MainMiddleExecution';
import MainRight from './MainRight';

import { queryFileList } from '../util';
import { changeModule, initOBJLeftFiles, initOBJRightFiles } from '../redux/actionCreator';


const mapStateToProps = state => { 
  const { objLeftFiles, currentIndex, objRightFiles } = state.ComponentFile;
  return { objLeftFiles, currentIndex, objRightFiles };
};

class ExecutionMain extends React.Component {
  constructor(props) {
    super(props);
    this.initFilesList();
    this.props.changeModule('execution');
  }

  async initFilesList() {
    const filesListLeft = await queryFileList("/executions");
    this.props.initOBJLeftFiles(filesListLeft);
    const filesListRight = await queryFileList("/components");
    this.props.initOBJRightFiles(filesListRight);
  }

  render() {
    return (
      <main role="main">
        <div className="col-sm-12 mx-auto">
          <div className="row flex-xl-nowrap">
            <MainLeft />
            <MainMiddleExecution />
            <MainRight />
          </div>
        </div>
      </main>

    )
  }
}

export default connect(mapStateToProps, { changeModule, initOBJLeftFiles, initOBJRightFiles })(ExecutionMain);