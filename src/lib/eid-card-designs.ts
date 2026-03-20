// Shared types and helpers for Eid card designs

export interface CardDesign {
  id: string;
  name: string;
  nameEn: string;
  previewColors: string[];
  draw: (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    name: string,
    photoImg: HTMLImageElement | null
  ) => void;
}

export const CARD_W = 1200;
export const CARD_H = 1600;

// ─── Helpers ────────────────────────────────────────────────────

export function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  spikes: number,
  outerR: number,
  innerR: number
) {
  let rot = (Math.PI / 2) * 3;
  const step = Math.PI / spikes;
  ctx.beginPath();
  ctx.moveTo(cx, cy - outerR);
  for (let i = 0; i < spikes; i++) {
    ctx.lineTo(cx + Math.cos(rot) * outerR, cy + Math.sin(rot) * outerR);
    rot += step;
    ctx.lineTo(cx + Math.cos(rot) * innerR, cy + Math.sin(rot) * innerR);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerR);
  ctx.closePath();
  ctx.fill();
}

export function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";
  for (const word of words) {
    const testLine = currentLine ? currentLine + " " + word : word;
    if (ctx.measureText(testLine).width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

function drawCircularPhoto(
  ctx: CanvasRenderingContext2D,
  photoImg: HTMLImageElement,
  cx: number,
  cy: number,
  radius: number,
  borderColor: string,
  borderWidth = 4
) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  const imgSize = Math.min(photoImg.width, photoImg.height);
  const sx = (photoImg.width - imgSize) / 2;
  const sy = (photoImg.height - imgSize) / 2;
  ctx.drawImage(
    photoImg,
    sx,
    sy,
    imgSize,
    imgSize,
    cx - radius,
    cy - radius,
    radius * 2,
    radius * 2
  );
  ctx.restore();
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = borderWidth;
  ctx.beginPath();
  ctx.arc(cx, cy, radius + 2, 0, Math.PI * 2);
  ctx.stroke();
}

// ─── Design 1: Original Green + Cream ───────────────────────────

function drawOriginal(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  name: string,
  photoImg: HTMLImageElement | null
) {
  const GREEN = "#1a7a3a";
  const DARK_GREEN = "#145a2c";
  const CREAM = "#fdf6e3";
  const BORDER_GREEN = "#2e7d32";

  canvas.width = CARD_W;
  canvas.height = CARD_H;

  ctx.fillStyle = CREAM;
  ctx.fillRect(0, 0, CARD_W, CARD_H);

  // Diamond grid
  ctx.strokeStyle = "rgba(30, 120, 60, 0.06)";
  ctx.lineWidth = 1;
  const gap = 50;
  for (let x = 0; x < CARD_W; x += gap) {
    for (let y = 0; y < CARD_H; y += gap) {
      ctx.beginPath();
      ctx.moveTo(x, y - gap / 2);
      ctx.lineTo(x + gap / 2, y);
      ctx.lineTo(x, y + gap / 2);
      ctx.lineTo(x - gap / 2, y);
      ctx.closePath();
      ctx.stroke();
    }
  }

  // Watermark
  ctx.save();
  ctx.font = '700 80px "Noto Sans Bengali", sans-serif';
  ctx.fillStyle = "rgba(30, 120, 60, 0.04)";
  ctx.textAlign = "center";
  for (let y = 150; y < CARD_H; y += 200) {
    for (let x = -100; x < CARD_W + 100; x += 500) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(-0.15);
      ctx.fillText("ঈদ মোবারক", 0, 0);
      ctx.restore();
    }
  }
  ctx.restore();

  // Green rounded border
  const borderPad = 30;
  const borderRadius = 40;
  ctx.strokeStyle = BORDER_GREEN;
  ctx.lineWidth = 12;
  roundRect(ctx, borderPad, borderPad, CARD_W - borderPad * 2, CARD_H - borderPad * 2, borderRadius);
  ctx.stroke();

  // Inner border
  ctx.strokeStyle = "rgba(46, 125, 50, 0.3)";
  ctx.lineWidth = 3;
  roundRect(ctx, borderPad + 16, borderPad + 16, CARD_W - (borderPad + 16) * 2, CARD_H - (borderPad + 16) * 2, borderRadius - 8);
  ctx.stroke();

  // Corner decor
  const drawCorner = (x: number, y: number, angle: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.strokeStyle = "rgba(46, 125, 50, 0.4)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(30, 0);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 30);
    ctx.stroke();
    ctx.fillStyle = GREEN;
    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };
  drawCorner(borderPad + 30, borderPad + 30, 0);
  drawCorner(CARD_W - borderPad - 30, borderPad + 30, Math.PI / 2);
  drawCorner(CARD_W - borderPad - 30, CARD_H - borderPad - 30, Math.PI);
  drawCorner(borderPad + 30, CARD_H - borderPad - 30, -Math.PI / 2);

  // Crescent
  ctx.fillStyle = GREEN;
  ctx.beginPath();
  ctx.arc(CARD_W / 2, 180, 35, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = CREAM;
  ctx.beginPath();
  ctx.arc(CARD_W / 2 + 14, 174, 30, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = GREEN;
  drawStar(ctx, CARD_W / 2 + 18, 182, 5, 10, 5);

  // Main text
  ctx.textAlign = "center";
  ctx.font = '800 160px "Noto Sans Bengali", sans-serif';
  ctx.fillStyle = DARK_GREEN;
  ctx.fillText("ঈদ", CARD_W / 2, 520);

  ctx.font = '700 90px "Noto Sans Bengali", sans-serif';
  ctx.fillStyle = GREEN;
  ctx.fillText("(মোবারক)", CARD_W / 2, 640);

  // Decorative line
  ctx.strokeStyle = GREEN;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(CARD_W / 2 - 180, 680);
  ctx.lineTo(CARD_W / 2 + 180, 680);
  ctx.stroke();

  ctx.fillStyle = GREEN;
  ctx.beginPath();
  ctx.moveTo(CARD_W / 2, 675);
  ctx.lineTo(CARD_W / 2 + 6, 680);
  ctx.lineTo(CARD_W / 2, 685);
  ctx.lineTo(CARD_W / 2 - 6, 680);
  ctx.closePath();
  ctx.fill();

  // Wish text
  ctx.font = '400 38px "Noto Sans Bengali", sans-serif';
  ctx.fillStyle = "#3e3e3e";
  ctx.textAlign = "center";
  const wishLines = wrapText(
    ctx,
    "আপনার ও আপনার পরিবারের জন্য রইলো ঈদের অনেক অনেক শুভেচ্ছা ও ভালোবাসা!",
    CARD_W - 200
  );
  let wishY = 780;
  wishLines.forEach((line) => {
    ctx.fillText(line, CARD_W / 2, wishY);
    wishY += 55;
  });

  // Bottom section
  const bottomY = CARD_H - 280;

  if (photoImg) {
    drawCircularPhoto(ctx, photoImg, 250, bottomY + 60, 80, GREEN);
  }

  ctx.textAlign = "center";
  ctx.font = '400 36px "Noto Sans Bengali", sans-serif';
  ctx.fillStyle = "#555";
  ctx.fillText("শুভেচ্ছাতে,", CARD_W / 2 + (photoImg ? 60 : 0), bottomY + 20);

  const displayName = name || "JEEM";
  ctx.font = '800 56px "Noto Sans Bengali", sans-serif';
  ctx.fillStyle = GREEN;
  ctx.fillText(displayName, CARD_W / 2 + (photoImg ? 60 : 0), bottomY + 90);

  ctx.strokeStyle = "rgba(30, 120, 60, 0.3)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(borderPad + 60, CARD_H - borderPad - 60);
  ctx.lineTo(CARD_W - borderPad - 60, CARD_H - borderPad - 60);
  ctx.stroke();
}

// ─── Design 2: Desert Cityscape ─────────────────────────────────

function drawDesertCityscape(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  name: string,
  photoImg: HTMLImageElement | null
) {
  canvas.width = CARD_W;
  canvas.height = CARD_H;

  const SKY = "#faf5ef";
  const SAND = "#e8c9a0";
  const BROWN1 = "#b5764c";
  const BROWN2 = "#8c5a3c";
  const BROWN3 = "#c48b5c";
  const DARK_BROWN = "#6b3e26";
  const GOLD = "#d4a04a";
  const LIGHT_BEIGE = "#f0dfc8";

  // Sky background
  ctx.fillStyle = SKY;
  ctx.fillRect(0, 0, CARD_W, CARD_H);

  // Subtle warm gradient at bottom
  const grad = ctx.createLinearGradient(0, CARD_H * 0.5, 0, CARD_H);
  grad.addColorStop(0, "rgba(232, 201, 160, 0)");
  grad.addColorStop(1, "rgba(232, 201, 160, 0.3)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, CARD_W, CARD_H);

  // Crescent moon
  ctx.fillStyle = GOLD;
  ctx.beginPath();
  ctx.arc(CARD_W / 2 + 60, 260, 70, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = SKY;
  ctx.beginPath();
  ctx.arc(CARD_W / 2 + 90, 240, 60, 0, Math.PI * 2);
  ctx.fill();

  // Title text
  ctx.textAlign = "center";
  ctx.font = '800 120px "Noto Sans Bengali", sans-serif';
  ctx.fillStyle = DARK_BROWN;
  ctx.fillText("ঈদ মোবারক", CARD_W / 2, 520);

  // Subtitle
  ctx.font = '400 36px "Noto Sans Bengali", sans-serif';
  ctx.fillStyle = BROWN2;
  ctx.fillText("Eid Mubarak", CARD_W / 2, 580);

  // Wish text
  ctx.font = '400 34px "Noto Sans Bengali", sans-serif';
  ctx.fillStyle = "#6b5a4a";
  const wishLines = wrapText(
    ctx,
    "আপনার ও আপনার পরিবারের জন্য রইলো ঈদের অনেক অনেক শুভেচ্ছা ও ভালোবাসা!",
    CARD_W - 240
  );
  let wishY = 680;
  wishLines.forEach((line) => {
    ctx.fillText(line, CARD_W / 2, wishY);
    wishY += 52;
  });

  // Name section
  if (photoImg) {
    drawCircularPhoto(ctx, photoImg, CARD_W / 2, 880, 70, GOLD, 5);
  }

  ctx.textAlign = "center";
  ctx.font = '400 32px "Noto Sans Bengali", sans-serif';
  ctx.fillStyle = BROWN2;
  ctx.fillText("শুভেচ্ছাতে,", CARD_W / 2, photoImg ? 980 : 880);

  const displayName = name || "JEEM";
  ctx.font = '700 52px "Noto Sans Bengali", sans-serif';
  ctx.fillStyle = DARK_BROWN;
  ctx.fillText(displayName, CARD_W / 2, photoImg ? 1040 : 940);

  // ─── Cityscape at bottom ───
  const baseY = CARD_H - 10;

  // Ground hill
  ctx.fillStyle = SAND;
  ctx.beginPath();
  ctx.moveTo(0, baseY);
  ctx.quadraticCurveTo(CARD_W / 2, baseY - 120, CARD_W, baseY);
  ctx.lineTo(CARD_W, CARD_H);
  ctx.lineTo(0, CARD_H);
  ctx.closePath();
  ctx.fill();

  // Buildings - array of [x, width, height, color, hasWindow, hasDoor, archTop]
  const buildings: [number, number, number, string, boolean, boolean, boolean][] = [
    [30, 130, 320, BROWN1, true, false, false],
    [140, 100, 250, LIGHT_BEIGE, true, false, false],
    [220, 90, 380, BROWN2, false, true, true],
    [300, 140, 280, BROWN3, true, false, false],
    [420, 80, 200, LIGHT_BEIGE, false, false, false],
    [480, 120, 350, BROWN1, true, true, false],
    [580, 100, 240, SAND, true, false, false],
    [660, 130, 310, BROWN2, false, true, true],
    [770, 90, 270, BROWN3, true, false, false],
    [840, 140, 220, LIGHT_BEIGE, true, false, false],
    [960, 100, 360, BROWN1, false, true, false],
    [1040, 120, 280, BROWN3, true, false, true],
    [1100, 80, 200, SAND, false, false, false],
  ];

  buildings.forEach(([bx, bw, bh, color, hasWin, hasDoor, archTop]) => {
    const by = baseY - bh + 30;
    ctx.fillStyle = color;

    if (archTop) {
      ctx.beginPath();
      ctx.moveTo(bx, by + bw / 2);
      ctx.arc(bx + bw / 2, by + bw / 2, bw / 2, Math.PI, 0);
      ctx.lineTo(bx + bw, baseY + 30);
      ctx.lineTo(bx, baseY + 30);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.fillRect(bx, by, bw, bh);
    }

    // Windows
    if (hasWin) {
      ctx.fillStyle = "rgba(255,255,255,0.25)";
      const winW = 18;
      const winH = 24;
      const cols = Math.floor(bw / 40);
      const rows = Math.min(3, Math.floor(bh / 80));
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const wx = bx + 20 + c * 38;
          const wy = by + 40 + r * 60;
          ctx.fillRect(wx, wy, winW, winH);
        }
      }
    }

    // Door
    if (hasDoor) {
      ctx.fillStyle = DARK_BROWN;
      const dw = 30;
      const dh = 50;
      const dx = bx + bw / 2 - dw / 2;
      const dy = baseY + 30 - dh;
      ctx.beginPath();
      ctx.moveTo(dx, dy + dw / 2);
      ctx.arc(dx + dw / 2, dy + dw / 2, dw / 2, Math.PI, 0);
      ctx.lineTo(dx + dw, dy + dh);
      ctx.lineTo(dx, dy + dh);
      ctx.closePath();
      ctx.fill();
    }
  });
}

// ─── Design 3: Golden Ornate ────────────────────────────────────

function drawGoldenOrnate(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  name: string,
  photoImg: HTMLImageElement | null
) {
  canvas.width = CARD_W;
  canvas.height = CARD_H;

  const BG = "#fffef9";
  const GOLD = "#c9952b";
  const LIGHT_GOLD = "rgba(201, 149, 43, 0.15)";
  const DARK_GOLD = "#8a6820";

  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, CARD_W, CARD_H);

  // Subtle gold radial glow
  const radGrad = ctx.createRadialGradient(CARD_W / 2, 400, 50, CARD_W / 2, 400, 500);
  radGrad.addColorStop(0, "rgba(201, 149, 43, 0.06)");
  radGrad.addColorStop(1, "rgba(201, 149, 43, 0)");
  ctx.fillStyle = radGrad;
  ctx.fillRect(0, 0, CARD_W, CARD_H);

  // Geometric Islamic pattern band at top
  ctx.strokeStyle = LIGHT_GOLD;
  ctx.lineWidth = 1;
  for (let x = 0; x < CARD_W; x += 40) {
    for (let y = 60; y < 160; y += 40) {
      ctx.beginPath();
      ctx.moveTo(x + 20, y);
      ctx.lineTo(x + 40, y + 20);
      ctx.lineTo(x + 20, y + 40);
      ctx.lineTo(x, y + 20);
      ctx.closePath();
      ctx.stroke();
    }
  }

  // Large crescent with pattern
  const cx = CARD_W / 2 - 80;
  const cy = 380;
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx, cy, 120, 0, Math.PI * 2);
  ctx.stroke();
  // Inner cutout
  ctx.fillStyle = BG;
  ctx.beginPath();
  ctx.arc(cx + 45, cy - 20, 100, 0, Math.PI * 2);
  ctx.fill();
  // Crescent fill
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, 119, 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = BG;
  ctx.beginPath();
  ctx.arc(cx + 45, cy - 20, 100, 0, Math.PI * 2);
  ctx.fill();
  // Pattern inside crescent
  ctx.strokeStyle = "rgba(201, 149, 43, 0.3)";
  ctx.lineWidth = 0.8;
  for (let px = cx - 130; px < cx + 130; px += 15) {
    for (let py = cy - 130; py < cy + 130; py += 15) {
      ctx.beginPath();
      ctx.moveTo(px + 7, py);
      ctx.lineTo(px + 15, py + 7);
      ctx.lineTo(px + 7, py + 15);
      ctx.lineTo(px, py + 7);
      ctx.closePath();
      ctx.stroke();
    }
  }
  ctx.restore();

  // Star near crescent
  ctx.fillStyle = GOLD;
  drawStar(ctx, cx - 60, cy - 80, 6, 14, 7);
  drawStar(ctx, cx - 40, cy - 110, 4, 6, 3);

  // Hanging lanterns
  const drawLantern = (lx: number, ly: number, size: number) => {
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 1.5;
    // Chain
    ctx.beginPath();
    ctx.moveTo(lx, ly - size * 2);
    ctx.lineTo(lx, ly - size * 0.5);
    ctx.stroke();
    // Body
    ctx.beginPath();
    ctx.moveTo(lx - size * 0.3, ly - size * 0.5);
    ctx.lineTo(lx + size * 0.3, ly - size * 0.5);
    ctx.lineTo(lx + size * 0.5, ly);
    ctx.lineTo(lx + size * 0.5, ly + size);
    ctx.lineTo(lx + size * 0.3, ly + size * 1.3);
    ctx.lineTo(lx - size * 0.3, ly + size * 1.3);
    ctx.lineTo(lx - size * 0.5, ly + size);
    ctx.lineTo(lx - size * 0.5, ly);
    ctx.closePath();
    ctx.stroke();
    // Cross pattern
    ctx.beginPath();
    ctx.moveTo(lx - size * 0.5, ly + size * 0.5);
    ctx.lineTo(lx + size * 0.5, ly + size * 0.5);
    ctx.moveTo(lx, ly - size * 0.5);
    ctx.lineTo(lx, ly + size * 1.3);
    ctx.stroke();
    // Dome top
    ctx.beginPath();
    ctx.arc(lx, ly - size * 0.5, size * 0.3, Math.PI, 0);
    ctx.stroke();
  };

  drawLantern(cx + 80, 300, 30);
  drawLantern(cx + 150, 340, 24);
  drawLantern(cx + 40, 350, 20);

  // Sparkle dots
  ctx.fillStyle = GOLD;
  const sparkles = [
    [cx + 110, 280], [cx + 170, 310], [cx + 60, 320],
    [cx + 130, 370], [cx + 190, 360],
  ];
  sparkles.forEach(([sx, sy]) => {
    drawStar(ctx, sx, sy, 4, 4, 2);
  });

  // Title - Arabic style "ঈদ মোবারক"
  ctx.textAlign = "center";
  ctx.font = '800 100px "Noto Sans Bengali", sans-serif';
  ctx.fillStyle = GOLD;
  ctx.fillText("ঈদ মোবারক", CARD_W / 2 + 60, 340);

  // Divider
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(CARD_W / 2 - 120, 580);
  ctx.lineTo(CARD_W / 2 + 120, 580);
  ctx.stroke();

  // Wish text
  ctx.font = '400 34px "Noto Sans Bengali", sans-serif';
  ctx.fillStyle = DARK_GOLD;
  ctx.textAlign = "center";
  const wishLines = wrapText(
    ctx,
    "আপনার ও আপনার পরিবারের জন্য রইলো ঈদের অনেক অনেক শুভেচ্ছা ও ভালোবাসা!",
    CARD_W - 240
  );
  let wishY = 660;
  wishLines.forEach((line) => {
    ctx.fillText(line, CARD_W / 2, wishY);
    wishY += 52;
  });

  // Photo + name
  if (photoImg) {
    drawCircularPhoto(ctx, photoImg, CARD_W / 2, 870, 70, GOLD, 4);
  }

  ctx.font = '400 32px "Noto Sans Bengali", sans-serif';
  ctx.fillStyle = DARK_GOLD;
  ctx.fillText("শুভেচ্ছাতে,", CARD_W / 2, photoImg ? 970 : 870);

  const displayName = name || "JEEM";
  ctx.font = '700 52px "Noto Sans Bengali", sans-serif';
  ctx.fillStyle = GOLD;
  ctx.fillText(displayName, CARD_W / 2, photoImg ? 1030 : 930);

  // Mosque at bottom
  const mBaseY = CARD_H - 80;
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 2;

  // Central dome
  ctx.beginPath();
  ctx.arc(CARD_W / 2, mBaseY - 200, 120, Math.PI, 0);
  ctx.lineTo(CARD_W / 2 + 120, mBaseY);
  ctx.lineTo(CARD_W / 2 - 120, mBaseY);
  ctx.closePath();
  ctx.stroke();

  // Side domes
  ctx.beginPath();
  ctx.arc(CARD_W / 2 - 200, mBaseY - 100, 80, Math.PI, 0);
  ctx.lineTo(CARD_W / 2 - 120, mBaseY);
  ctx.lineTo(CARD_W / 2 - 280, mBaseY);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(CARD_W / 2 + 200, mBaseY - 100, 80, Math.PI, 0);
  ctx.lineTo(CARD_W / 2 + 280, mBaseY);
  ctx.lineTo(CARD_W / 2 + 120, mBaseY);
  ctx.closePath();
  ctx.stroke();

  // Minarets
  const drawMinaret = (mx: number) => {
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 2;
    ctx.strokeRect(mx - 12, mBaseY - 280, 24, 280);
    ctx.beginPath();
    ctx.moveTo(mx - 12, mBaseY - 280);
    ctx.lineTo(mx, mBaseY - 310);
    ctx.lineTo(mx + 12, mBaseY - 280);
    ctx.closePath();
    ctx.stroke();
    // Crescent on top
    ctx.beginPath();
    ctx.arc(mx, mBaseY - 320, 8, 0, Math.PI * 2);
    ctx.stroke();
  };

  drawMinaret(CARD_W / 2 - 320);
  drawMinaret(CARD_W / 2 - 160);
  drawMinaret(CARD_W / 2 + 160);
  drawMinaret(CARD_W / 2 + 320);

  // Gate
  ctx.beginPath();
  ctx.arc(CARD_W / 2, mBaseY - 60, 40, Math.PI, 0);
  ctx.lineTo(CARD_W / 2 + 40, mBaseY);
  ctx.lineTo(CARD_W / 2 - 40, mBaseY);
  ctx.closePath();
  ctx.stroke();

  // Base line
  ctx.beginPath();
  ctx.moveTo(CARD_W / 2 - 350, mBaseY);
  ctx.lineTo(CARD_W / 2 + 350, mBaseY);
  ctx.stroke();

  // Bottom pattern band
  ctx.strokeStyle = LIGHT_GOLD;
  ctx.lineWidth = 0.8;
  for (let x = 0; x < CARD_W; x += 40) {
    for (let y = CARD_H - 50; y < CARD_H; y += 40) {
      ctx.beginPath();
      ctx.moveTo(x + 20, y);
      ctx.lineTo(x + 40, y + 20);
      ctx.lineTo(x + 20, y + 40);
      ctx.lineTo(x, y + 20);
      ctx.closePath();
      ctx.stroke();
    }
  }
}

