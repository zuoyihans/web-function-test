import React from 'react';
import { connect } from 'react-redux';
import { refreshCurrentComponentFileAsync } from '../redux/actionCreator';

const mapStateToProps = state => { 
  const { componentFiles, idList } = state.ComponentFile;
  return { componentFiles, idList };
};

class MainLeft extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectIndex: "",
    };
  }
  selectComponentFile = (selectIndex, link) => {
    this.setState({ selectIndex: selectIndex });
    this.props.refreshCurrentComponentFileAsync(link);
  }

  render(){
    return (
      <div className="col-sm-3 mx-auto border">
        <ul className="list-group">
          {
            this.props.idList.map((elememt) => {
              return (
              <li 
                className={this.state.selectIndex === elememt ?"list-group-item active":"list-group-item"} 
                key={elememt}
                onClick={e => this.selectComponentFile(elememt, this.props.componentFiles[elememt].link)}
              >
                {this.props.componentFiles[elememt].fileName}
              </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default connect(mapStateToProps, { refreshCurrentComponentFileAsync })(MainLeft);