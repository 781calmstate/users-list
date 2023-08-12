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
    remove: (state, action: PayloadAction<IUser>) => {
      state.users = state.users.filter(
        (user) => Number(user.id) !== Number(action.payload.id)
      );

      fetch(`http://localhost:4000/users/${action.payload.id}`, {
        method: 'DELETE',
      });
    },
    add: (state, action: PayloadAction<IUser>) => {
      state.users.push(action.payload);

      fetch('http://localhost:4000/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(action.payload),
      });
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

      fetch(`http://localhost:4000/users/${action.payload.id}`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(action.payload),
      });
    },
    resetFilters: (state) => {
      state.users = state.users.sort(
        (a: IUser, b: IUser) => Number(a.id) - Number(b.id)
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export const { remove, add, edit, resetFilters } = usersSlice.actions;

export default usersSlice.reducer;

export const getUsers = createAsyncThunk('users/fetch', async () => {
  const response = await fetch('http://localhost:4000/users');
  const data = await response.json();
  return data;
});