// ─── Design 4: Minimal Elegant ──────────────────────────────────

function drawMinimalElegant(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  name: string,
  photoImg: HTMLImageElement | null
) {
  canvas.width = CARD_W;
  canvas.height = CARD_H;

  const BG = "#f5f2ed";
  const GOLD_TEXT = "#b08d4c";
  const DARK_TEXT = "#4a4a4a";
  const BORDER = "#8a8a8a";

  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, CARD_W, CARD_H);

  // Double border - outer
  ctx.strokeStyle = BORDER;
  ctx.lineWidth = 2;
  ctx.strokeRect(40, 40, CARD_W - 80, CARD_H - 80);

  // Double border - inner
  ctx.strokeStyle = "rgba(138, 138, 138, 0.4)";
  ctx.lineWidth = 1;
  ctx.strokeRect(55, 55, CARD_W - 110, CARD_H - 110);

  // Elegant calligraphic-style "ঈদ মোবারক" centered
  ctx.textAlign = "center";
  ctx.font = '700 130px "Noto Sans Bengali", sans-serif';
  ctx.fillStyle = GOLD_TEXT;
  ctx.fillText("ঈদ মোবারক", CARD_W / 2, CARD_H / 2 - 40);

  // "Eid Mubarak" in English below
  ctx.font = '400 48px Georgia, serif';
  ctx.fillStyle = DARK_TEXT;
  ctx.fillText("Eid Mubarak", CARD_W / 2, CARD_H / 2 + 40);

  // Thin separator
  ctx.strokeStyle = GOLD_TEXT;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(CARD_W / 2 - 100, CARD_H / 2 + 70);
  ctx.lineTo(CARD_W / 2 + 100, CARD_H / 2 + 70);
  ctx.stroke();

  // Wish text
  ctx.font = '400 32px "Noto Sans Bengali", sans-serif';
  ctx.fillStyle = "#666";
  ctx.textAlign = "center";
  const wishLines = wrapText(
    ctx,
    "আপনার ও আপনার পরিবারের জন্য রইলো ঈদের অনেক অনেক শুভেচ্ছা ও ভালোবাসা!",
    CARD_W - 300
  );
  let wishY = CARD_H / 2 + 150;
  wishLines.forEach((line) => {
    ctx.fillText(line, CARD_W / 2, wishY);
    wishY += 48;
  });

  // Photo + name at bottom
  const bottomY = CARD_H - 240;

  if (photoImg) {
    drawCircularPhoto(ctx, photoImg, CARD_W / 2, bottomY - 20, 60, GOLD_TEXT, 3);
  }

  ctx.font = '400 30px "Noto Sans Bengali", sans-serif';
  ctx.fillStyle = "#777";
  ctx.fillText("শুভেচ্ছাতে,", CARD_W / 2, photoImg ? bottomY + 70 : bottomY);

  const displayName = name || "JEEM";
  ctx.font = '700 48px "Noto Sans Bengali", sans-serif';
  ctx.fillStyle = GOLD_TEXT;
  ctx.fillText(displayName, CARD_W / 2, photoImg ? bottomY + 125 : bottomY + 55);
}

// ─── Export all designs ─────────────────────────────────────────

export const cardDesigns: CardDesign[] = [
  {
    id: "original",
    name: "ক্লাসিক সবুজ",
    nameEn: "Classic Green",
    previewColors: ["#1a7a3a", "#fdf6e3", "#2e7d32"],
    draw: drawOriginal,
  },
  {
    id: "desert",
    name: "মরুভূমি",
    nameEn: "Desert City",
    previewColors: ["#b5764c", "#faf5ef", "#d4a04a"],
    draw: drawDesertCityscape,
  },
  {
    id: "golden",
    name: "সোনালী",
    nameEn: "Golden Ornate",
    previewColors: ["#c9952b", "#fffef9", "#8a6820"],
    draw: drawGoldenOrnate,
  },
  {
    id: "minimal",
    name: "মিনিমাল",
    nameEn: "Minimal Elegant",
    previewColors: ["#b08d4c", "#f5f2ed", "#8a8a8a"],
    draw: drawMinimalElegant,
  },
];
