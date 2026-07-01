import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/api/axios";
import axios from "axios";
import { CartItem, FetchCartResponse } from "../../../types/cart";

export const fetchCart = createAsyncThunk<
  CartItem[],
  void,
  { rejectValue: string }
>("cart/fetchCart", async (_, thunkAPI) => {
  try {
    const res = await api.get<FetchCartResponse>("/cart", {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTMzOTNkYjM2YTg0MGU0MmQ3YTZhODYiLCJyb2xlIjoidXNlciIsImlhdCI6MTc4MjcxMjE5OSwiZXhwIjoxNzgyNzk4NTk5fQ.YowZfwahyU3N7gIYAxmhNF6msQ_CWPfjnljO8Kfh2nk`,
      },
    });
    // console.log("Response", res.data);

    return res.data.Cart.items;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error ?? error.message ?? "Failed to fetch cart",
      );
    }

    return thunkAPI.rejectWithValue("Failed to fetch cart");
  }
});

export const removeFromCart = createAsyncThunk<
  CartItem[],
  string,
  {
    rejectValue: string;
  }
>("cart/removeFromCart", async (bookId: string, thunkAPI) => {
  try {
    const res = await api.delete(`/cart/${bookId}`);
    return res.data.Cart.items;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error ?? error.message ?? "Failed to fetch cart",
      );
    }

    return thunkAPI.rejectWithValue("Failed to fetch cart");
  }
});

interface UpdateCartQuantityPayload {
  cartItemId: string;
  quantity: number;
}

export const updateCartQuantity = createAsyncThunk<
  CartItem[],
  UpdateCartQuantityPayload,
  { rejectValue: string }
>(
  "cart/updateCartQuantity",
  async ({ cartItemId, quantity }: UpdateCartQuantityPayload, thunkAPI) => {
    try {
      const res = await api.patch(`/cart/${cartItemId}`, { quantity });
      return res.data.Cart.items;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.error ??
            error.message ??
            "Failed to fetch cart",
        );
      }

      return thunkAPI.rejectWithValue("Failed to fetch cart");
    }
  },
);
