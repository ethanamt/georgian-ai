"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Undo2, Check } from "lucide-react";

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  points: Point[];
}

interface WritingCanvasProps {
  guideLetter?: string;
  onStroke?: (stroke: Stroke) => void;
  width?: number;
  height?: number;
}

function calculateAccuracy(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  strokes: Stroke[]
): number {
  const w = canvas.width;
  const h = canvas.height;

  const guideData = ctx.getImageData(0, 0, w, h);

  ctx.clearRect(0, 0, w, h);

  ctx.font = "180px 'Noto Sans Georgian'";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#000";
  ctx.fillText("", w / 2, h / 2);

  const userData = ctx.getImageData(0, 0, w, h);
  ctx.putImageData(guideData, 0, 0);

  let overlapPixels = 0;
  let totalGuidePixels = 0;
  let totalUserPixels = 0;

  for (let i = 0; i < userData.data.length; i += 4) {
    const isGuidePixel = guideData.data[i + 3] > 128;
    const isUserPixel = userData.data[i + 3] > 128;

    if (isGuidePixel) totalGuidePixels++;
    if (isUserPixel) totalUserPixels++;
    if (isGuidePixel && isUserPixel) overlapPixels++;
  }

  if (totalGuidePixels === 0 || totalUserPixels === 0) return 0;

  const recall = overlapPixels / totalGuidePixels;
  const precision = overlapPixels / totalUserPixels;

  if (recall + precision === 0) return 0;
  return Math.round((2 * (recall * precision) / (recall + precision)) * 100);
}

export function WritingCanvas({
  guideLetter,
  width = 280,
  height = 280,
}: WritingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const strokesRef = useRef<Stroke[]>([]);
  const currentStrokeRef = useRef<Point[]>([]);

  const getPos = (
    e: React.MouseEvent | React.TouchEvent
  ): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ("touches" in e) {
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const drawGuide = useCallback((ctx: CanvasRenderingContext2D) => {
    if (!guideLetter) return;
    ctx.save();
    ctx.font = "180px 'Noto Sans Georgian'";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(122, 36, 54, 0.08)";
    ctx.fillText(guideLetter, width / 2, height / 2);
    ctx.restore();
  }, [guideLetter, width, height]);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);
    drawGuide(ctx);

    ctx.strokeStyle = "#7A2436";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    for (const stroke of strokesRef.current) {
      if (stroke.points.length < 2) continue;
      ctx.beginPath();
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      ctx.stroke();
    }
  }, [drawGuide, width, height]);

  useEffect(() => {
    redraw();
  }, [redraw, guideLetter]);

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const pos = getPos(e);
    if (!pos) return;
    setIsDrawing(true);
    currentStrokeRef.current = [pos];
    setScore(null);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing) return;
    const pos = getPos(e);
    if (!pos) return;
    currentStrokeRef.current.push(pos);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = "#7A2436";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    const pts = currentStrokeRef.current;
    if (pts.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(pts[pts.length - 2].x, pts[pts.length - 2].y);
    ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
    ctx.stroke();
  };

  const handleEnd = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    if (currentStrokeRef.current.length > 1) {
      strokesRef.current.push({ points: [...currentStrokeRef.current] });
    }
    currentStrokeRef.current = [];
  };

  const handleClear = () => {
    strokesRef.current = [];
    currentStrokeRef.current = [];
    setScore(null);
    redraw();
  };

  const handleUndo = () => {
    strokesRef.current.pop();
    setScore(null);
    redraw();
  };

  function dilateMask(
    alpha: Uint8ClampedArray,
    w: number,
    h: number,
    radius: number
  ): Uint8Array {
    const mask = new Uint8Array(w * h);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4 + 3;
        if (alpha[i] <= 128) continue;
        for (let dy = -radius; dy <= radius; dy++) {
          for (let dx = -radius; dx <= radius; dx++) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
              mask[ny * w + nx] = 1;
            }
          }
        }
      }
    }
    return mask;
  }

  const handleCheck = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const userStrokes = [...strokesRef.current];
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    for (const stroke of userStrokes) {
      if (stroke.points.length < 2) continue;
      ctx.beginPath();
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      ctx.stroke();
    }

    const userData = ctx.getImageData(0, 0, width, height);
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.font = "180px 'Noto Sans Georgian'";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#000";
    ctx.fillText(guideLetter || "", width / 2, height / 2);
    ctx.restore();

    const guideData = ctx.getImageData(0, 0, width, height);

    redraw();

    const guideMask = dilateMask(guideData.data, width, height, 2);
    const userMask = dilateMask(userData.data, width, height, 2);

    let overlap = 0;
    let guidePixels = 0;
    let userPixels = 0;

    for (let i = 0; i < width * height; i++) {
      if (guideMask[i]) guidePixels++;
      if (userMask[i]) userPixels++;
      if (guideMask[i] && userMask[i]) overlap++;
    }

    if (guidePixels === 0 || userPixels === 0) {
      setScore(0);
      return;
    }

    const recall = overlap / guidePixels;
    const precision = overlap / userPixels;
    const f1 = recall + precision > 0
      ? Math.round((2 * (recall * precision) / (recall + precision)) * 100)
      : 0;

    setScore(f1);
  };

  return (
    <div className="space-y-3">
      <div
        className="relative mx-auto rounded-2xl border-2 border-border bg-card overflow-hidden touch-none"
        style={{ width, height }}
      >
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="block w-full h-full"
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
        />
      </div>

      {score !== null && (
        <div className="text-center space-y-1">
          <p className="text-lg font-heading font-semibold">
            Précision : {score}%
          </p>
          <p className="text-xs text-muted-foreground">
            {score >= 80
              ? "Excellent tracé !"
              : score >= 60
                ? "Bon, mais peut mieux faire."
                : "Essayez de suivre le modèle plus précisément."}
          </p>
        </div>
      )}

      <div className="flex justify-center gap-2">
        <Button variant="outline" size="sm" onClick={handleUndo} className="gap-1">
          <Undo2 className="size-3.5" />
          Annuler
        </Button>
        <Button variant="outline" size="sm" onClick={handleClear} className="gap-1">
          <RotateCcw className="size-3.5" />
          Effacer
        </Button>
        <Button
          size="sm"
          onClick={handleCheck}
          className="gap-1"
          disabled={strokesRef.current.length === 0}
        >
          <Check className="size-3.5" />
          Vérifier
        </Button>
      </div>
    </div>
  );
}
