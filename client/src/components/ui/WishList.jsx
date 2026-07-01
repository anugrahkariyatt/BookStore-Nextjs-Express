"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { X, Trash2, ShoppingCart } from "lucide-react";
import {
  clearWishList,
  closeWishList,
  removeFromWishList,
} from "../../redux/wishlist/wishListSlice";
import api from "../../app/api/axios";

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const isWishListOpen = useAppSelector((state) => state.wishlist.isWishListOpen);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  if (!isWishListOpen) return null;
  const addToCart = async (id) => {
    try {
      const res = await api.post(`/cart/${id}`, { stock: 1 });

      if (res.status === 200 || res.status === 201) {
        dispatch(removeFromWishList(id));
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />

      <aside className="fixed right-0 top-0 z-50 flex h-screen w-full bg-white shadow-2xl sm:w-[420px]">
        <div className="flex h-full w-full flex-col">
          <div className="flex items-center justify-between border-b border-border bg-background px-6 py-5">
            <h2 className="text-2xl font-bold text-text">My Wishlist</h2>

            <button
              onClick={() => {
                dispatch(closeWishList());
                console.log("here click");
              }}
              className="rounded-lg p-2 text-text transition hover:bg-accent"
            >
              <X size={22} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <div className="mb-5 flex justify-end">
              <button
                onClick={() => dispatch(clearWishList())}
                disabled={wishlistItems.length === 0}
                className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-text transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
              >
                Clear Wishlist
              </button>
            </div>

            {wishlistItems.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <h3 className="text-2xl font-semibold text-text">
                  Your wishlist is empty
                </h3>

                <p className="mt-2 text-muted">
                  Save your favourite books here.
                </p>

                <button
                  onClick={() => {
                    dispatch(closeWishList());
                    router.push("/books");
                  }}
                  className="mt-6 rounded-xl bg-primary px-6 py-3 font-medium text-white transition hover:opacity-90 active:scale-95"
                >
                  Browse Books
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {wishlistItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex gap-4 rounded-2xl border border-border bg-white p-4 shadow-sm transition hover:shadow-md"
                  >
                    {/* Book Image */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-28 w-20 rounded-lg border border-border object-cover"
                    />

                    <div className="flex flex-1 flex-col">
                      <h3 className="line-clamp-2 font-semibold text-text">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-lg font-bold text-primary">
                        ₹{item.price}
                      </p>

                      <div className="mt-auto flex gap-2 pt-4">
                        <button
                          onClick={() => addToCart(item._id)}
                          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition "
                        >
                          <ShoppingCart size={16} />
                          Add to Cart
                        </button>

                        <button
                          onClick={() => dispatch(removeFromWishList(item._id))}
                          className="rounded-xl border border-border p-2 text-muted transition hover:border-danger hover:bg-background hover:text-danger"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Wishlist;
