"use client";

export default function OrderSummary({
  items,
  totalCount,
  totalPrice,
  shippingFee,
  total,
  initiateCheckout,
}) {
  return (
    <aside className="h-fit rounded-2xl border border-border bg-white p-6 shadow-sm lg:sticky lg:top-24">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text">Order Summary</h2>
        <p className="mt-1 text-sm text-muted">
          {totalCount} {totalCount === 1 ? "Item" : "Items"}
        </p>
      </div>

      <div className="space-y-5">
        {items.map((item) => (
          <div
            key={item._id}
            className="flex gap-4 border-b border-border pb-4"
          >
            {/* Book Image */}
            <img
              src={item.bookId.image}
              alt={item.bookId.title}
              className="h-20 w-16 rounded-lg object-cover"
            />

            <div className="flex flex-1 flex-col">
              <h3 className="line-clamp-2 font-semibold text-text">
                {item.bookId.title}
              </h3>
              <p className="mt-1 text-sm text-muted">Qty: {item.quantity}</p>
              <p className="mt-2 font-semibold text-primary">
                ₹{item.bookId.price * item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-3">
        <div className="flex justify-between">
          <span className="text-muted">Subtotal</span>
          <span className="font-medium text-text">₹{totalPrice}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted">Shipping</span>
          <span className="font-medium text-text">₹{shippingFee}</span>
        </div>

        <div className="border-t border-border pt-4">
          <div className="flex justify-between text-xl font-bold text-primary">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
      </div>

      <button
        onClick={initiateCheckout}
        className="mt-8 w-full rounded-xl bg-primary py-3 font-semibold text-white transition-all duration-200 hover:bg-slate-800 active:scale-[0.98]"
      >
        Place Order
      </button>

      <div className="mt-6 rounded-xl bg-background p-4">
        <h4 className="font-semibold text-text">Secure Checkout</h4>
        <p className="mt-1 text-sm text-muted">
          Your order is protected and your information is securely processed.
        </p>
      </div>
    </aside>
  );
}
