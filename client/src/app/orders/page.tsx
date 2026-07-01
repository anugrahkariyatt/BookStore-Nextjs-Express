"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchOrders } from "@/redux/orders/ordersThunk";
import { Package } from "lucide-react";
import ConfirmationModal from "../../components/ConfirmationModal"; 
import api from "../api/axios";
import { successToast, errorToast } from "../../utils/Toast";

const Page = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const { initialized, accessToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (initialized && accessToken) {
      dispatch(fetchOrders());
    }
  }, [initialized, accessToken, dispatch]);

  const { orders, loading, error } = useAppSelector((state) => state.orders);

  const handleCancelOrder = async () => {
    if (!selectedOrderId) return;
    try {
      await api.delete(`/orders/${selectedOrderId}/cancel`);
      successToast("Order cancelled successfully");
      setIsModalOpen(false);
      dispatch(fetchOrders()); 
    } catch (err) {
      errorToast("Failed to cancel order");
    }
  };

  if (loading) return <div className="h-screen text-center py-20 text-text">Loading your orders...</div>;
  if (error) return <div className="h-screen text-center py-20 text-danger">{error}</div>;

  return (
    <div className="container  mx-auto px-4 py-10 max-w-4xl">
      <h2 className="text-3xl font-bold text-text mb-8">My Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-surface rounded-3xl border border-border">
          <Package size={48} className="mx-auto text-muted mb-4" />
          <h3 className="text-xl font-semibold text-text">No Orders Found</h3>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order: any) => (
            <div key={order._id} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-lg">Order #{order._id.slice(-6).toUpperCase()}</h5>
                  <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <span className="font-semibold text-primary">{order.status}</span>
              </div>

              <div className="mt-5 border-t pt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><p className="text-gray-500">Books</p><p className="font-semibold">{order.items.length}</p></div>
                  <div><p className="text-gray-500">Payment</p><p className="font-semibold">{order.paymentMethod}</p></div>
                  <div><p className="text-gray-500">Amount</p><p className="font-semibold text-primary">₹{order.totalPrice}</p></div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button onClick={() => router.push(`/orders/${order._id}`)} className="rounded-lg border border-primary px-4 py-2 font-medium text-primary hover:bg-primary hover:text-white">View Details</button>
                  {order.status === "Pending" && (
                    <button 
                      onClick={() => { setSelectedOrderId(order._id); setIsModalOpen(true); }}
                      className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmationModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleCancelOrder}
        title="Cancel Order?"
        message="Are you sure you want to cancel this order? This action cannot be undone."
        confirmText="Yes, Cancel It"
      />
    </div>
  );
};

export default Page;