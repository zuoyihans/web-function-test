
import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => { 
  const { objLeftFiles, currentIndex, objRightFiles } = state.ComponentFile;
  return { objLeftFiles, currentIndex, objRightFiles };
};

class ExecutionMain extends React.Component {
  
  render() {
    return (
      <div>
        <div>
          ExecutionMain11111
        </div>
        <div>
          index : {this.props.currentIndex} <br></br>
          filelist: {JSON.stringify(this.props.objLeftFiles)}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(ExecutionMain);