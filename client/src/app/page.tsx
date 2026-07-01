import BookSlider from "@/components/ui/BookSlider";
import api from "./api/axios";
import Image from "next/image";

export default async function Home() {
  let books = [];

  try {
    const res = await api.get("/books/all");
    books = res.data.books || [];
  } catch (error: any) {
    console.error("Axios fetch error:", error.response?.data || error.message);
  }

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col gap-10 w-full">
      <section className="w-full">
        <Image
          src="/banner-1.png"
          alt="Hero Banner"
          width={1920}
          height={700}
          priority
          className="w-full h-auto"
        />
      </section>

      <section className="">
        <BookSlider selectedBooks={books} title="New Books" />
      </section>

      <section>
        <BookSlider selectedBooks={books} title="Best Sellers" />
      </section>

      <section>
        <BookSlider selectedBooks={books} title="English Books" />
      </section>
    </div>
  );
}
