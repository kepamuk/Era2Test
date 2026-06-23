import { useState } from "react";
import { useLocation } from "@/shared/routing";
import { Settings2, X, ChevronUp, ChevronDown, RotateCcw, Film, Image as ImageIcon, Clock, Palette } from "lucide-react";
import { getModelsByCategory, type AIModel } from "@/entities/ai-model";
import { ModelGlyph } from "@/shared/ui/era/ModelGlyph";
import { cn } from "@/shared/lib/utils";

interface RightPanelProps {
  open: boolean;
  onClose: () => void;
}

const imageAspectRatios = ["16:9", "4:3", "1:1", "3:4", "9:16", "21:9"] as const;
const videoAspectRatios = ["16:9", "4:3", "1:1", "3:4", "9:16", "21:9"] as const;
const resolutions = ["1K", "2K", "4K"] as const;
const videoDurations = ["4s", "5s", "6s", "7s", "8s", "9s", "10s", "11s", "12s", "13s", "14s", "15s"] as const;
const videoResolutions = ["480p", "720p"] as const;
const videoQualities = ["Стандарт", "HD"] as const;

const klingFunctions = [
  "Text to Video", "Image to Video", "Keyframes", "Elements",
  "Kling 01 Image to Video", "Kling 01 Video to Video", "Kling 01 Text to Video", "Kling Motion",
];

