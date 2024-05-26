import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { signin as signinAction } from "./authSlice";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const userThunks = {
  getAllUsers: createAsyncThunk(
    "user/getAllUsers",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(
          `${"https://euphoria-six.vercel.app/api"}/users/admin/all`
        );
        if (data.success) {
          return data.users;
        }
      } catch (error) {
        console.error("Error fetching users:", error.response.data);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
  updateUser: createAsyncThunk(
    "user/updateUser",
    async ({ values, url }, { dispatch, rejectWithValue }) => {
      try {
        const { data } = await axios.put(
          `${"https://euphoria-six.vercel.app/api"}${url}`,
          values
        );
        if (data.success) {
          dispatch(signinAction({ user: data.user }));
          return data.user;
        }
      } catch (error) {
        console.error("Error Updating user:", error.response.data);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
  deleteUser: createAsyncThunk(
    "user/deleteUser",
    async ({ url }, { rejectWithValue }) => {
      try {
        const { data } = await axios.delete(`${"https://euphoria-six.vercel.app/api"}${url}`);
        if (data.success) {
          message.success(data.message);
          return data.user._id;
        }
      } catch (error) {
        console.error("Error deleting user:", error.response.data);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
};

export const useUserEffect = (type) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "get-user") {
      dispatch(userThunks.getPresentUser());
    } else {
      dispatch(userThunks.getAllUsers());
    }
  }, [dispatch]);
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userThunks.getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(userThunks.getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(userThunks.getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      })
      .addCase(userThunks.updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(userThunks.updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex(
          (user) => user._id === action.payload._id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(userThunks.updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      })
      .addCase(userThunks.deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(userThunks.deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((user) => user._id !== action.payload);
      })
      .addCase(userThunks.deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
