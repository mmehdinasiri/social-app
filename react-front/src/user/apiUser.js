export const read = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`,{
    method : "GET",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  .then(response => {
    return response.json()
  }).catch(err => {
    console.log(err);
  })
}

export const update = (userId, token, user) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`,{
    method : "PUT",
    headers: {
      'Accept': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: user
  })
  .then(response => {
    return response.json()
  }).catch(err => {
    console.log(err);
  })
}


export const remove = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`,{
    method : "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  .then(response => {
    return response.json()
  }).catch(err => {
    console.log(err);
  })
}

export const list = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/users`,{
    method : "GET",
  })
  .then(response => {
    return response.json()
  }).catch(err => {
    console.log(err);
  })
}