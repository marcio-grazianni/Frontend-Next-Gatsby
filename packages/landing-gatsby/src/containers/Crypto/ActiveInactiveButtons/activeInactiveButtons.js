import React, { Fragment } from 'react';
import { MDBBtn } from 'mdbreact';

const ButtonPage = () => {
  return (
    <Fragment>
      <MDBBtn active color="primary">
        3%
      </MDBBtn>
      <MDBBtn color="primary">4.99%</MDBBtn>
    </Fragment>
  );
};

export default ButtonPage;
