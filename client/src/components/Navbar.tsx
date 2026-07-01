"use client";
import { openCart } from "@/redux/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import {
  Heart,
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Home,
  BookOpen,
  Info,
  Phone,
  ShoppingBag,
  LogOut,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { openWishList } from "@/redux/wishlist/wishListSlice";
import type { RootState } from "@/redux/store";
import { logoutUser } from "@/redux/auth/authThunk";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const wishlistCount = useAppSelector((state) => state.wishlist.items.length);
  const profileRef = useRef<HTMLDivElement>(null);
  const { totalCount } = useAppSelector((state) => state.cart);
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        profileRef.current &&
        e.target instanceof Node &&
        !profileRef.current.contains(e.target)
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = async () => {
    await dispatch(logoutUser());
  };
  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="text-3xl font-bold">
            <span className="text-secondary">Story</span>
            <span className="text-primary">Verse</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className="font-medium text-accent  hover:text-accent transition"
            >
              Home
            </Link>

            <Link
              href="/books"
              className="font-medium text-text hover:text-accent transition"
            >
              Books
            </Link>

            <Link
              href="/about"
              className="font-medium text-text hover:text-accent transition"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="font-medium text-text hover:text-accent transition"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Right */}

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => router.push("/books?focus=true")}
              className="group rounded-full p-2 text-text hover:bg-background hover:text-accent transition-colors duration-200"
            >
              <Search size={20} />
            </button>

            <button
              onClick={() => dispatch(openWishList())}
              className="group relative rounded-full p-2 text-text hover:bg-background hover:text-accent transition-colors duration-200"
            >
              <Heart size={20} />

              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-danger text-xs text-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={() => dispatch(openCart())}
              className="group relative rounded-full p-2 text-text transition-colors duration-200 hover:bg-background hover:text-accent"
            >
              <ShoppingCart size={20} />

              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-danger text-xs text-white">
                {totalCount}
              </span>
            </button>

            <div className="relative" ref={profileRef}>
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="group rounded-full p-2 text-text transition-colors duration-200 hover:bg-background hover:text-accent"
                  >
                    <User size={20} />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-border bg-white py-2 shadow-xl">
                      <Link
                        href="/orders"
                        className="group flex items-center gap-3 px-4 py-3 text-text transition-colors duration-200 hover:bg-background hover:text-accent"
                      >
                        <ShoppingBag
                          size={18}
                          className="transition-colors group-hover:text-accent"
                        />
                        My Orders
                      </Link>

                      <Link
                        href="/profile"
                        className="group flex items-center gap-3 px-4 py-3 text-text transition-colors duration-200 hover:bg-background hover:text-accent"
                      >
                        <User
                          size={18}
                          className="transition-colors group-hover:text-accent"
                        />
                        Profile
                      </Link>

                      <hr className="my-2 border-border" />

                      <button
                        onClick={handleLogout}
                        className="group flex w-full items-center gap-3 px-4 py-3 text-danger transition-colors duration-200 hover:bg-danger/10"
                      >
                        <LogOut
                          size={18}
                          className="transition-colors group-hover:text-danger"
                        />
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href="/login"
                  className="rounded-full p-2 text-text transition-colors duration-200 hover:bg-background hover:text-accent"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Right */}

          <div className="flex items-center gap-2 lg:hidden">
            {/* Search */}
            <button className="group rounded-full p-2 text-text transition-colors duration-200 hover:bg-background hover:text-accent">
              <Search size={20} />
            </button>

            {/* Cart */}
            <button
              onClick={() => dispatch(openCart())}
              className="group relative rounded-full p-2 text-text transition-colors duration-200 hover:bg-background hover:text-accent"
            >
              <ShoppingCart size={20} />

              {totalCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-danger text-xs font-medium text-white">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Menu */}
            <button
              onClick={() => setMobileOpen(true)}
              className="group rounded-full p-2 text-text transition-colors duration-200 hover:bg-background hover:text-accent"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}

      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <aside className="fixed right-0 top-0 z-50 flex h-full w-80 flex-col bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border p-5">
              <h2 className="text-2xl font-bold text-primary">Menu</h2>

              <button
                onClick={() => setMobileOpen(false)}
                className="group rounded-full p-2 text-text transition-colors duration-200 hover:bg-background hover:text-accent"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-5">
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-center gap-4 rounded-xl p-3 text-text transition-colors duration-200 hover:bg-background hover:text-accent"
                  >
                    <Home
                      size={20}
                      className="transition-colors group-hover:text-accent"
                    />
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    href="/books"
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-center gap-4 rounded-xl p-3 text-text transition-colors duration-200 hover:bg-background hover:text-accent"
                  >
                    <BookOpen
                      size={20}
                      className="transition-colors group-hover:text-accent"
                    />
                    Books
                  </Link>
                </li>

                <li>
                  <Link
                    href="/wishlist"
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-center justify-between rounded-xl p-3 text-text transition-colors duration-200 hover:bg-background hover:text-accent"
                  >
                    <div className="flex items-center gap-4">
                      <Heart
                        size={20}
                        className="transition-colors group-hover:text-accent"
                      />
                      <span>Wishlist</span>
                    </div>

                    {wishlistCount > 0 && (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-danger text-xs font-medium text-white">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                </li>

                <li>
                  <Link
                    href="/cart"
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-center justify-between rounded-xl p-3 text-text transition-colors duration-200 hover:bg-background hover:text-accent"
                  >
                    <div className="flex items-center gap-4">
                      <ShoppingCart
                        size={20}
                        className="transition-colors group-hover:text-accent"
                      />
                      <span>Cart</span>
                    </div>

                    {totalCount > 0 && (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-danger text-xs font-medium text-white">
                        {totalCount}
                      </span>
                    )}
                  </Link>
                </li>

                <li>
                  <Link
                    href="/about"
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-center gap-4 rounded-xl p-3 text-text transition-colors duration-200 hover:bg-background hover:text-accent"
                  >
                    <Info
                      size={20}
                      className="transition-colors group-hover:text-accent"
                    />
                    About
                  </Link>
                </li>

                <li>
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-center gap-4 rounded-xl p-3 text-text transition-colors duration-200 hover:bg-background hover:text-accent"
                  >
                    <Phone
                      size={20}
                      className="transition-colors group-hover:text-accent"
                    />
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Footer */}
            <div className="border-t border-border p-5">
              <button
                className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-danger transition-colors duration-200 hover:bg-danger/10"
                onClick={() => handleLogout()}
              >
                <LogOut
                  size={20}
                  className="transition-colors group-hover:text-danger"
                />
                Logout
              </button>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
