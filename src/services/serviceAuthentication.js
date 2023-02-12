import axios from "axios";

export const login = (email, password) => {

  let body = {
    email: email,
    password: password
  }

  return axios.post('https://node-jwt.onrender.com/api/login', body)
}

export const register = (name, lastname, email, password) => {

  let body = {
    name: name,
    lastName: lastname,
    email: email,
    password: password
  }

  return axios.post('https://node-jwt.onrender.com/api/register', body)
}

export const userList = (token) => {

  var config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  };

  return axios.get('https://node-jwt.onrender.com/api/user', config)
};

export const deleteUserByID = (id, token) => {

  const config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }

  return axios.delete(`https://node-jwt.onrender.com/api/user/${id}`, config)
}


export const editUserByID = (id, name, lastname, email, password, token) => {

  let body = {
    name: name,
    lastName: lastname,
    email: email,
    password: password
  }

  const config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }

  return axios.patch(`https://node-jwt.onrender.com/api/user/${id}`, body, config)
}