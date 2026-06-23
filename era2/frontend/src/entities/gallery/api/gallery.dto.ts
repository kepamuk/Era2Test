export type GalleryCollectionType = "photo" | "art" | "video" | "landscape" | "product";

export interface GalleryItemDto {
  id: string;
  collection: GalleryCollectionType;
  image_url: string;
  title?: string;
  prompt?: string;
}

export interface GalleryCollectionDto {
  id: GalleryCollectionType;
  title: string;
  items: GalleryItemDto[];
}
