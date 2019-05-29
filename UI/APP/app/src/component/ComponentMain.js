import React from 'react';
import { connect } from 'react-redux';
import MainLeft from './MainLeft';
import MainMiddleComponent from './MainMiddleComponent';
import { changeModule, initOBJLeftFiles } from '../redux/actionCreator';

import { queryFileList } from '../util';

// import MainRight from './MainRight';

const mapStateToProps = state => { 
  const { objLeftFiles, currentIndex } = state.ComponentFile;
  return { objLeftFiles, currentIndex };
};

class ComponentMain extends React.Component {
  constructor(props) {
    super(props);
    this.initLeftFilesList();
    this.props.changeModule('component');
  }

  async initLeftFilesList() {
    const filesList = await queryFileList("/components");
    this.props.initOBJLeftFiles(filesList);
  }

  render() {
    return (
      <main role="main">
        <div className="col-sm-12 mx-auto">
          <div className="row flex-xl-nowrap">
            <MainLeft />
            <MainMiddleComponent />
            <div className="col-sm-3 mx-auto border">
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default connect(mapStateToProps, { changeModule, initOBJLeftFiles })(ComponentMain);