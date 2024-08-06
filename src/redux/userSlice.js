import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  profilePic: '/path/to/profile-pic.jpg',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.email = action.payload.email;
      state.profilePic = action.payload.profilePic;
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
