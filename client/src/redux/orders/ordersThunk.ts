import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/api/axios";
import axios from "axios";

import {
  Order,
  FetchOrdersResponse,
  PlaceOrderResponse,
  ShippingAddress,
} from "../../../types/order";

interface PlaceOrderPayload {
  cartId: string;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
}

export const fetchOrders = createAsyncThunk<
  Order[],
  void,
  { rejectValue: string }
>("orders/fetchOrders", async (_, thunkAPI) => {
  try {

    const res = await api.get<FetchOrdersResponse>("/orders");
    console.log("Res", res.data);
    console.log("fetchOrders thunk started");

    return res.data.orders;
  } catch (error) {
    console.log("Orders request failed:", error);

    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error ??
          error.message ??
          "Failed to fetch orders",
      );
    }

    return thunkAPI.rejectWithValue("Failed to fetch orders");
  }
});

export const placeOrder = createAsyncThunk<
  Order,
  PlaceOrderPayload,
  { rejectValue: string }
>(
  "orders/placeOrder",
  async ({ cartId, shippingAddress, paymentMethod }, thunkAPI) => {
    try {
      const res = await api.post<PlaceOrderResponse>(`/orders/${cartId}`, {
        shippingAddress,
        paymentMethod,
      });

      return res.data.order;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.error ??
            error.message ??
            "Failed to place order",
        );
      }

      return thunkAPI.rejectWithValue("Failed to place order");
    }
  },
);
