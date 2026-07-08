import { API_BASE_URL } from "@/constants/api";
import { useState } from "react";

type RoomGalleryProps = {
  images: {
    imageUrl: string;
  }[];
};

export default function RoomGallery({ images }: RoomGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images?.length) {
    return <div className="flex h-96 items-center justify-center rounded-2xl border bg-muted">No Images Available</div>;
  }

  return (
    <section className="space-y-4">
      {/* Main Image */}

      <div className="overflow-hidden rounded-2xl border">
        <img
          src={`${API_BASE_URL}${images[selectedImage].imageUrl}`}
          alt="Room"
          className="h-65 w-full object-cover sm:h-95 lg:h-125"
        />
      </div>

      {/* Thumbnails */}

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`overflow-hidden rounded-xl border-2 transition
              ${selectedImage === index ? "border-primary" : "border-transparent"}`}
          >
            <img
              src={`${API_BASE_URL}${image.imageUrl}`}
              alt={`Room ${index + 1}`}
              className="h-20 w-28 object-cover"
            />
          </button>
        ))}
      </div>
    </section>
  );
}
