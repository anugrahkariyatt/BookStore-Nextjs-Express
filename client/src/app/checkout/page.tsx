"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import api from "@/app/api/axios";
import { placeOrder } from "@/redux/orders/ordersThunk";
// import { successToast, errorToast } from "@/utils/Toast";

import ShippingForm from "@/components/checkout/ShippingForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import ConfirmOrderModal from "@/components/checkout/ConfirmOrderModal";

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items, totalPrice, totalCount } = useAppSelector(
    (state) => state.cart,
  );

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    addressLine1: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "COD",
  });

  const shippingFee = 40;

  const total = totalPrice + shippingFee;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const initiateCheckout = () => {
    console.log("Opening modal");

    const { name, phone, addressLine1, city, state, pincode } = formData;

    if (!name || !phone || !addressLine1 || !city || !state || !pincode) {
      // errorToast("Please fill all required fields.");
      return;
    }

    setShowModal(true);
  };

  const handlePlaceOrder = async () => {
    try {
      const res = await api.get("/cart");
      const cartId = res.data.Cart._id;

      await dispatch(
        placeOrder({
          cartId,
          shippingAddress: formData,
          paymentMethod: formData.paymentMethod,
        }),
      ).unwrap();

      setShowModal(false);

      router.push("/orders");
    } catch (err) {
      console.error(err);
      setShowModal(false);
    }
  };

  if (!items.length) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h2 className="text-2xl font-semibold">Your cart is empty.</h2>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-5">
        <h1 className="mb-8 text-4xl font-bold">Checkout</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <ShippingForm formData={formData} handleChange={handleChange} />

          <OrderSummary
            items={items}
            totalCount={totalCount}
            totalPrice={totalPrice}
            shippingFee={shippingFee}
            total={total}
            initiateCheckout={initiateCheckout}
          />
        </div>

        <ConfirmOrderModal
          open={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handlePlaceOrder}
        />
      </div>
    </main>
  );
}
