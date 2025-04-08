import React, { useState, useRef, useEffect } from "react";

const menuItems = ["Home", "About", "Services", "Contact"];

const AnimatedNavbar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const activeItem = container.children[activeIndex] as HTMLElement;
      setSliderStyle({
        left: activeItem.offsetLeft,
        width: activeItem.offsetWidth,
      });
    }
  }, [activeIndex]);

  return (
    <div className="relative w-full border-b border-gray-200">
      <div
        ref={containerRef}
        className="flex justify-center space-x-8 text-gray-700 font-medium relative"
      >
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`py-4 transition-colors duration-300 ${
              activeIndex === idx ? "text-blue-600" : "hover:text-blue-500"
            }`}
          >
            {item}
          </button>
        ))}

        {/* Slider / Underline */}
        <span
          className="absolute bottom-0 h-1 bg-blue-600 rounded transition-all duration-300 "
          style={{
            left: sliderStyle.left,
            width: sliderStyle.width,
          }}
        />
      </div>
    </div>
  );
};

export default AnimatedNavbar;
