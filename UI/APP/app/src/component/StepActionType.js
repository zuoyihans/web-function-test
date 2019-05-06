import React from 'react';
import { STEP_ACTION_TYPE } from '../constants';


class StepActionType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props
    }
  }

  updateValue(value) {
    this.setState({
      type: value,
    })
    this.state.updateProps(value);
  }

  render() {
    return (
      <div className="dropdown">
        <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        ActionType: {this.state.type}
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
          {
            STEP_ACTION_TYPE.map((name,index) => (
              <button className="dropdown-item" type="button" key={index}  value={name} onClick={e => this.updateValue(e.target.value)}> {name}</button>
            ))
          }
        </div>
      </div>
    )
  }
}

export default StepActionType;