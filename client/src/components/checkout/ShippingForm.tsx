"use client";

export default function ShippingForm({ formData, handleChange }) {
  return (
    <section className="lg:col-span-2 rounded-2xl border border-border bg-white p-8 shadow-sm">
      <h2 className="mb-8 text-2xl font-bold text-text">Shipping Address</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-text">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full rounded-xl border border-border px-4 py-3 outline-none transition focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-text">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 9876543210"
            className="w-full rounded-xl border border-border px-4 py-3 outline-none transition focus:border-primary"
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium text-text">
          Address
        </label>
        <textarea
          rows={4}
          name="addressLine1"
          value={formData.addressLine1}
          onChange={handleChange}
          placeholder="House No, Street, Area"
          className="w-full rounded-xl border border-border px-4 py-3 outline-none transition focus:border-primary"
        />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-text">
            City
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full rounded-xl border border-border px-4 py-3 outline-none transition focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-text">
            State
          </label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full rounded-xl border border-border px-4 py-3 outline-none transition focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-text">
            Pincode
          </label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="w-full rounded-xl border border-border px-4 py-3 outline-none transition focus:border-primary"
          />
        </div>
      </div>

      <div className="mt-10">
        <h2 className="mb-5 text-2xl font-bold text-text">Payment Method</h2>

        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-primary bg-surface p-4">
          <input
            type="radio"
            name="paymentMethod"
            value="COD"
            checked={formData.paymentMethod === "COD"}
            onChange={handleChange}
            className="h-5 w-5 accent-primary"
          />
          <div>
            <h3 className="font-semibold text-text">Cash On Delivery</h3>
            <p className="text-sm text-muted">Pay when your order arrives.</p>
          </div>
        </label>

        <label className="mt-4 flex cursor-not-allowed items-center gap-3 rounded-xl border border-border bg-surface p-4 opacity-60">
          <input disabled type="radio" />
          <div>
            <h3 className="font-semibold text-text">UPI / Card</h3>
            <p className="text-sm text-muted">Coming Soon</p>
          </div>
        </label>
      </div>
    </section>
  );
}
