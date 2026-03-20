import { useState, useRef, useEffect, useCallback } from "react";
import { Download, Share2, Upload, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

const CARD_W = 1200;
const CARD_H = 1600;
const GREEN = "#1a7a3a";
const DARK_GREEN = "#145a2c";
const CREAM = "#fdf6e3";
const LIGHT_GREEN = "#e8f5e9";
const BORDER_GREEN = "#2e7d32";

const EidCard = () => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoImg, setPhotoImg] = useState<HTMLImageElement | null>(null);
  const [generated, setGenerated] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fontLoaded = useRef(false);

  // Load Bengali font
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;600;700;800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const font = new FontFace(
      "Noto Sans Bengali",
      "url(https://fonts.gstatic.com/s/notosansbengali/v20/Cn-SJsCGWQxOjaGwMQ6fIiMywrNJIky6nvd8BjzVMvJx2mcSPVFpVEqE-6KmsolKl1st9k4z.woff2)"
    );
    font.load().then((loaded) => {
      document.fonts.add(loaded);
      fontLoaded.current = true;
      drawCard();
    });
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const src = ev.target?.result as string;
      setPhoto(src);
      const img = new Image();
      img.onload = () => setPhotoImg(img);
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const drawCard = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = CARD_W;
    canvas.height = CARD_H;

    // Background
    ctx.fillStyle = CREAM;
    ctx.fillRect(0, 0, CARD_W, CARD_H);

    // Diamond grid pattern
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

    // Faded watermark "ঈদ মোবারক"
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
    const borderRadius = 40;
    const borderPad = 30;
    ctx.strokeStyle = BORDER_GREEN;
    ctx.lineWidth = 12;
    roundRect(ctx, borderPad, borderPad, CARD_W - borderPad * 2, CARD_H - borderPad * 2, borderRadius);
    ctx.stroke();

    // Inner subtle border
    ctx.strokeStyle = "rgba(46, 125, 50, 0.3)";
    ctx.lineWidth = 3;
    roundRect(ctx, borderPad + 16, borderPad + 16, CARD_W - (borderPad + 16) * 2, CARD_H - (borderPad + 16) * 2, borderRadius - 8);
    ctx.stroke();

    // Decorative corner elements
    drawCornerDecor(ctx, borderPad + 30, borderPad + 30, 0);
    drawCornerDecor(ctx, CARD_W - borderPad - 30, borderPad + 30, Math.PI / 2);
    drawCornerDecor(ctx, CARD_W - borderPad - 30, CARD_H - borderPad - 30, Math.PI);
    drawCornerDecor(ctx, borderPad + 30, CARD_H - borderPad - 30, -Math.PI / 2);

    // Small crescent + star at top center
    drawCrescent(ctx, CARD_W / 2, 180);

    // Main text: ঈদ
    ctx.textAlign = "center";
    ctx.font = '800 160px "Noto Sans Bengali", sans-serif';
    ctx.fillStyle = DARK_GREEN;
    ctx.fillText("ঈদ", CARD_W / 2, 520);

    // (মোবারক)
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

    // Small diamond center
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
      CARD_W - 200,
    );
    let wishY = 780;
    wishLines.forEach((line) => {
      ctx.fillText(line, CARD_W / 2, wishY);
      wishY += 55;
    });

    // Bottom section
    const bottomY = CARD_H - 280;

    // Photo circle
    if (photoImg) {
      const circleR = 80;
      const cx = 250;
      const cy = bottomY + 60;

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, circleR, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      const imgSize = Math.min(photoImg.width, photoImg.height);
      const sx = (photoImg.width - imgSize) / 2;
      const sy = (photoImg.height - imgSize) / 2;
      ctx.drawImage(photoImg, sx, sy, imgSize, imgSize, cx - circleR, cy - circleR, circleR * 2, circleR * 2);
      ctx.restore();

      // Circle border
      ctx.strokeStyle = GREEN;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(cx, cy, circleR + 2, 0, Math.PI * 2);
      ctx.stroke();
    }

    // শুভেচ্ছাতে,
    ctx.textAlign = "center";
    ctx.font = '400 36px "Noto Sans Bengali", sans-serif';
    ctx.fillStyle = "#555";
    ctx.fillText("শুভেচ্ছাতে,", CARD_W / 2 + (photoImg ? 60 : 0), bottomY + 20);

    // Name
    const displayName = name || "JEEM";
    ctx.font = '800 56px "Noto Sans Bengali", sans-serif';
    ctx.fillStyle = GREEN;
    ctx.fillText(displayName, CARD_W / 2 + (photoImg ? 60 : 0), bottomY + 90);

    // Bottom decorative line
    ctx.strokeStyle = "rgba(30, 120, 60, 0.3)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(borderPad + 60, CARD_H - borderPad - 60);
    ctx.lineTo(CARD_W - borderPad - 60, CARD_H - borderPad - 60);
    ctx.stroke();
  }, [name, photoImg]);

  useEffect(() => {
    drawCard();
  }, [drawCard]);

  const handleGenerate = () => {
    drawCard();
    setGenerated(true);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#1a7a3a", "#fcd34d", "#f59e0b", "#ffffff", "#e8f5e9"],
    });
  };

  const downloadPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `eid-mubarak-${name || "card"}.png`;
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const downloadPDF = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { jsPDF } = await import("jspdf");
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [CARD_W, CARD_H] });
    pdf.addImage(imgData, "PNG", 0, 0, CARD_W, CARD_H);
    pdf.save(`eid-mubarak-${name || "card"}.pdf`);
  };

  const shareWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent("ঈদ মোবারক! 🌙✨ Check out my Eid greeting card!")}`, "_blank");
  };

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent("ঈদ মোবারক! 🌙✨")}`, "_blank");
  };

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #e8f5e9 0%, #fdf6e3 50%, #e8f5e9 100%)" }}>
      {/* Header */}
      <header className="text-center py-8 px-4">
        <h1
          className="text-4xl md:text-5xl font-bold tracking-tight"
          style={{ color: DARK_GREEN, fontFamily: '"Noto Sans Bengali", sans-serif' }}
        >
          🌙 ঈদ মোবারক Card Generator
        </h1>
        <p className="mt-2 text-lg" style={{ color: "#555" }}>
          Create your personalized Eid greeting card
        </p>
      </header>

      <div className="max-w-7xl mx-auto px-4 pb-16 flex flex-col lg:flex-row gap-8 items-start">
        {/* Form */}
        <div
          className="w-full lg:w-[360px] shrink-0 rounded-2xl p-6 space-y-6"
          style={{
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(30,120,60,0.15)",
            boxShadow: "0 8px 32px rgba(30,120,60,0.08)",
          }}
        >
          {/* Name input */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: DARK_GREEN }}>
              Your Name
            </label>
            <input
              type="text"
              placeholder="JEEM"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-base outline-none transition-shadow"
              style={{
                border: `2px solid rgba(30,120,60,0.2)`,
                background: "#fff",
              }}
              onFocus={(e) => (e.target.style.borderColor = GREEN)}
              onBlur={(e) => (e.target.style.borderColor = "rgba(30,120,60,0.2)")}
            />
          </div>

          {/* Photo upload */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: DARK_GREEN }}>
              Upload Your Photo
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              onChange={handlePhotoUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all active:scale-[0.97]"
              style={{
                border: `2px dashed rgba(30,120,60,0.3)`,
                color: GREEN,
                background: "rgba(232,245,233,0.5)",
              }}
            >
              <Upload size={18} />
              {photo ? "Change Photo" : "Choose Photo (JPG/PNG)"}
            </button>
            {photo && (
              <div className="mt-3 flex justify-center">
                <img
                  src={photo}
                  alt="Preview"
                  className="w-16 h-16 rounded-full object-cover"
                  style={{ border: `3px solid ${GREEN}` }}
                />
              </div>
            )}
          </div>

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white text-lg font-bold transition-all active:scale-[0.96]"
            style={{
              background: `linear-gradient(135deg, ${GREEN}, ${DARK_GREEN})`,
              boxShadow: "0 4px 16px rgba(26,122,58,0.35)",
            }}
          >
            <Sparkles size={20} />
            Generate Card
          </button>

          {/* Action buttons */}
          {generated && (
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                <button
                  onClick={downloadPNG}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all active:scale-[0.97]"
                  style={{ background: LIGHT_GREEN, color: DARK_GREEN }}
                >
                  <Download size={16} /> PNG
                </button>
                <button
                  onClick={downloadPDF}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all active:scale-[0.97]"
                  style={{ background: LIGHT_GREEN, color: DARK_GREEN }}
                >
                  <Download size={16} /> PDF
                </button>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={shareWhatsApp}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all active:scale-[0.97]"
                  style={{ background: "#25D366" }}
                >
                  <Share2 size={16} /> WhatsApp
                </button>
                <button
                  onClick={shareFacebook}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all active:scale-[0.97]"
                  style={{ background: "#1877F2" }}
                >
                  <Share2 size={16} /> Facebook
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Canvas preview */}
        <div className="flex-1 flex justify-center">
          <div
            className="rounded-2xl overflow-hidden w-full"
            style={{
              maxWidth: 500,
              boxShadow: "0 12px 48px rgba(30,120,60,0.12)",
              border: "1px solid rgba(30,120,60,0.1)",
            }}
          >
            <canvas
              ref={canvasRef}
              className="w-full h-auto block"
              style={{ background: CREAM }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Helpers
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
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

function drawCornerDecor(ctx: CanvasRenderingContext2D, x: number, y: number, angle: number) {
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
}

function drawCrescent(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = GREEN;
  ctx.beginPath();
  ctx.arc(x, y, 35, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = CREAM;
  ctx.beginPath();
  ctx.arc(x + 14, y - 6, 30, 0, Math.PI * 2);
  ctx.fill();

  // Star
  ctx.fillStyle = GREEN;
  drawStar(ctx, x + 18, y + 2, 5, 10, 5);
}

function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerR: number, innerR: number) {
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

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
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

export default EidCard;
