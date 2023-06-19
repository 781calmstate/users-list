import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../../types/model';

export interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});
