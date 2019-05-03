import React from 'react';
import AppHead from './component/appHeader';
import AppMain from './component/appMain';
import { connect } from 'react-redux';
import { refreshComponentFileListAsync } from './redux/actionCreator';

class App extends React.Component {
  componentWillMount() {
    this.props.refreshComponentFileListAsync("http://localhost:3001/components");
  }

  render() {
    return (
          <div >
            <AppHead />
            <AppMain />
          </div>
        );
  }
}

export default connect(null, { refreshComponentFileListAsync })(App);
