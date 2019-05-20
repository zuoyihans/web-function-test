import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => { 
  const { currentModel, cunrrentFileDetail } = state.ComponentFile;
  return { currentModel, cunrrentFileDetail };
};

class MainMiddleComponent extends React.Component {
  render() {
    return (
      <div className="col-sm-6 auto-mx border">
        MainMiddleComponent
        {this.props.cunrrentFileDetail.description}
      </div>
    )
  }
}

export default connect(mapStateToProps)(MainMiddleComponent);