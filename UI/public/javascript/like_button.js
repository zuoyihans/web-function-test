'use strict';

// import { isMainThread } from "worker_threads";

function getData() {
  console.log('zzq'); 
  axios.get('/components')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
}
class AppHead extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light rounded">
        <a className="navbar-brand" href="#">Navbar</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

class AppMain extends React.Component {
  render() {
    return (
      <main role="main">
        <div className="jumbotron">
          <div className="col-sm-12 mx-auto">
            <h1>Navbar examples</h1>
            <div className="row">
              <LeftMain />
              <RightMain />
            </div>
            
            {/* <p>This example is a quick exercise to illustrate how the navbar and its contents work. Some navbars extend the width of the viewport, others are confined within a <code>.container</code>. For positioning of navbars, checkout the <a href="/docs/4.3/examples/navbar-static/">top</a> and <a href="/docs/4.3/examples/navbar-fixed/">fixed top</a> examples.</p>
            <p>At the smallest breakpoint, the collapse plugin is used to hide the links and show a menu button to toggle the collapsed content.</p>
            <p>
              <a className="btn btn-primary" href="#" role="button">View navbar docs »</a>
            </p> */}
          </div>
         </div>
      </main>
    )
  }
}

class LeftMain extends React.Component {
  render() {
    return (
      <div className="col-sm-4 mx-auto">
        <h4> left main</h4>
        <h5> left main</h5>
        <h6> left main</h6>
      </div>
    )
  }
}
class RightMain extends React.Component {
  render() {
    return (
      <div className="col-sm-8 mx-auto">
        <h4> right main</h4>
      </div>
    )
  }
}

class App extends React.Component {
  render() {
    return (
    <div className="container">
      Hello world！
      <AppHead />
      <AppMain />
      {/* <button type="button" className="btn btn-primary" onClick={getData} >Primary</button> */}
      {/* <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown button
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
      </div> */}
    </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
// const domContainer = document.querySelector('#like_button_container');
// ReactDOM.render(e(LikeButton), domContainer);