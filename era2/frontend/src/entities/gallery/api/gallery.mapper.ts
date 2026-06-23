import type { GalleryCollectionDto, GalleryItemDto, GalleryCollectionType } from "./gallery.dto";

export interface GalleryItem {
  id: string;
  collection: GalleryCollectionType;
  imageUrl: string;
  title?: string;
  prompt?: string;
}

export interface GalleryCollection {
  id: GalleryCollectionType;
  title: string;
  items: GalleryItem[];
}

export function mapGalleryItemDto(dto: GalleryItemDto): GalleryItem {
  return {
    id: dto.id,
    collection: dto.collection,
    imageUrl: dto.image_url,
    title: dto.title,
    prompt: dto.prompt,
  };
}

export function mapGalleryCollectionDto(dto: GalleryCollectionDto): GalleryCollection {
  return {
    id: dto.id,
    title: dto.title,
    items: dto.items.map(mapGalleryItemDto),
  };
}
