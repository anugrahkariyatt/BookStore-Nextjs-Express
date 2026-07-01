"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BookCard from "./BookCards";

const BookSlider = ({ selectedBooks = [], title }) => {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (!sliderRef.current) return;

    const card = sliderRef.current.firstElementChild;

    if (!card) return;

    const gap = 32; 
    const scrollAmount = (card.clientWidth + gap) * 2;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (!selectedBooks.length) {
    return (
      <section className="py-10">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-primary">{title}</h2>

          <p className="mt-2 text-sm text-secondary">
            Discover your next favorite read.
          </p>
        </div>

        <div className="flex h-56 items-center justify-center rounded-2xl border border-dashed border-border">
          <p className="text-muted">No books available.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-primary">{title}</h2>

          <p className="mt-2 text-sm text-secondary">
            Discover your next favorite read.
          </p>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={() => scroll("left")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white shadow-sm transition hover:bg-background hover:shadow-md"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={() => scroll("right")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white shadow-sm transition hover:bg-background hover:shadow-md"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="mb-8 h-px bg-border" />

      <div ref={sliderRef} className="flex gap-8 overflow-x-auto no-scrollbar">
        {selectedBooks.map((book) => (
          <BookCard key={book._id} book={book} variant="slider" />
        ))}
      </div>
    </section>
  );
};

export default BookSlider;
