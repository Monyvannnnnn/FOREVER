import React from "react";

const DiscountTag = ({ tag, discountPercent }) => {
  const displayTag = tag ? tag : (discountPercent && discountPercent > 0 ? `-${discountPercent}%` : null);
  if (!displayTag) return null;

  return (
    <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none z-10">
      <div className="bg-[#5A3A31] text-white text-[10px] sm:text-xs font-bold text-center py-0.5 w-24 absolute top-3 -right-6 rotate-45 shadow-sm uppercase tracking-wider">
        {displayTag}
      </div>
    </div>
  );
};

export default DiscountTag;
