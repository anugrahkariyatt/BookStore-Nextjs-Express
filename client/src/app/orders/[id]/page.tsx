"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/app/api/axios";

const page = () => {
  const { id } = useParams();

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/orders/${id}`);
        setOrder(res.data.order);
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to fetch order details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading order...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex h-screen items-center justify-center">
        Order not found
      </div>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      {" "}
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 border-b pb-6 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold">
              Order #{order._id.slice(-6).toUpperCase()}
            </h1>

            <p className="mt-2 text-gray-500">
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              order.status === "Delivered"
                ? "bg-green-100 text-green-700"
                : order.status === "Cancelled"
                  ? "bg-red-100 text-red-700"
                  : order.status === "Shipped"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {order.status}
          </span>
        </div>

        {/* Shipping & Payment */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border p-5">
            <h2 className="mb-4 text-lg font-semibold">Shipping Address</h2>

            <div className="space-y-2 text-gray-700">
              <p>
                <strong>{order.shippingAddress.name}</strong>
              </p>

              <p>{order.shippingAddress.phone}</p>

              <p>{order.shippingAddress.addressLine1}</p>

              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}
              </p>

              <p>{order.shippingAddress.pincode}</p>
            </div>
          </div>

          <div className="rounded-xl border p-5">
            <h2 className="mb-4 text-lg font-semibold">Payment Details</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Payment Method</span>
                <span className="font-medium">{order.paymentMethod}</span>
              </div>

              <div className="flex justify-between">
                <span>Status</span>
                <span className="font-medium">{order.status}</span>
              </div>

              <div className="flex justify-between">
                <span>Total Amount</span>
                <span className="text-lg font-bold text-primary">
                  ₹{order.totalPrice}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Ordered Books */}
        <div className="mt-10">
          <h2 className="mb-5 text-xl font-semibold">Ordered Books</h2>

          <div className="overflow-hidden rounded-xl border">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="text-left">
                  <th className="px-5 py-3">Book</th>
                  <th className="px-5 py-3">Price</th>
                  <th className="px-5 py-3">Quantity</th>
                  <th className="px-5 py-3">Subtotal</th>
                </tr>
              </thead>

              <tbody>
                {order.items.map((item: any) => (
                  <tr key={item._id} className="border-t">
                    <td className="px-5 py-4 font-medium">{item.title}</td>

                    <td className="px-5 py-4">₹{item.price}</td>

                    <td className="px-5 py-4">{item.quantity}</td>

                    <td className="px-5 py-4 font-semibold">
                      ₹{item.price * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
