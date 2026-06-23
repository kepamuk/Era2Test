import type { Generation } from "../model/mock-generations";
import type { GenerationDto } from "./generation.dto";

export function mapGenerationDto(dto: GenerationDto): Generation {
  return {
    id: dto.id,
    type: dto.type,
    providerId: dto.provider_id,
    modelName: dto.model_name,
    credits: dto.credits,
    prompt: dto.prompt,
    createdAt: new Date(dto.created_at),
    text: dto.text,
    gradient: dto.gradient,
    aspect: dto.aspect,
    duration: dto.duration,
  };
}
