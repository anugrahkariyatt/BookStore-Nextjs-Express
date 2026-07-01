"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { X, Trash2, Plus, Minus, Heart } from "lucide-react";

import { closeCart } from "@/redux/cart/cartSlice";
import {
  fetchCart,
  removeFromCart,
  updateCartQuantity,
} from "@/redux/cart/cartThunk";

const Cart = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [wishlist, setWishlist] = useState([]);

  const { items, loading, error, isCartOpen, totalCount, totalPrice } =
    useAppSelector((state) => state.cart);

  const { loading: orderLoading } = useAppSelector((state) => state.orders);

  useEffect(() => {
    if (isCartOpen) {
      dispatch(fetchCart());
    }
  }, [dispatch, isCartOpen]);

  const handleQuantity = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateCartQuantity({ cartItemId: id, quantity }));
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const checkout = () => {
    dispatch(closeCart());
    router.push("/checkout");
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div
        onClick={() => dispatch(closeCart())}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
      />

      <aside className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-md flex-col border-l border-border bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="text-2xl font-bold text-primary">My Cart</h2>
          <button
            onClick={() => dispatch(closeCart())}
            className="cursor-pointer rounded-full p-2 text-text transition-colors duration-200 hover:bg-background hover:text-accent"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {loading && (
            <div className="flex justify-center py-12">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          )}

          {!loading && items.length === 0 && (
            <div className="py-16 text-center">
              <h3 className="text-xl font-semibold text-primary">
                Your cart is empty
              </h3>
              <p className="mt-2 text-muted">
                Add some books to continue shopping.
              </p>
            </div>
          )}

          <div className="space-y-5">
            {items.map((item) => (
              <div
                key={item._id}
                className="group relative rounded-2xl border border-border bg-white p-4 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex gap-4">
                  <img
                    src={item.bookId.image}
                    alt={item.bookId.title}
                    className="h-28 w-20 rounded-xl object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-text pr-4">
                        {item.bookId.title}
                      </h3>
                      <button
                        onClick={() => toggleWishlist(item._id)}
                        className={`transition-colors ${wishlist.includes(item._id) ? "text-danger" : "text-gray-300 hover:text-danger"}`}
                      >
                        <Heart
                          size={20}
                          fill={
                            wishlist.includes(item._id)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>
                    </div>
                    <p className="mt-1 text-xl font-bold text-primary">
                      ₹{item.bookId.price * item.quantity}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center rounded-xl border border-border">
                        <button
                          onClick={() =>
                            handleQuantity(item._id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          className="p-2 text-text hover:bg-background disabled:opacity-30"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-3 font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantity(item._id, item.quantity + 1)
                          }
                          className="p-2 text-text hover:bg-background"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                        onClick={() => dispatch(removeFromCart(item._id))}
                        className="text-danger p-2 hover:bg-danger/10 rounded-full"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {items.length > 0 && (
          <div className="border-t border-border bg-surface px-6 py-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted">Total Items</p>
                <h3 className="text-xl font-bold text-primary">{totalCount}</h3>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted">Total Price</p>
                <h3 className="text-2xl font-bold text-primary">
                  ₹{totalPrice}
                </h3>
              </div>
            </div>
            <button
              onClick={checkout}
              className="w-full rounded-xl bg-primary py-3 font-semibold text-white hover:bg-slate-800 transition-all active:scale-[0.98]"
            >
              {orderLoading ? "Processing..." : "Proceed to Checkout"}
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default Cart;
