import type { ToolPageData } from "../model/tool-pages";

export interface ToolFeatureDto {
  icon: string;
  title: string;
  description: string;
}

export interface ToolPageDto {
  slug: string;
  model_name: string;
  hero_title: string;
  hero_description: string;
  features: ToolFeatureDto[];
  key_feature_title: string;
  key_feature_description: string;
  technology_description: string;
  category: ToolPageData["category"];
}
