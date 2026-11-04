import React, { useEffect, useState } from 'react';

export interface CropRegion {
  x: number;
  y: number;
  w: number;
  h: number;
  poly?: [number, number][];
  circle?: { cx: number; cy: number; r: number };
}

interface StudioCutoutImgProps {
  src: string;
  alt: string;
  crop?: CropRegion;
  className?: string;
  style?: React.CSSProperties;
}

// Module-level cache so each studio image + crop combination is processed only once
const processedBlobCache = new Map<string, string>();
const inflightPromises = new Map<string, Promise<string>>();

/**
 * Converts a studio white-background product render into a true 32-bit RGBA
 * transparent cutout (alpha = 0) using connected-components analysis and
 * anti-aliased edge feathering.
 *
 * - Outer white studio backgrounds AND interior mechanical cutouts (frame triangles,
 *   wheel spokes, rotor slots, cassette holes, spacer center) have area >= 240px
 *   or touch the border, so they become 100% transparent (alpha = 0).
 * - Small interior white decals ("Park Tool", "ZIPP", "BOSCH", "CERAMIC BEARING")
 *   have area < 240px inside dark objects, so they remain 100% crisp opaque white!
 */
function processStudioImageToTransparentBlob(
  src: string,
  crop?: CropRegion
): Promise<string> {
  const cacheKey = crop ? `${src}::${crop.x},${crop.y},${crop.w},${crop.h}` : src;

  const cached = processedBlobCache.get(cacheKey);
  if (cached) {
    return Promise.resolve(cached);
  }

  const inflight = inflightPromises.get(cacheKey);
  if (inflight) {
    return inflight;
  }

  const promise = new Promise<string>((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const sx = crop ? crop.x : 0;
        const sy = crop ? crop.y : 0;
        const sw = crop ? crop.w : img.naturalWidth || img.width;
        const sh = crop ? crop.h : img.naturalHeight || img.height;

        if (!sw || !sh) {
          resolve(src);
          return;
        }

        const canvas = document.createElement('canvas');
        canvas.width = sw;
        canvas.height = sh;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) {
          resolve(src);
          return;
        }

        if (crop?.poly && crop.poly.length > 2) {
          ctx.beginPath();
          crop.poly.forEach(([px, py], idx) => {
            if (idx === 0) ctx.moveTo(px - sx, py - sy);
            else ctx.lineTo(px - sx, py - sy);
          });
          ctx.closePath();
          ctx.clip();
        } else if (crop?.circle) {
          ctx.beginPath();
          ctx.arc(
            crop.circle.cx - sx,
            crop.circle.cy - sy,
            crop.circle.r,
            0,
            Math.PI * 2
          );
          ctx.closePath();
          ctx.clip();
        }

        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
        const imgData = ctx.getImageData(0, 0, sw, sh);
        const data = imgData.data;
        const total = sw * sh;

        // Step 1: Identify neutral bright studio pixels (candidate background/cutout holes)
        const isCandidate = new Uint8Array(total);
        for (let i = 0; i < total; i++) {
          const idx = i * 4;
          const a = data[idx + 3];
          if (a === 0) continue;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const max = r > g ? (r > b ? r : b) : g > b ? g : b;
          const min = r < g ? (r < b ? r : b) : g < b ? g : b;
          const chroma = max - min;
          const lum = (r + g + b) * 0.333333;
          // Studio backdrop and light floor shadow threshold
          if (lum >= 222 && chroma <= 24) {
            isCandidate[i] = 1;
          }
        }

        // Step 2: Connected components — keep tiny interior text decals (< 240px) opaque,
        // while removing outer studio background & mechanical cutout holes (spokes, frame, rotor)
        const visited = new Uint8Array(total);
        const isBg = new Uint8Array(total);
        const queue = new Int32Array(total);

        for (let i = 0; i < total; i++) {
          if (isCandidate[i] && !visited[i]) {
            let head = 0;
            let tail = 0;
            let touchesBorder = false;
            queue[tail++] = i;
            visited[i] = 1;

            while (head < tail) {
              const curr = queue[head++];
              const cx = curr % sw;
              const cy = (curr / sw) | 0;

              if (cx === 0 || cy === 0 || cx === sw - 1 || cy === sh - 1) {
                touchesBorder = true;
              }

              // 4-neighbor expansion
              if (cx > 0) {
                const left = curr - 1;
                if (isCandidate[left] && !visited[left]) {
                  visited[left] = 1;
                  queue[tail++] = left;
                }
              }
              if (cx < sw - 1) {
                const right = curr + 1;
                if (isCandidate[right] && !visited[right]) {
                  visited[right] = 1;
                  queue[tail++] = right;
                }
              }
              if (cy > 0) {
                const up = curr - sw;
                if (isCandidate[up] && !visited[up]) {
                  visited[up] = 1;
                  queue[tail++] = up;
                }
              }
              if (cy < sh - 1) {
                const down = curr + sw;
                if (isCandidate[down] && !visited[down]) {
                  visited[down] = 1;
                  queue[tail++] = down;
                }
              }
            }

            if (touchesBorder || tail >= 240) {
              for (let k = 0; k < tail; k++) {
                isBg[queue[k]] = 1;
              }
            }
          }
        }

        // Step 3: Apply smooth alpha ramp & anti-aliased edge feathering
        for (let i = 0; i < total; i++) {
          const idx = i * 4;
          if (isBg[i]) {
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const lum = (r + g + b) * 0.333333;
            if (lum >= 238) {
              data[idx + 3] = 0;
            } else {
              // Soft shadow / anti-alias ramp between 222 and 238
              const alphaFactor = Math.max(0, Math.min(1, (238 - lum) / 16));
              data[idx + 3] = Math.round(alphaFactor * 180);
            }
          } else if (data[idx + 3] > 0) {
            // Feather 1px boundary pixels adjacent to transparent background
            const cx = i % sw;
            const cy = (i / sw) | 0;
            const touchesBg =
              (cx > 0 && isBg[i - 1]) ||
              (cx < sw - 1 && isBg[i + 1]) ||
              (cy > 0 && isBg[i - sw]) ||
              (cy < sh - 1 && isBg[i + sw]);

            if (touchesBg) {
              const r = data[idx];
              const g = data[idx + 1];
              const b = data[idx + 2];
              const lum = (r + g + b) * 0.333333;
              const max = r > g ? (r > b ? r : b) : g > b ? g : b;
              const min = r < g ? (r < b ? r : b) : g < b ? g : b;
              if (lum > 195 && max - min < 32) {
                const edgeAlpha = Math.max(0.1, Math.min(1, (235 - lum) / 40));
                data[idx + 3] = Math.round(data[idx + 3] * edgeAlpha);
              }
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);

        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            processedBlobCache.set(cacheKey, url);
            resolve(url);
          } else {
            const dataUrl = canvas.toDataURL('image/png');
            processedBlobCache.set(cacheKey, dataUrl);
            resolve(dataUrl);
          }
        }, 'image/png');
      } catch {
        resolve(src);
      }
    };

    img.onerror = () => {
      resolve(src);
    };

    img.src = src;
  });

  inflightPromises.set(cacheKey, promise);
  return promise;
}

export const StudioCutoutImg: React.FC<StudioCutoutImgProps> = ({
  src,
  alt,
  crop,
  className = '',
  style,
}) => {
  const cacheKey = crop ? `${src}::${crop.x},${crop.y},${crop.w},${crop.h}` : src;
  const [processedUrl, setProcessedUrl] = useState<string | null>(
    () => processedBlobCache.get(cacheKey) || null
  );

  useEffect(() => {
    let active = true;
    processStudioImageToTransparentBlob(src, crop).then((url) => {
      if (active) {
        setProcessedUrl(url);
      }
    });
    return () => {
      active = false;
    };
  }, [src, cacheKey, crop]);

  if (!processedUrl) {
    return (
      <div
        aria-hidden="true"
        style={style}
        className={`animate-pulse bg-transparent ${className}`}
      />
    );
  }

  return (
    <img
      src={processedUrl}
      alt={alt}
      draggable={false}
      style={style}
      className={`select-none ${className}`}
    />
  );
};
