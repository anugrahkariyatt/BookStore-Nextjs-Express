import Link from "next/link";

export default function AboutPage() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <div className="text-center">
          <span className="inline-flex rounded-full bg-accent/15 px-4 py-1 text-sm font-semibold text-accent">
            About StoryVerse
          </span>

          <h1 className="mt-6 text-4xl font-bold text-primary md:text-5xl">
            Every Great Story
            <span className="block text-secondary">
              Begins With the Right Book.
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-muted">
            At <span className="font-semibold text-primary">StoryVerse</span>,
            we believe every book opens the door to a new world. Whether {"you're"}
            searching for bestselling novels, timeless classics, academic
            resources, or inspiring self-help books, {"we've"} created a place where
            every reader can discover their next favorite story.
          </p>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted">
            Our mission is to make reading enjoyable, affordable, and
            accessible through a beautifully designed online bookstore built for
            modern readers.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/books"
              className="rounded-xl bg-primary px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-slate-800"
            >
              Explore Books
            </Link>

            <Link
              href="/contact"
              className="rounded-xl border border-border bg-white px-6 py-3 font-medium text-text transition-all duration-200 hover:bg-background"
            >
              Contact Us
            </Link>
          </div>
        </div>


        <div className="mt-20 grid gap-8 rounded-3xl border border-border bg-white p-8 shadow-sm md:grid-cols-3">
          <div className="text-center">
            <h3 className="text-4xl font-bold text-primary">10K+</h3>
            <p className="mt-2 text-muted">Books Available</p>
          </div>

          <div className="text-center">
            <h3 className="text-4xl font-bold text-primary">5K+</h3>
            <p className="mt-2 text-muted">Happy Readers</p>
          </div>

          <div className="text-center">
            <h3 className="text-4xl font-bold text-primary">24/7</h3>
            <p className="mt-2 text-muted">Customer Support</p>
          </div>
        </div>
      </div>
    </section>
  );
}