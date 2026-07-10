import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { API_BASE_URL } from "@/constants/api";
import { useEffect, useState } from "react";

interface ImageGalleryProps {
  images: { imageUrl: string }[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = images?.length ?? 0;

  const openViewer = (index: number) => {
    setCurrentIndex(index);
    setViewerOpen(true);
  };

  const nextImage = () => {
    if (!total) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevImage = () => {
    if (!total) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    if (!viewerOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setViewerOpen(false);
      if (event.key === "ArrowRight") nextImage();
      if (event.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [viewerOpen, total]);

  if (!images?.length) return null;

  return (
    <section className="mx-auto mt-8 max-w-7xl ">
      {/* Desktop */}

      <div className="relative hidden gap-3 lg:grid lg:grid-cols-4">
        <div className="col-span-2 row-span-2 overflow-hidden rounded-l-3xl">
          <img
            src={`${API_BASE_URL}${images[0]?.imageUrl}`}
            alt=""
            className="h-full w-full object-cover transition duration-500 hover:scale-105"
            onClick={() => openViewer(0)}
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
              onClick={() => openViewer(index + 1)}
            />
          </div>
        ))}

        {/* Show Photos */}

        <Button variant="secondary" className="absolute bottom-6 right-10 gap-2" onClick={() => openViewer(0)}>
          <Images className="size-4" />
          Show all photos
        </Button>
      </div>

      {/* Mobile */}

      <div className="relative lg:hidden">
        <img
          src={`${API_BASE_URL}${images[0].imageUrl}`}
          alt=""
          className="h-72 w-full rounded-3xl object-cover"
          onClick={() => openViewer(0)}
        />

        <Button size="sm" variant="secondary" className="absolute bottom-4 right-4 gap-2" onClick={() => openViewer(0)}>
          <Images className="size-4" />
          Photos
        </Button>
      </div>

      {viewerOpen && (
        <div className="fixed inset-0 z-100 bg-black/90 p-4 sm:p-8">
          <Button
            size="icon"
            variant="secondary"
            className="absolute right-4 top-4 z-101"
            onClick={() => setViewerOpen(false)}
          >
            <X className="size-5" />
          </Button>

          <div className="flex h-full items-center justify-center">
            <button
              type="button"
              className="mr-3 rounded-full bg-white/15 p-2 text-white hover:bg-white/25"
              onClick={prevImage}
            >
              <ChevronLeft className="size-6" />
            </button>

            <img
              src={`${API_BASE_URL}${images[currentIndex]?.imageUrl}`}
              alt={`Hotel image ${currentIndex + 1}`}
              className="max-h-[85vh] w-full max-w-5xl rounded-xl object-contain"
            />

            <button
              type="button"
              className="ml-3 rounded-full bg-white/15 p-2 text-white hover:bg-white/25"
              onClick={nextImage}
            >
              <ChevronRight className="size-6" />
            </button>
          </div>

          <div className="mt-4 text-center text-sm text-white/80">
            {currentIndex + 1} / {total}
          </div>
        </div>
      )}
    </section>
  );
}
