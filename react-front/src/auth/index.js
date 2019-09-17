export const signup = (user) => {
  
  return fetch(`${process.env.REACT_APP_API_URL}/signup`, {
            method: "POST",
            headers: {
              'Accept': "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
          })
          .then(response => {
            return response.json();
          })
          .catch(err =>{
            console.log(err)
          });
}


export const signin = (user) => {
        return fetch(`${process.env.REACT_APP_API_URL}/signin`, {
            method: "POST",
            headers: {
                'Accept': "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(response => {
            return response.json();
        }).catch(err => {
            console.log(err)
        });
    }



export const authentication = (jwt, next) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem("jwt", JSON.stringify(jwt))
            next();
        }
    }


export const signout = (next) => {
  if( typeof window !== "undefined") { localStorage.removeItem("jwt")}
  next();
  fetch(`${process.env.REACT_APP_API_URL}/signout`, {
            method: "GET",
        }).then(response => {
            console.log('signout', response);
            return response.json();

        }).catch(err => {
            console.log(err)
        });

}
export const isAuthentitacted = () => {
  if( typeof window === "undefined") {
    return false
  }
  if(localStorage.getItem("jwt")){
    return JSON.parse(localStorage.getItem("jwt"))
  }else{
    return false
  }
}

export const updateUser = (user, next) => {
  if(typeof window !== 'undefined'){
    if( localStorage.getItem('jwt')){
      const auth = JSON.parse(localStorage.getItem('jwt'));
      auth.user = user;
      localStorage.setItem('jwt' , JSON.stringify(auth));
      next();
    }
  }


}