export function RightPanel({ open, onClose }: RightPanelProps) {
  const location = useLocation();
  const isVideo = location.pathname === "/video";
  const isDesign = location.pathname === "/design";

  const models = getModelsByCategory(isVideo ? "video" : "image");
  const [selectedModel, setSelectedModel] = useState<AIModel>(models[0]);
  const [selectedSubIndex, setSelectedSubIndex] = useState(0);
  const [aspectRatio, setAspectRatio] = useState("4:3");
  const [resolution, setResolution] = useState("2K");
  const [videoDuration, setVideoDuration] = useState("5s");
  const [videoRes, setVideoRes] = useState("720p");
  const [videoQuality, setVideoQuality] = useState("Стандарт");
  const [klingFunc, setKlingFunc] = useState(klingFunctions[0]);

  const [formatOpen, setFormatOpen] = useState(true);
  const [qualityOpen, setQualityOpen] = useState(true);
  const [durationOpen, setDurationOpen] = useState(true);
  const [sceneOpen, setSceneOpen] = useState(false);
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const [versionDropdownOpen, setVersionDropdownOpen] = useState(false);
  const [funcDropdownOpen, setFuncDropdownOpen] = useState(false);

  // Panel always rendered; slides off-screen when closed

  const resetAll = () => {
    setSelectedModel(models[0]);
    setSelectedSubIndex(0);
    setAspectRatio("4:3");
    setResolution("2K");
    setVideoDuration("5s");
    setVideoRes("720p");
    setVideoQuality("Стандарт");
    setKlingFunc(klingFunctions[0]);
  };

  const collapseAll = () => {
    setFormatOpen(false);
    setQualityOpen(false);
    setDurationOpen(false);
    setSceneOpen(false);
  };

  const expandAll = () => {
    setFormatOpen(true);
    setQualityOpen(true);
    setDurationOpen(true);
  };

  const currentAspectRatios = isVideo ? videoAspectRatios : imageAspectRatios;

  return (
    <aside
      className={cn(
        "hidden xl:flex fixed top-14 right-0 bottom-0 w-72 border-l border-border bg-background flex-col z-30 transition-transform duration-300 ease-out",
        open ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Settings2 className="h-4 w-4" />
          Выбор модели
        </div>
        <button onClick={onClose} className="p-1 rounded hover:bg-muted transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Model select */}
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Модель</label>
          <div className="relative">
            <button
              onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
              className="w-full flex items-center gap-2 border border-border rounded-xl px-3 py-2.5 text-sm hover:bg-muted/60 transition-colors"
            >
              <span className={cn("w-2 h-2 rounded-full", isVideo ? "bg-primary" : "bg-yellow-500")} />
              <span className="flex-1 text-left font-medium truncate">{selectedModel.name}</span>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            {modelDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-xl shadow-lg z-10 max-h-[240px] overflow-y-auto p-1">
                {models.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => { setSelectedModel(m); setSelectedSubIndex(0); setModelDropdownOpen(false); }}
                    className={cn("w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-muted/60 transition-colors text-left", selectedModel.id === m.id && "bg-muted")}
                  >
                    <ModelGlyph name={m.name} size={20} />
                    <span className="flex-1 truncate">{m.name}</span>
                    <span className="font-mono text-[11px] text-muted-foreground">{m.credits} cr</span>
                    {selectedModel.id === m.id && <span className="text-green-500 text-xs">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sub-model / version */}
          {selectedModel.subModels && selectedModel.subModels.length > 0 && (
            <div className="relative mt-2">
              <button
                onClick={() => setVersionDropdownOpen(!versionDropdownOpen)}
                className="w-full flex items-center gap-2 border border-border rounded-xl px-3 py-2.5 text-sm hover:bg-muted/60 transition-colors"
              >
                <span className="flex-1 text-left truncate">
                  {selectedModel.subModels[selectedSubIndex]?.name ?? selectedModel.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
              {versionDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-xl shadow-lg z-10 p-1">
                  {selectedModel.subModels.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => { setSelectedSubIndex(i); setVersionDropdownOpen(false); }}
                      className={cn("w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-muted/60 transition-colors text-left", selectedSubIndex === i && "bg-muted")}
                    >
                      <span className="flex-1 truncate">{s.name}</span>
                      {s.isNew && <span className="text-[10px] bg-destructive text-destructive-foreground px-1.5 py-0.5 rounded-full font-semibold">NEW</span>}
                      {selectedSubIndex === i && <span className="text-green-500 text-xs">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Video: Kling function selector */}
          {isVideo && selectedModel.id === "kling-video" && (
            <div className="relative mt-2">
              <button
                onClick={() => setFuncDropdownOpen(!funcDropdownOpen)}
                className="w-full flex items-center gap-2 border border-border rounded-xl px-3 py-2.5 text-sm hover:bg-muted/60 transition-colors"
              >
                <span className="flex-1 text-left truncate">{klingFunc}</span>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
              {funcDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-xl shadow-lg z-10 p-1 max-h-[200px] overflow-y-auto">
                  {klingFunctions.map((f) => (
                    <button
                      key={f}
                      onClick={() => { setKlingFunc(f); setFuncDropdownOpen(false); }}
                      className={cn("w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-muted/60 transition-colors", klingFunc === f && "bg-muted text-primary font-medium")}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Aspect ratio */}
        <div>
          <button onClick={() => setFormatOpen(!formatOpen)} className="flex items-center justify-between w-full text-sm font-medium mb-3">
            <span className="flex items-center gap-2"><ImageIcon size={14} /> {isVideo ? "Соотношение сторон" : "Формат"}</span>
            {formatOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          {formatOpen && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Соотношение сторон</span>
                <button onClick={() => setAspectRatio("4:3")} className="text-[11px] text-primary hover:underline flex items-center gap-1">
                  <RotateCcw className="w-3 h-3" /> Сбросить
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {currentAspectRatios.map((r) => (
                  <button
                    key={r}
                    onClick={() => setAspectRatio(r)}
                    className={cn("py-2 text-xs rounded-lg border transition-colors font-medium", aspectRatio === r ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted/60")}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Video: Duration */}
        {isVideo && (
          <div>
            <button onClick={() => setDurationOpen(!durationOpen)} className="flex items-center justify-between w-full text-sm font-medium mb-3">
              <span className="flex items-center gap-2"><Clock size={14} /> Длина видео</span>
              {durationOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {durationOpen && (
              <div className="grid grid-cols-5 gap-1.5">
                {videoDurations.map((d) => (
                  <button
                    key={d}
                    onClick={() => setVideoDuration(d)}
                    className={cn("py-2 text-xs rounded-lg border transition-colors font-medium", videoDuration === d ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted/60")}
                  >
                    {d}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Quality / Resolution */}
        <div>
          <button onClick={() => setQualityOpen(!qualityOpen)} className="flex items-center justify-between w-full text-sm font-medium mb-3">
            <span className="flex items-center gap-2"><Palette size={14} /> {isVideo ? "Разрешение" : "Качество"}</span>
            {qualityOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          {qualityOpen && (
            <div>
              {isVideo ? (
                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-muted-foreground mb-2 block">Разрешение</span>
                    <div className="flex gap-2">
                      {videoResolutions.map((r) => (
                        <button
                          key={r}
                          onClick={() => setVideoRes(r)}
                          className={cn("flex-1 py-2 text-xs rounded-lg border transition-colors font-medium", videoRes === r ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted/60")}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground mb-2 block">Качество</span>
                    <div className="flex gap-2">
                      {videoQualities.map((q) => (
                        <button
                          key={q}
                          onClick={() => setVideoQuality(q)}
                          className={cn("flex-1 py-2 text-xs rounded-lg border transition-colors font-medium", videoQuality === q ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted/60")}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">Разрешение</span>
                    <button onClick={() => setResolution("2K")} className="text-[11px] text-primary hover:underline flex items-center gap-1">
                      <RotateCcw className="w-3 h-3" /> Сбросить
                    </button>
                  </div>
                  <div className="flex gap-2">
                    {resolutions.map((r) => (
                      <button
                        key={r}
                        onClick={() => setResolution(r)}
                        className={cn("flex-1 py-2 text-xs rounded-lg border transition-colors font-medium", resolution === r ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted/60")}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Video: Scene builder */}
        {isVideo && (
          <div>
            <button onClick={() => setSceneOpen(!sceneOpen)} className="flex items-center justify-between w-full text-sm font-medium mb-3">
              <span className="flex items-center gap-2"><Film size={14} /> Конструктор сцены</span>
              {sceneOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {sceneOpen && (
              <div className="text-sm text-muted-foreground text-center py-6 border border-dashed border-border rounded-xl">
                Скоро
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom */}
      <div className="p-4 border-t border-border flex items-center justify-between">
        <button onClick={resetAll} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
          <RotateCcw className="w-3 h-3" /> Сбросить всё
        </button>
        <button
          onClick={isVideo ? expandAll : collapseAll}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {isVideo ? (
            <><ChevronDown className="w-3 h-3" /> Открыть всё</>
          ) : (
            <><ChevronUp className="w-3 h-3" /> Скрыть всё</>
          )}
        </button>
      </div>
    </aside>
  );
}
