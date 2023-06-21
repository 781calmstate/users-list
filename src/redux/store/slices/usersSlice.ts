import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { User } from '../../../types/model';

export interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

export const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  reducers: {
    toggle: (state, action: PayloadAction<User>) => {
      const isExist = state.users.find(
        (user: User) => Number(user.id) === Number(action.payload.id)
      );

      if (isExist) {
        state.users = state.users.filter(
          (user) => Number(user.id) !== Number(action.payload.id)
        );
      } else {
        state.users.push(action.payload);
      }

      localStorage.setItem('usersData', JSON.stringify(state.users));
    },
    edit: (state, action: PayloadAction<User>) => {
      state.users = state.users.map((user: User) => {
        return Number(user.id) === Number(action.payload.id)
          ? {
              ...user,
              name: action.payload.name,
              username: action.payload.username,
            }
          : user;
      });
      localStorage.setItem('usersData', JSON.stringify(state.users));
    },
    resetFilters: (state) => {
      state.users = state.users.sort(
        (a: User, b: User) => Number(a.id) - Number(b.id)
      );
    },
    getUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.fulfilled, (state, action) => {
      state.users = action.payload;
      localStorage.setItem('usersData', JSON.stringify(action.payload));
    });
  },
});

export const { toggle, edit, resetFilters, getUsers } = usersSlice.actions;

export default usersSlice.reducer;

export const init = createAsyncThunk('users/fetch', async () => {
  const usersData = JSON.parse(localStorage.getItem('usersData') || '[]');

  if (usersData.length) {
    return usersData;
  }
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  return data;
});
