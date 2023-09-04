import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../models/IUser';
import userService from '../../services/usersService';

interface IUserState {
  users: IUser[];
  isLoading: boolean;
  error: string;
}

const initialState: IUserState = {
  users: [],
  isLoading: false,
  error: '',
}

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (params, thunkAPI) => {
    try {
      const users = await userService.getUsers(params)
      return users.data;
    } catch(err: any) {
      thunkAPI.rejectWithValue(err.message)
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id: number, thunkAPI) => {
    try {
      await userService.deleteUser(`${id}`)
    } catch(err: any) {
      thunkAPI.rejectWithValue(err.message)
    }
  }
);

export const addUser = createAsyncThunk(
  'users/addUser',
  async (newUser: IUser, thunkAPI) => {
    try {
      await userService.addUser(newUser);
    } catch(err: any) {
      thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
  extraReducers: {
    [getUsers.pending.type]: (state, action: PayloadAction<IUser[]>) => {
      state.isLoading = true;
    },
    [getUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
      state.isLoading = false;
      state.error = '';
      state.users = action.payload;
    },
    [getUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteUser.pending.type]: (state, action: PayloadAction<IUser[]>) => {
      state.isLoading = true;
    },
    [deleteUser.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
      state.isLoading = false;
      state.error = '';
    },
    [deleteUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
})



export default userSlice.reducer;