import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import i1 from "../assets/cat_dog.jpg";
import i2 from "../assets/adopt-pets.jpg";
import i3 from "../assets/pet_care.jpg";

const slides = [
  { image: i1, tagline: "Find Your Furry Friend Today!" },
  { image: i2, tagline: "Adopt, Don’t Shop — Give a Pet a Home." },
  { image: i3, tagline: "Because Every Pet Deserves Love and Care." },
];

const Slider = () => {
  return (
    <div>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[700px] bg-amber-300">
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover block"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-white text-2xl md:text-4xl font-bold text-center px-4 bg-black bg-opacity-30 py-2 rounded">
                  {slide.tagline}
                </h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
