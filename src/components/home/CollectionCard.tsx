import React from "react";

const CollectionCard = ({ image, title, subtitle }) => {
  return (
    <div className="group relative overflow-hidden rounded-3xl cursor-pointer">
      <img src={image} className="h-72 w-full object-cover transition duration-500 group-hover:scale-110" />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

      <div className="absolute bottom-6 left-6 text-white">
        <h3 className="text-3xl font-bold">{title}</h3>

        <p className="mt-2 text-gray-200">{subtitle}</p>
      </div>
    </div>
  );
};

export default CollectionCard;
