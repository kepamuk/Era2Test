import type { Assistant } from "../model/assistants";
import type { AssistantDto } from "./assistant.dto";

export function mapAssistantDto(dto: AssistantDto): Assistant {
  return {
    id: dto.id,
    name: dto.display_name,
    description: dto.description,
    emoji: dto.icon ?? "",
    bgColor: dto.background_color ?? "",
    isNew: dto.is_new,
  };
}
