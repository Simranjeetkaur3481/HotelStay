import { Images } from "lucide-react";
import { Button } from "@/components/ui/button";
import { API_BASE_URL } from "@/constants/api";

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <section className="mx-auto mt-8 max-w-7xl ">
      {/* Desktop */}

      <div className="relative hidden gap-3 lg:grid lg:grid-cols-4">
        <div className="col-span-2 row-span-2 overflow-hidden rounded-l-3xl">
          <img
            src={`${API_BASE_URL}${images[0]?.imageUrl}`}
            alt=""
            className="h-full w-full object-cover transition duration-500 hover:scale-105"
          />
        </div>

        {images.slice(1, 5).map((image, index) => (
          <div
            key={index}
            className={`overflow-hidden ${index === 1 ? "rounded-tr-3xl" : index === 3 ? "rounded-br-3xl" : ""}`}
          >
            <img
              src={`${API_BASE_URL}${image.imageUrl}`}
              alt=""
              className="h-full w-full object-cover transition duration-500 hover:scale-105"
            />
          </div>
        ))}

        {/* Show Photos */}

        <Button variant="secondary" className="absolute bottom-6 right-10 gap-2">
          <Images className="size-4" />
          Show all photos
        </Button>
      </div>

      {/* Mobile */}

      <div className="relative lg:hidden">
        <img src={`${API_BASE_URL}${images[0].imageUrl}`} alt="" className="h-72 w-full rounded-3xl object-cover" />

        <Button size="sm" variant="secondary" className="absolute bottom-4 right-4 gap-2">
          <Images className="size-4" />
          Photos
        </Button>
      </div>
    </section>
  );
}
