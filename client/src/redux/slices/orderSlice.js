import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { message } from "antd";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const orderThunks = {
  getOrders: createAsyncThunk(
    "orders/getOrders",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(
          `${"https://euphoria-six.vercel.app/api"}/orders/my-orders`
        );
        if (data.success) {
          return data.orders;
        }
      } catch (error) {
        console.error("Error fetching orders:", error.response.data);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
  getAllOrders: createAsyncThunk(
    "orders/getAllOrders",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(`${"https://euphoria-six.vercel.app/api"}/orders/admin/all`);
        if (data.success) {
          return data.orders;
        }
      } catch (error) {
        console.error("Error fetching orders:", error.response.data);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
  updateOrders: createAsyncThunk(
    "orders/updateOrders",
    async ({ id, status }, { rejectWithValue }) => {
      try {
        const { data } = await axios.put(
          `${"https://euphoria-six.vercel.app/api"}/orders/update/${id}`,
          { status }
        );
        if (data.success) {
          message.success(data.message);
          return data.order;
        }
      } catch (error) {
        console.error("Error fetching orders:", error.response.data);
        return rejectWithValue(error.response.data.message);
      }
    }
  ),
};

export const useOrderEffect = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(orderThunks.getOrders());
  }, [dispatch]);
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(orderThunks.getOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(orderThunks.getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(orderThunks.getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      })
      .addCase(orderThunks.getAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(orderThunks.getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(orderThunks.getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      })
      .addCase(orderThunks.updateOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(orderThunks.updateOrders.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex(
          (order) => order._id === action.payload._id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(orderThunks.updateOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        message.error(action.payload);
      });
  },
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;
