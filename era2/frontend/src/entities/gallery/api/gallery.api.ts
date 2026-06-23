import { aiArt, aiLandscapes, aiPhotos, aiProducts, aiVideo } from "@/entities/generation";
import { httpClient, type ApiListDto } from "@/shared/api";
import type { GalleryCollectionDto, GalleryCollectionType, GalleryItemDto } from "./gallery.dto";
import {
  mapGalleryCollectionDto,
  mapGalleryItemDto,
  type GalleryCollection,
  type GalleryItem,
} from "./gallery.mapper";

const GALLERY_ENDPOINTS = {
  collections: "/api/gallery/collections",
  items: "/api/gallery/items",
} as const;

const GALLERY_TITLES: Record<GalleryCollectionType, string> = {
  photo: "AI Photos",
  art: "AI Art",
  video: "AI Video",
  landscape: "AI Landscapes",
  product: "AI Products",
};

function unwrapList<T>(response: T[] | ApiListDto<T>): T[] {
  return Array.isArray(response) ? response : response.data;
}

function createFallbackItems(): GalleryItem[] {
  const collections: Record<GalleryCollectionType, string[]> = {
    photo: aiPhotos,
    art: aiArt,
    video: aiVideo,
    landscape: aiLandscapes,
    product: aiProducts,
  };

  return (Object.entries(collections) as [GalleryCollectionType, string[]][])
    .flatMap(([collection, items]) =>
      items.map((imageUrl, index) => ({
        id: `${collection}-${index + 1}`,
        collection,
        imageUrl,
      })),
    );
}

function createFallbackCollections(): GalleryCollection[] {
  const items = createFallbackItems();

  return (Object.keys(GALLERY_TITLES) as GalleryCollectionType[]).map((collection) => ({
    id: collection,
    title: GALLERY_TITLES[collection],
    items: items.filter((item) => item.collection === collection),
  }));
}

export async function getGalleryItems(collection?: GalleryCollectionType): Promise<GalleryItem[]> {
  return httpClient
    .get<GalleryItemDto[] | ApiListDto<GalleryItemDto>>(GALLERY_ENDPOINTS.items, {
      params: collection ? { collection } : undefined,
    })
    .then((response) => unwrapList(response).map(mapGalleryItemDto))
    .catch(() => {
      // TODO(backend): Temporary fallback until /api/gallery/items is available.
      const items = createFallbackItems();
      return collection ? items.filter((item) => item.collection === collection) : items;
    });
}

export async function getGalleryCollections(): Promise<GalleryCollection[]> {
  return httpClient
    .get<GalleryCollectionDto[] | ApiListDto<GalleryCollectionDto>>(GALLERY_ENDPOINTS.collections)
    .then((response) => unwrapList(response).map(mapGalleryCollectionDto))
    .catch(() => {
      // TODO(backend): Temporary fallback until /api/gallery/collections is available.
      return createFallbackCollections();
    });
}
