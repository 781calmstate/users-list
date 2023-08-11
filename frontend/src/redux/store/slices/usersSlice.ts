import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '../../../types/model';

export interface UsersState {
  users: IUser[];
}

const initialState: UsersState = {
  users: [],
};

export const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  reducers: {
    toggle: (state, action: PayloadAction<IUser>) => {
      const isExist = state.users.find(
        (user: IUser) => Number(user.id) === Number(action.payload.id)
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
    edit: (state, action: PayloadAction<IUser>) => {
      state.users = state.users.map((user: IUser) => {
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
        (a: IUser, b: IUser) => Number(a.id) - Number(b.id)
      );
    },
    getUsers: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(init.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export const { toggle, edit, resetFilters, getUsers } = usersSlice.actions;

export default usersSlice.reducer;

export const init = createAsyncThunk('users/fetch', async () => {
  const response = await fetch('http://localhost:4000/users');
  const data = await response.json();
  return data;
});
