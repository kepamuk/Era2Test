import { mapGenerationDto } from "@/entities/generation/api/generation.mapper";
import type { Generation } from "@/entities/generation";
import type { GenerateResponseDto } from "./generate.dto";

export function mapGenerateResponseDto(dto: GenerateResponseDto): Generation {
  return mapGenerationDto(dto.generation);
}
