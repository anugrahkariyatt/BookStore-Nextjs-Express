"use client";

import { ShoppingBag, X } from "lucide-react";

export default function ConfirmOrderModal({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl border border-border bg-surface shadow-2xl">
          <div className="flex items-center justify-between border-b border-border p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background">
                <ShoppingBag size={24} className="text-primary" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-text">Confirm Order</h2>
                <p className="text-sm text-muted">
                  Please review before placing your order.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-lg p-2 text-text transition hover:bg-background"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6">
            <p className="leading-7 text-muted">
              You're about to place your order.
              <br />
              Once confirmed, your order will be processed immediately and
              cannot be edited.
            </p>
          </div>

          <div className="flex gap-3 border-t border-border p-6">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-border bg-surface py-3 font-semibold text-text transition hover:bg-background"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              className="flex-1 rounded-xl bg-primary py-3 font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}