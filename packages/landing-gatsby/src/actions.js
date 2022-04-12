//const FileType = require('file-type');
//import fs from 'fs'
//import FileType from "file-type"
import { navigate } from 'gatsby';

export const createUsers = (formValues) => (dispatch) => {
  return fetch(
    //'http://localhost:3000/users',
    `https://juno-back-end.herokuapp.com/users`,
    {
      method: 'POST',
      // mode: 'cors',

      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log('application submission response');
      console.log(data);
      //save token to local storage as its own variable so as not to get overwritten
      console.log('application submission response token', data.token);
      const serializedToken = JSON.stringify(data.token);
      localStorage.setItem('jwt', serializedToken);

      dispatch({
        type: 'POST_USER_SUCCESS',
        payload: data,
      });
    });
};

export const getUser = (userId) => async (dispatch) => {
  // const response = await fetch();
  // dispatch({
  //   type: 'GET_USER_SUCCESS',
  //   payload: response.data,
  // });
};

export const updateUserInfo = (valuesToUpdate, token) => (dispatch) => {
  console.log('Action updateUserInfo: token', token);
  console.log('Action updateUserInfo: values input', valuesToUpdate);
  fetch(
    //'http://localhost:3000/users/me',
    `https://juno-back-end.herokuapp.com/users/me`,
    {
      method: 'PATCH',
      mode: 'cors',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(valuesToUpdate),
    }
  )
    .then((response) => {
      //console.log('Action response: updateUserInfo', response);
      return response.json();
    })
    .then((data) => {
      console.log(
        'Action response: updateUserInfo data: this is the object saved as currentUser',
        data
      );
      var updatedObject = { user: data, token: token };
      //updatedObject.user = data
      //updatedObject.token = token
      console.log(
        'object to be saved from patch after adding token',
        updatedObject
      );
      dispatch({
        type: 'UPDATE_USER_SUCCESS',
        payload: updatedObject,
      });
    });
};

export const loginUser = (formValues) => (dispatch) => {
  console.log('in login user action');
  return fetch(
    //'http://localhost:3000/users/login',
    `https://juno-back-end.herokuapp.com/users/login`,
    {
      method: 'POST',
      mode: 'cors',

      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log('login response gotten from backend', data);
      //save token to local storage as its own variable so as not to get overwritten
      console.log('redux login response token', data.token);
      const serializedToken = JSON.stringify(data.token);
      localStorage.setItem('jwt', serializedToken);
      dispatch({
        type: 'LOGIN_USER_SUCCESS',
        payload: data,
      });
      navigate('/Dashboard/dashboard');
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: 'LOGIN_USER_FAIL',
      });
    });
};

