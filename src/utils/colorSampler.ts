type RGB = { r: number; g: number; b: number };
type HSL = { h: number; s: number; l: number };

const BG_COLOR_PRIMARY_DARK = "#0e1e33";

function getRelativeLuminance({ r, g, b }: RGB): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const c1 = c / 255;
    return c1 <= 0.03928 ? c1 / 12.92 : Math.pow((c1 + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(color1: RGB, color2: RGB): number {
  const lum1 = getRelativeLuminance(color1);
  const lum2 = getRelativeLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

function hexToRgb(hex: string): RGB {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

function rgbToHsl({ r, g, b }: RGB): HSL {
  const r1 = r / 255;
  const g1 = g / 255;
  const b1 = b / 255;

  const max = Math.max(r1, g1, b1);
  const min = Math.min(r1, g1, b1);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r1:
        h = (g1 - b1) / d + (g1 < b1 ? 6 : 0);
        break;
      case g1:
        h = (b1 - r1) / d + 2;
        break;
      case b1:
        h = (r1 - g1) / d + 4;
        break;
    }

    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function rgbToCss({ r, g, b }: RGB) {
  return `rgb(${r}, ${g}, ${b})`;
}

function samplePixel(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number
): RGB | null {
  try {
    const data = ctx.getImageData(x, y, 1, 1).data;
    return { r: data[0], g: data[1], b: data[2] };
  } catch {
    return null;
  }
}

export async function extractReadableFlagColor(
  flagUrl: string
): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const W = Math.max(32, Math.min(400, img.naturalWidth));
      const H = Math.max(32, Math.min(400, img.naturalHeight));
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve(null);

      ctx.drawImage(img, 0, 0, W, H);

      const trySample = (px: number, py: number) => {
        const x = Math.max(0, Math.min(W - 1, Math.round(px)));
        const y = Math.max(0, Math.min(H - 1, Math.round(py)));
        return samplePixel(ctx, x, y);
      };

      const bgColor = hexToRgb(BG_COLOR_PRIMARY_DARK);
      const minContrast = 3;

      const topLeft = trySample(3, 3);
      if (topLeft) {
        const contrast = getContrastRatio(topLeft, bgColor);
        if (contrast >= minContrast) {
          return resolve(rgbToCss(topLeft));
        }
      }

      const centerBottom = trySample((W / 2) * 1.05, H * 0.9);
      if (centerBottom) {
        const contrast2 = getContrastRatio(centerBottom, bgColor);
        if (contrast2 >= minContrast) {
          return resolve(rgbToCss(centerBottom));
        }
      }

      return resolve(null);
    };

    img.onerror = () => resolve(null);
    img.src = flagUrl;
    if (img.complete && img.naturalWidth) {
      setTimeout(() => {
        if (img.onload) img.onload(new Event("load"));
      }, 0);
    }
  });
}

export { rgbToHsl, rgbToCss };
