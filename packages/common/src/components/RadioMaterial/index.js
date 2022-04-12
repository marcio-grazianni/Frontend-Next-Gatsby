import React, { Component } from 'react';
import { MDBFormInline, MDBInput } from 'mdbreact';

class InputPage extends Component {
  state = {
    radio: '',
  };

  onClick = (nr) => () => {
    this.setState({
      radio: nr,
    });
  };

  render() {
    return (
      <MDBFormInline>
        <MDBInput
          gap
          onClick={this.onClick(1)}
          checked={this.state.radio === 1 ? true : false}
          label="Latino"
          type="radio"
          id="radio1"
          containerClass="mr-5"
        />
        <MDBInput
          gap
          onClick={this.onClick(2)}
          checked={this.state.radio === 2 ? true : false}
          label="Non-latino"
          type="radio"
          id="radio2"
          containerClass="mr-5"
        />
        <MDBInput
          gap
          onClick={this.onClick(3)}
          checked={this.state.radio === 3 ? true : false}
          label="martian"
          type="radio"
          id="radio3"
          containerClass="mr-5"
        />
      </MDBFormInline>
    );
  }
}

export default InputPage;