export const logoutUser = (currentUser, token) => (dispatch) => {
  console.log('Action logout: token', token);
  console.log('in logout user action');
  fetch(
    //'http://localhost:3000/users/logout',
    `https://juno-back-end.herokuapp.com/users/logout`,
    {
      method: 'POST',
      mode: 'cors',

      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(currentUser),
    }
  )
    .then(() => {
      localStorage.clear();

      dispatch({
        type: 'LOGOUT_USER_SUCCESS',
        //payload: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const sendFile = (file, token, route) => (dispatch) => {
  //console.log("filetype in send file", FileType.fromFile(file));
  console.log('action: sendFile: token', token);
  console.log('action: sendFile: file', file);
  console.log('action: sendFile: route', route);
  const formData = new FormData();
  formData.append(route, file);
  console.log('action: sendFile file converted to formData', formData);
  fetch(
    //`http://localhost:3000/users/me/${route}`,
    `https://juno-back-end.herokuapp.com/users/me/${route}`,
    {
      method: 'POST',
      mode: 'cors',

      headers: {
        //'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  )
    .then((response) => {
      console.log('response from back end from update user', response);
      return response.json();
    })
    .then((data) => {
      console.log('update User action response data', data);
      dispatch({
        type: 'UPDATE_USER_SUCCESS',
        payload: data,
      });
    });
};

export const toggleSidebar = () => (dispatch) => {
    console.log('toggle sidebar action');
    dispatch({
        type: 'TOGGLE_SIDEBAR',
    });
};

export const showLoader = () => (dispatch) => {
  console.log('show loader action');
  dispatch({
    type: 'SHOW_LOADER',
  });
};

export const hideLoader = () => (dispatch) => {
  console.log('hide loader action');
  dispatch({
    type: 'HIDE_LOADER',
  });
};


export const getMortechRates = (valuesToSend, token) => (dispatch) => {
	//console.log('Action to send getMortechRatesInfo: token', token);
	//console.log('Action to send getMortechRates: values input', valuesToSend);
	fetch(
	  //'http://localhost:3000/getMortechRates',
	  `https://juno-back-end.herokuapp.com/getMortechRates`,
	  {
		method: 'POST',
		mode: 'cors',

		headers: {
		  'Content-Type': 'application/json',
		  Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(valuesToSend),
	  }
	)
	  .then((response) => {
		//gets returned as a readable stream
		//const reader = response.body.getReader();
		/* while(true) {
			const {value, done } = await reader.read();
			if (done) break;
			console.log("received", value)
		} */
		//console.log("reader", reader)
		//return reader
		return response.json();
	  })
	  .then((data) => {
		console.log(
		  'Action response: getMortechRates response from backend: this is the object saved as currentUser',
		  data
		);
		var updatedObject = { user: data, token: token };
		//updatedObject.user = data
		//updatedObject.token = token
		console.log(
		  'object to be saved from patch after adding token',
		  updatedObject
		);
		dispatch({
		  type: 'UPDATE_USER_SUCCESS',
		  payload: updatedObject,
		});
	  });
  };



export const getPreApproval = (valuesToSend, token) => (dispatch) => {
	console.log('Action to send getPreApprovalInfo: token', token);
	console.log('Action to send getPreApproval: values input', valuesToSend);
	fetch(
	  //'http://localhost:3000/users/me/preApproval',
	  `https://juno-back-end.herokuapp.com/users/me/preApproval`,
	  {
		method: 'PATCH',
		mode: 'cors',

		headers: {
		  'Content-Type': 'application/json',
		  Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(valuesToSend),
	  }
	)
	  .then((response) => {
		return response.json();
	  })
	  .then((data) => {
		console.log(
		  'Action response: getPreApproval response from backend: this is the object saved as currentUser',
		  data
		);
		var updatedObject = { user: data, token: token };

		console.log(
		  'object to be saved from patch after adding token',
		  updatedObject
		);
		dispatch({
		  type: 'UPDATE_USER_SUCCESS',
		  payload: updatedObject,
		});
	  });
  };

export const updatePreApprovalLetter = (valuesToSend, token) => (dispatch) => {
	console.log('Action to send getPreApprovalInfo: token', token);
	console.log('Action to send getPreApproval: values input', valuesToSend);
	fetch(
	  //'http://localhost:3000/users/me/updatePreApprovalLetter',
	  `https://juno-back-end.herokuapp.com/users/me/updatePreApprovalLetter`,
	  {
		method: 'PATCH',
		mode: 'cors',
		headers: {
		  'Content-Type': 'application/json',
		  Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(valuesToSend),
	  }
	)
	  .then((response) => {
		return response.json();
	  })
	  .then((data) => {
		console.log(
		  'Action response: getPreApproval response from backend: this is the object saved as currentUser',
		  data
		);
		var updatedObject = { user: data, token: token };
		//updatedObject.user = data
		//updatedObject.token = token
		console.log(
		  'object to be saved from patch after adding token',
		  updatedObject
		);
		dispatch({
		  type: 'UPDATE_USER_SUCCESS',
		  payload: updatedObject,
		});
	  });
  };
