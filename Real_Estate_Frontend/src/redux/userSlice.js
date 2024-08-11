import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    email: '',
    profilePic: '',
  },
  reducers: {
    updateUser: (state, action) => {
      const { name, email, profilePic } = action.payload;
      if (email) {
        state.email = email;
        // Only update name if it is provided
        if (name !== undefined) {
          state.name = name;
        }
        // Update profilePic if provided, else keep existing
        state.profilePic = profilePic || state.profilePic;
      } else {
        console.error('Invalid payload for updateUser:', action.payload);
      }
    },
    resetUser: (state) => {
      state.name = '';
      state.email = '';
      state.profilePic = '';
    },
  },
});

export const { updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
