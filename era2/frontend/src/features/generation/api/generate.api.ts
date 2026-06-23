import { gradientForType, type Generation } from "@/entities/generation";
import { httpClient } from "@/shared/api";
import type {
  GenerateAudioRequestDto,
  GenerateImageRequestDto,
  GenerateRequestDto,
  GenerateResponseDto,
  GenerateTextRequestDto,
  GenerateVideoRequestDto,
} from "./generate.dto";
import { mapGenerateResponseDto } from "./generate.mapper";

const GENERATE_ENDPOINTS = {
  create: "/api/generations",
} as const;

function createTemporaryGeneration(input: GenerateRequestDto): Generation {
  return {
    id: `temporary-${input.type}-${Date.now()}`,
    type: input.type,
    providerId: input.provider_id,
    modelName: input.model_id,
    credits: 0,
    prompt: input.prompt,
    createdAt: new Date(),
    gradient: input.type === "text" || input.type === "audio" ? undefined : gradientForType(input.type),
    aspect: input.aspect as Generation["aspect"],
    duration: input.duration,
    text: input.type === "text" ? "" : undefined,
  };
}

export async function generate(input: GenerateRequestDto): Promise<Generation> {
  return httpClient
    .post<GenerateResponseDto, GenerateRequestDto>(GENERATE_ENDPOINTS.create, input)
    .then(mapGenerateResponseDto)
    .catch(() => {
      // TODO(backend): Temporary fallback until /api/generations accepts create requests.
      return createTemporaryGeneration(input);
    });
}

export function generateText(input: GenerateTextRequestDto): Promise<Generation> {
  return generate({ ...input, type: "text" });
}

export function generateImage(input: GenerateImageRequestDto): Promise<Generation> {
  return generate({ ...input, type: "image" });
}

export function generateVideo(input: GenerateVideoRequestDto): Promise<Generation> {
  return generate({ ...input, type: "video" });
}

export function generateAudio(input: GenerateAudioRequestDto): Promise<Generation> {
  return generate({ ...input, type: "audio" });
}
