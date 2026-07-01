"use client";

import { useState } from "react";
import { Filter, X } from "lucide-react";

const FilterSidebar = ({
  categories,
  authors,
  filters,
  setFilters,
  fetchBooks,
}) => {
  const [open, setOpen] = useState(false);

  const handleCategory = (id) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(id)
        ? prev.categories.filter((item) => item !== id)
        : [...prev.categories, id],
    }));
  };

  const handleAuthor = (author) => {
    setFilters((prev) => ({
      ...prev,
      authors: prev.authors.includes(author)
        ? prev.authors.filter((item) => item !== author)
        : [...prev.authors, author],
    }));
  };

  const handlePrice = (min, max) => {
    setFilters((prev) => ({
      ...prev,
      minPrice: min,
      maxPrice: max,
    }));
  };

  return (
    <>

      <div className="mb-5 lg:hidden">
        <button
          onClick={() => setOpen(true)}
          className="flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-white transition-all duration-200 hover:bg-slate-800"
        >
          <Filter size={18} />
          Filters
        </button>
      </div>


      <aside className="sticky top-24 hidden h-fit rounded-2xl border border-border bg-white p-6 shadow-sm lg:block">
        <h2 className="mb-6 text-2xl font-bold text-primary">Filters</h2>


        <div className="mb-8">
          <h3 className="mb-3 text-lg font-semibold text-text">Categories</h3>

          <div className="max-h-52 space-y-2 overflow-y-auto">
            {categories.map((category) => (
              <label
                key={category._id}
                className="flex cursor-pointer items-center gap-3 text-text"
              >
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category._id)}
                  onChange={() => handleCategory(category._id)}
                  className="h-4 w-4 cursor-pointer accent-primary"
                />

                <span>{category.name}</span>
              </label>
            ))}
          </div>
        </div>


        <div className="mb-8">
          <h3 className="mb-3 text-lg font-semibold text-text">Authors</h3>

          <div className="max-h-52 space-y-2 overflow-y-auto">
            {authors.map((author) => (
              <label
                key={author}
                className="flex cursor-pointer items-center gap-3 text-text"
              >
                <input
                  type="checkbox"
                  checked={filters.authors.includes(author)}
                  onChange={() => handleAuthor(author)}
                  className="h-4 w-4 cursor-pointer accent-primary"
                />

                <span>{author}</span>
              </label>
            ))}
          </div>
        </div>


        <div className="mb-8">
          <h3 className="mb-3 text-lg font-semibold text-text">Price</h3>

          <div className="space-y-3">
            <button
              onClick={() => handlePrice("", "")}
              className="block cursor-pointer text-left text-muted transition-colors duration-200 hover:text-accent"
            >
              All Prices
            </button>

            <button
              onClick={() => handlePrice(0, 500)}
              className="block cursor-pointer text-left text-muted transition-colors duration-200 hover:text-accent"
            >
              Under ₹500
            </button>

            <button
              onClick={() => handlePrice(500, 1000)}
              className="block cursor-pointer text-left text-muted transition-colors duration-200 hover:text-accent"
            >
              ₹500 - ₹1000
            </button>

            <button
              onClick={() => handlePrice(1000, "")}
              className="block cursor-pointer text-left text-muted transition-colors duration-200 hover:text-accent"
            >
              Above ₹1000
            </button>
          </div>
        </div>

        <button
          onClick={fetchBooks}
          className="w-full cursor-pointer rounded-xl bg-primary py-3 font-medium text-white transition-all duration-200 hover:bg-slate-800"
        >
          Apply Filters
        </button>
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm">
          <div className="absolute left-0 top-0 h-full w-80 overflow-y-auto border-r border-border bg-white p-6 shadow-xl">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-primary">Filters</h2>

              <button
                onClick={() => setOpen(false)}
                className="cursor-pointer rounded-full p-2 text-text transition-colors duration-200 hover:bg-background hover:text-accent"
              >
                <X size={22} />
              </button>
            </div>

            <div className="mb-8">
              <h3 className="mb-3 text-lg font-semibold text-text">
                Categories
              </h3>

              <div className="space-y-2">
                {categories.map((category) => (
                  <label
                    key={category._id}
                    className="flex cursor-pointer items-center gap-3 text-text"
                  >
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category._id)}
                      onChange={() => handleCategory(category._id)}
                      className="h-4 w-4 cursor-pointer accent-primary"
                    />

                    <span>{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="mb-3 text-lg font-semibold text-text">Authors</h3>

              <div className="space-y-2">
                {authors.map((author) => (
                  <label
                    key={author}
                    className="flex cursor-pointer items-center gap-3 text-text"
                  >
                    <input
                      type="checkbox"
                      checked={filters.authors.includes(author)}
                      onChange={() => handleAuthor(author)}
                      className="h-4 w-4 cursor-pointer accent-primary"
                    />

                    <span>{author}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="mb-3 text-lg font-semibold text-text">Price</h3>

              <div className="space-y-3">
                <button
                  onClick={() => handlePrice("", "")}
                  className="block cursor-pointer text-left text-muted transition-colors duration-200 hover:text-accent"
                >
                  All Prices
                </button>

                <button
                  onClick={() => handlePrice(0, 500)}
                  className="block cursor-pointer text-left text-muted transition-colors duration-200 hover:text-accent"
                >
                  Under ₹500
                </button>

                <button
                  onClick={() => handlePrice(500, 1000)}
                  className="block cursor-pointer text-left text-muted transition-colors duration-200 hover:text-accent"
                >
                  ₹500 - ₹1000
                </button>

                <button
                  onClick={() => handlePrice(1000, "")}
                  className="block cursor-pointer text-left text-muted transition-colors duration-200 hover:text-accent"
                >
                  Above ₹1000
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                fetchBooks();
                setOpen(false);
              }}
              className="w-full cursor-pointer rounded-xl bg-primary py-3 font-medium text-white transition-all duration-200 hover:bg-slate-800"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;
