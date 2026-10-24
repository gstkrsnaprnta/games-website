import type { Gallery } from "../../types/models";

export function GalleryGrid({ items }: { items: Gallery[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
      {items.map((item) => (
        <figure
          key={item.id}
          className="group glass-card-premium relative overflow-hidden rounded-[1.25rem]"
        >
          <img
            src={item.image_url}
            alt={item.title ?? "Dokumentasi GAMES"}
            loading="lazy"
            className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
          />
          {(item.title || item.description) && (
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#064252]/85 to-transparent p-3 pt-10 text-white opacity-0 transition group-hover:opacity-100">
              {item.title && (
                <p className="text-xs font-black md:text-sm">{item.title}</p>
              )}
              {item.description && (
                <p className="mt-0.5 line-clamp-2 text-[11px] font-semibold text-white/80">
                  {item.description}
                </p>
              )}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
