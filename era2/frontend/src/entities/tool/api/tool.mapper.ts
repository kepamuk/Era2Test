import type { ToolPageData } from "../model/tool-pages";
import type { ToolPageDto } from "./tool.dto";

export function mapToolPageDto(dto: ToolPageDto): ToolPageData {
  return {
    slug: dto.slug,
    modelName: dto.model_name,
    heroTitle: dto.hero_title,
    heroDescription: dto.hero_description,
    features: dto.features,
    keyFeatureTitle: dto.key_feature_title,
    keyFeatureDescription: dto.key_feature_description,
    technologyDescription: dto.technology_description,
    category: dto.category,
  };
}
