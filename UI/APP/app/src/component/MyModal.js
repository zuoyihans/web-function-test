import React from 'react';
import $ from 'jquery';

class MyModal extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   index: this.props.index,
    // }
    this.deleteElement = this.deleteElement.bind(this);
  }

  deleteElement(){
    $(`exampleModal${this.props.index}`).modal('toggle');
    this.props.executeLogic(this.props.elememt, this.props.index);
  }

  render() {
    return (
      <div className=" col-1" key={this.props.index}>
        <div style={{cursor:"pointer"}} data-toggle="modal" data-target={`#exampleModal${this.props.index}`}>
          <i className="fas fa-arrow-right fa-ban"></i>
        </div>
        <div className="modal fade" id={`exampleModal${this.props.index}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">CONFIRMATION</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                do you want to delete this componentFile?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">NO</button>
                <button type="button" className="btn btn-primary" onClick={this.deleteElement}>YES</button>
              </div>
            </div>
          </div>
        </div>
        <script>

        </script>
      </div>
    )
  }
}

export default MyModal;
