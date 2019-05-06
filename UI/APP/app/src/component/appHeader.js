import React from 'react';

class AppHead extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-info rounded">
        <a className="navbar-brand" href="test">Navbar</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="test">Home </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="test">Link</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default AppHead;
