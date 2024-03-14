export const GET_USER = "GET_USER";
export const UPDATE_USER = "UPDATE_USER";
export const LOG_OUT = "LOG_OUT";

// recuperer le profil utilisateur

export const getUser = (token) => {
  return (dispatch) => {
    return fetch(`$http://localhost:3001/api/v1/user/profile`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({
          type: GET_USER,
          payload: result.body,
        });
      })
      .catch((err) => console.log(err));
  };
};

// update profil utilisateur

export const updateUser = (firstName, lastName) => {
  const token = localStorage.getItem("jwt");
  return (dispatch) => {
    return fetch(`http://localhost:3001/api/v1/user/profile`, {
      method: "PUT",

      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
      }),
    })
      .then((resp) => resp.json())
      .then(() => {
        dispatch({
          type: UPDATE_USER,
          payload: { firstName, lastName },
        });
      })
      .catch((err) => console.log(err));
  };
};

// log out

export const logOut = () => {
  localStorage.clear();
  return (dispatch) => {
    dispatch({
      type: LOG_OUT,
      payload: "",
    });
    window.location = "/";
  };
};