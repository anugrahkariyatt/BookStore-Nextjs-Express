"use client";

import api from "../../app/api/axios";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Heart } from "lucide-react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { fetchCart } from "../../redux/cart/cartThunk";
import {
  addToWishList,
  removeFromWishList,
} from "../../redux/wishlist/wishListSlice";

const BookCards = ({ book, variant = "grid" }) => {
  const dispatch = useAppDispatch();

  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  const isWishlisted = wishlistItems.some((item) => item._id === book._id);

  const addToCart = async (id) => {
    try {
      const res = await api.post(`/cart/${id}`, { stock: 1 });

      if (res.status === 200 || res.status === 201) {
        dispatch(fetchCart());
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const styles = {
    slider: {
      card: "w-[180px] sm:w-[200px] md:w-[220px] lg:w-[240px] xl:w-[250px] flex-shrink-0",
      image: "aspect-[2/3]",
    },
    grid: {
      card: "w-full",
      image: "aspect-[2/3]",
    },
  };

  const current = styles[variant];

  return (
    <div
      className={`${current.card} group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl`}
    >
      <div className="relative p-4">
        <button
          onClick={(e) => {
            e.stopPropagation();

            if (isWishlisted) {
              dispatch(removeFromWishList(book._id));
            } else {
              dispatch(addToWishList(book));
            }
          }}
          className="absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110"
        >
          <Heart
            size={18}
            className={
              isWishlisted ? "fill-danger text-danger" : "text-secondary"
            }
          />
        </button>

        <div
          className={`${current.image} overflow-hidden rounded-xl bg-background`}
        >
          <img
            src={book.image}
            alt={book.title}
            className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
          />
        </div>
      </div>

      <div className="px-4 pb-2">
        <h3 className="line-clamp-2 text-lg font-semibold text-text">
          {book.title}
        </h3>

        <p className="mt-1 line-clamp-1 text-sm text-secondary">
          {book.author}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-2xl font-bold ">₹{book.price}</p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(book._id);
            }}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 active:scale-95 whitespace-nowrap"
          >
            <AddShoppingCartIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCards;
