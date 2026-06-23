import type { GenType } from "@/entities/generation";
import type { GenerationDto } from "@/entities/generation/api/generation.dto";

export interface GenerateRequestDto {
  type: GenType;
  provider_id: string;
  model_id: string;
  prompt: string;
  aspect?: string;
  duration?: string;
  quantity?: number;
}

export interface GenerateTextRequestDto extends Omit<GenerateRequestDto, "type"> {
  type?: "text";
}

export interface GenerateImageRequestDto extends Omit<GenerateRequestDto, "type"> {
  type?: "image";
}

export interface GenerateVideoRequestDto extends Omit<GenerateRequestDto, "type"> {
  type?: "video";
}

export interface GenerateAudioRequestDto extends Omit<GenerateRequestDto, "type"> {
  type?: "audio";
}

export interface GenerateResponseDto {
  generation: GenerationDto;
}
