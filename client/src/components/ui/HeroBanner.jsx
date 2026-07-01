import Image from "next/image";

const HeroBanner = () => {
  return (
    <section className="flex items-center justify-center w-full">
      <picture className="w-full">
        <source media="(max-width: 640px)" srcSet="/mobileimage.png" />

        <Image
          src="/banner-1.png"
          alt="Hero Banner"
          width={1920}
          height={700}
          priority
          className="w-full h-auto object-cover"
        />
      </picture>
    </section>
  );
};

export default HeroBanner;