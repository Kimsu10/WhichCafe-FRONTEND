const initialState = {
  account: '',
  loggedIn: false,
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, account: action.payload.account, loggedIn: true };
    case 'LOGOUT':
      return { ...state, account: '', loggedIn: false };
    default:
      return state;
  }
};

export default accountReducer;
