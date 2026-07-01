"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "../api/axios";
import { Search } from "lucide-react";
import Cards from "@/components/ui/BookCards";
import FilterSidebar from "@/components/ui/FilterSidebar";
const Page = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(search);
  const shouldFocus = searchParams.get("focus");
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    categories: [],
    authors: [],
    minPrice: "",
    maxPrice: "",
    sort: "",
  });

  async function fetchCategoriesAndAuthors() {
    try {
      const categoryRes = await api.get("/categories");
      const authorRes = await api.get("/books/authors");

      setCategories(categoryRes.data.Categories);
      setAuthors(authorRes.data.authors);
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchBooks() {
    setLoading(true);

    try {
      const res = await api.get("/books/filter", {
        params: {
          categories: filters.categories.join(","),
          authors: filters.authors.join(","),
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          search,
          sort: filters.sort,
        },
      });

      setBooks(res.data.books);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    if (shouldFocus === "true") {
      searchInputRef.current?.focus();
    }
  }, [shouldFocus]);
  useEffect(() => {
    fetchCategoriesAndAuthors();
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [filters.sort, search]);

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  useEffect(() => {
    if (shouldFocus) {
      searchInputRef.current?.focus();
    }
  }, [shouldFocus]);
  return (
    <main className="min-h-screen bg-[#FAFAF9]">
      <div className="  px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Explore Books</h1>

          <p className="mt-2 text-gray-600">
            Discover your next favourite book.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <FilterSidebar
            categories={categories}
            authors={authors}
            filters={filters}
            setFilters={setFilters}
            fetchBooks={fetchBooks}
          />

          <section>
            <div className="mb-6 flex flex-col gap-4">
              {/* Search + Sort */}
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex w-full max-w-xl items-center overflow-hidden rounded-xl border border-gray-300 bg-white">
                  <Search size={20} className="ml-4 text-gray-500" />

                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchInput}
                    onChange={(e) => {
                      const value = e.target.value;

                      setSearchInput(value);

                      if (value === "") {
                        router.replace("/books");
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        router.push(
                          searchInput.trim()
                            ? `/books?search=${encodeURIComponent(searchInput)}`
                            : "/books",
                        );
                      }
                    }}
                    placeholder="Search books, authors..."
                    className="flex-1 px-3 py-3 outline-none"
                  />

                  <button
                    onClick={() =>
                      router.push(
                        searchInput.trim()
                          ? `/books?search=${encodeURIComponent(searchInput)}`
                          : "/books",
                      )
                    }
                    className="bg-primary px-5 py-3 font-medium text-white hover:opacity-90"
                  >
                    Search
                  </button>
                </div>

                <select
                  value={filters.sort}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      sort: e.target.value,
                    }))
                  }
                  className="rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-primary"
                >
                  <option value="">Relevance</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="bestselling">Best Selling</option>
                </select>
              </div>

              {/* Books count */}
              <h2 className="text-2xl font-bold text-gray-800">
                {books.length} Books Found
              </h2>
              {loading ? (
                <div className="flex h-125 items-center justify-center">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-amber-700 border-t-transparent"></div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                  {books.map((book) => (
                    <Cards key={book._id} book={book} variant="grid" />
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Page;
