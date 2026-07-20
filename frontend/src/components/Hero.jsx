import React, { useState, useEffect, useContext } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";

export default function Hero() {
  const { banner } = useContext(ShopContext);
  const titles = ["Latest Arrivals", "New Collections", "Modern Fashion", "Exclusive Styles"];
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[textIndex];
    
    // Natural smooth typing speed curve
    let typingSpeed = isDeleting ? 40 : 85 + Math.random() * 25;

    if (!isDeleting && charIndex === currentTitle.length) {
      const pauseTimeout = setTimeout(() => setIsDeleting(true), 2400);
      return () => clearTimeout(pauseTimeout);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % titles.length);
      typingSpeed = 350;
    }

    const timer = setTimeout(() => {
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex]);

  const currentText = titles[textIndex].substring(0, charIndex);

  return (
    <div className="flex flex-col sm:flex-row border border-gray-400 overflow-hidden min-h-[360px] sm:h-[440px] lg:h-[500px]">
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 h-full">
        <div className="text-[#5A3A31] w-[280px] sm:w-[350px] lg:w-[440px] flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#5A3A31]"></p>
            <p className="font-bold text-sm md:text-base tracking-wider">OUR BESTSELLERS</p>
          </div>
          <h1 className="prata-regular text-3xl lg:text-5xl text-[#5A3A31] h-16 sm:h-20 lg:h-24 flex items-center whitespace-nowrap overflow-hidden select-none">
            <span className="inline-flex items-center transition-all duration-150 ease-out">
              {currentText.length === 0 ? (
                <span>&nbsp;</span>
              ) : (
                currentText.split("").map((char, index) => (
                  <span
                    key={index}
                    className="inline-block transition-opacity duration-150 ease-out opacity-100"
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))
              )}
            </span>
            <span className="inline-block w-[3px] h-6 sm:h-8 lg:h-10 bg-[#5A3A31] ml-1.5 shrink-0 animate-pulse rounded-full opacity-90"></span>
          </h1>
          <div className="flex items-center gap-2 cursor-pointer group">
            <p className="font-bold text-sm md:text-base tracking-wider group-hover:underline">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[2px] bg-[#5A3A31]"></p>
          </div>
        </div>
      </div>
      <img className="w-full sm:w-1/2 h-[320px] sm:h-full object-cover object-top" src={banner?.image || assets.hero_img} alt="Hero Banner" />
    </div>
  );
}
