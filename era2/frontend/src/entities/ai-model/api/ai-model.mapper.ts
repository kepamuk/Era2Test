import type { AIModel, SubModel } from "../model/models";
import type { ImageProvider, ImageSubModel } from "../model/image-models";
import type { TextProvider, TextSubModel } from "../model/text-models";
import type { VideoProvider, VideoSubModel } from "../model/video-models";
import type { AiModelDto, AiProviderDto, AiSubModelDto } from "./ai-model.dto";

export function mapAiSubModelDto(dto: AiSubModelDto): SubModel {
  return {
    id: dto.id,
    name: dto.display_name,
    credits: dto.credits,
    isNew: dto.is_new,
  };
}

export function mapAiModelDto(dto: AiModelDto): AIModel {
  return {
    id: dto.id,
    name: dto.display_name,
    provider: dto.provider_name,
    category: dto.category,
    subModels: dto.sub_models?.map(mapAiSubModelDto),
    credits: dto.min_credits,
    description: dto.description,
    icon: dto.icon,
    isNew: dto.is_new,
    slug: dto.slug,
  };
}

export function mapTextProviderDto(dto: AiProviderDto): TextProvider {
  return {
    id: dto.id,
    name: dto.display_name,
    icon: dto.icon,
    subModels: dto.sub_models.map<TextSubModel>((subModel) => ({
      id: subModel.id,
      name: subModel.display_name,
      credits: subModel.credits,
      badge: subModel.badge,
      description: subModel.description ?? "",
      isNew: subModel.is_new,
    })),
  };
}

export function mapImageProviderDto(dto: AiProviderDto): ImageProvider {
  return {
    id: dto.id,
    name: dto.display_name,
    icon: dto.icon,
    badge: dto.badge,
    badgeColor: dto.badge_color,
    description: dto.description ?? "",
    subModels: dto.sub_models.map<ImageSubModel>((subModel) => ({
      id: subModel.id,
      name: subModel.display_name,
      credits: subModel.credits,
      isNew: subModel.is_new,
      isDefault: subModel.is_default,
      badge: subModel.badge,
      desc: subModel.description,
      time: subModel.estimated_time,
    })),
    aspectRatios: dto.aspect_ratios ?? [],
    maxUploads: dto.max_uploads ?? 0,
    quantityOptions: dto.quantity_options,
    qualityOptions: dto.quality_options,
    hasTurbo: dto.has_turbo,
    hasAdvanced: dto.has_advanced,
    styles: dto.styles,
  };
}

export function mapVideoProviderDto(dto: AiProviderDto): VideoProvider {
  return {
    id: dto.id,
    name: dto.display_name,
    icon: dto.icon,
    badge: dto.badge,
    subModels: dto.sub_models.map<VideoSubModel>((subModel) => ({
      id: subModel.id,
      name: subModel.display_name,
      credits: subModel.credits,
      isNew: subModel.is_new,
      isDefault: subModel.is_default,
      badge: subModel.badge,
      desc: subModel.description,
      time: subModel.estimated_time,
    })),
    aspectRatios: dto.aspect_ratios ?? [],
    durationOptions: dto.duration_options ?? [],
    resolutionOptions: dto.resolution_options ?? [],
    qualityOptions: dto.quality_options,
    functions: dto.functions,
  };
}
