/* eslint-disable @next/next/no-img-element */
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { Autoplay, EffectCards } from "swiper/modules";
import { MdShoppingCart } from "react-icons/md";
import getRandomColor from "@/utils/getRandomColor";

const bannerImgs = [
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLRRZpmMV9o07dPOifCI--Mg4YzjN1Zttsfg&s",
    color: "#FF5733",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMQMZM9yQ96mqSuZWe7Z5W6hepuiGeWFJm4Q&s",
    color: "#33FF57",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7clqyyG25QRzodzN9FYQxobq4LUbdoQgPWA&s",
    color: "#3357FF",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg71nyTMGzoeWao5RwD5zCydUfmnSFg-7niA&s",
    color: "#F39C12",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToUI962ShGHdx-ygkNEPJynE8RXfODOALA5g&s",
    color: "#8E44AD",
  },
];

export default function Banner() {
  return (
    <div className="hero min-h-screen my-1 lg:rounded-lg lg:mt-6 lg:mb-10 md:py-10 bg-gradient-to-bl from-green-50 dark:from-gray-700 via-pink-50 dark:via-gray-800 to-sky-50 dark:to-gray-700 dark:text-white dark:border-gray-500">
      <div className="hero-content flex-col lg:flex-row-reverse lg:p-28 gap-4 lg:gap-20 overflow-hidden">
        <Swiper
          autoplay={{
            delay: 900,
            disableOnInteraction: false,
          }}
          effect={"cards"}
          grabCursor={true}
          modules={[Autoplay, EffectCards]}
          className="w-[220px] md:w-[500px] lg:w-[300px] drop-shadow-md"
        >
          {bannerImgs.map(({ img, color }, idx) => (
            <SwiperSlide
              key={idx}
              style={{ backgroundColor: color }}
              className="p-2 rounded-lg"
            >
              <img
                alt={`image-${idx + 1}`}
                src={img}
                className="w-full object-center aspect-square md:aspect-video lg:aspect-square rounded-lg drop-shadow-md"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="md:px-10 lg:pl-0">
          <h1 className="lg:text-4xl mt-4 lg:mt-0 text-2xl font-bold">
            Elevate Your Yoga Journey with{" "}
            <span className="inline-block w-[1.25em] aspect-square pl-4 text-teal-500 bg-teal-200/50 dark:text-teal-400 rounded-full">
              MindFlow
            </span>
          </h1>
          <div className="lg:my-6 my-4">
            <p>
              Discover smart yoga products designed to enhance mindfulness and
              well-being.
            </p>
            <ul className="list-decimal text-gray-600 dark:text-gray-400 mt-4 list-inside pl-6">
              <li> Smart sensors for real-time tracking.</li>
              <li> Eco-friendly, durable materials.</li>
              <li>Suitable for beginners and experts alike.</li>
            </ul>
          </div>
          <button className="btn bg-teal-500 hover:bg-teal-700 text-white">
            Shop Now <MdShoppingCart className="inline w[1em]" />
          </button>
        </div>
      </div>
    </div>
  );
}
