import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  userId: localStorage.getItem('userId') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, _id, email, username, firstname, lastname } = action.payload;
      state.token = token;
      state.userId = _id;
      state.user = { _id, email, username, firstname, lastname };
      localStorage.setItem('token', token);
      localStorage.setItem('userId', _id);
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.userId = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    },
  },
});

export const { setCredentials, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
