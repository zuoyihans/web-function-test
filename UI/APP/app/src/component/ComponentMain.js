import React from 'react';
import { connect } from 'react-redux';
import MainLeft from './MainLeft';
import MainMiddleComponent from './MainMiddleComponent';
import MainRight from './MainRight';

const mapStateToProps = state => { 
  const { objLeftFiles, currentIndex } = state.ComponentFile;
  return { objLeftFiles, currentIndex };
};

class ComponentMain extends React.Component {
  
  render() {
    return (
      <main role="main">
        <div className="col-sm-12 mx-auto">
          <div className="row flex-xl-nowrap">
            <MainLeft />
            <MainMiddleComponent />
            <MainRight />
          </div>
        </div>
      </main>
    )
  }
}

export default connect(mapStateToProps)(ComponentMain);