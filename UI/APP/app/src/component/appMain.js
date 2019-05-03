import React from 'react';

import MainLeft from './MainLeft';
import MainMiddle from './MainMiddle';
import MainRight from './MainRight';

class AppMain extends React.Component {
  render(){
    return (
      <main role="main">
        <div className="col-sm-12 mx-auto">
          <div className="row flex-xl-nowrap">
            <MainLeft />
            <MainMiddle />
            <MainRight />
          </div>
        </div>
      </main>
    )
  }
}

export default AppMain;