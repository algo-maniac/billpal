"use client";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-[300px] md:h-[450px] lg:h-[600px] xl:h-[730px] w-full relative">
      <Image src="/images/landing_image3.jpg" fill alt="Error Loading" />
      <div className="text-lg sm:text-xl md:text-2xl lg:text-4xl text-tertiary absolute h-full w-full text-center top-[20%]">
        Now customize your bill splitting experience with Splitterz
      </div>
    </div>
  );
}
