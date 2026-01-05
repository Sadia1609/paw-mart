import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaArrowDown, FaPaw } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";

import i1 from "../assets/cat_dog.jpg";
import i2 from "../assets/adopt-pets.jpg";
import i3 from "../assets/pet_care.jpg";

const slides = [
  { image: i1, tagline: "Find Your Furry Friend Today!" },
  { image: i2, tagline: "Adopt, Don't Shop — Give a Pet a Home." },
  { image: i3, tagline: "Because Every Pet Deserves Love and Care." },
];

const Slider = () => {
  return (
    <div className="relative">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
              {/* Main Image */}
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E64]/70 via-[#1C9B8E]/40 to-transparent"></div>

              {/* Tagline */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <div className="max-w-7xl mx-auto">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-white p-2 rounded-full">
                      <FaPaw className="text-[#1C9B8E] text-xl" />
                    </div>
                    <span className="text-white font-medium">PawMart</span>
                  </div>
                  <h2 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-2xl">
                    {slide.tagline}
                  </h2>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Clear visual hint to the next section */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="flex flex-col items-center">
          <div className="text-white text-sm mb-1">Scroll to explore</div>
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
            <FaArrowDown className="text-white text-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
