import { useState, useRef, useEffect, useCallback } from "react";
import { Download, Share2, Upload, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { cardDesigns, CARD_W, CARD_H } from "@/lib/eid-card-designs";

const EidCard = () => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoImg, setPhotoImg] = useState<HTMLImageElement | null>(null);
  const [generated, setGenerated] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState(cardDesigns[0].id);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fontLoaded = useRef(false);

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

    const design = cardDesigns.find((d) => d.id === selectedDesign) || cardDesigns[0];
    design.draw(ctx, canvas, name, photoImg);
  }, [name, photoImg, selectedDesign]);

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
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent("ঈদ মোবারক! 🌙✨ Check out my Eid greeting card!")}`,
      "_blank"
    );
  };

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent("ঈদ মোবারক! 🌙✨")}`,
      "_blank"
    );
  };

  const currentDesign = cardDesigns.find((d) => d.id === selectedDesign) || cardDesigns[0];

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(135deg, #e8f5e9 0%, #fdf6e3 50%, #e8f5e9 100%)" }}
    >
      <header className="text-center py-8 px-4">
        <h1
          className="text-4xl md:text-5xl font-bold tracking-tight"
          style={{ color: "#145a2c", fontFamily: '"Noto Sans Bengali", sans-serif' }}
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
          className="w-full lg:w-[380px] shrink-0 rounded-2xl p-6 space-y-6"
          style={{
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(30,120,60,0.15)",
            boxShadow: "0 8px 32px rgba(30,120,60,0.08)",
          }}
        >
          {/* Design Selector */}
          <div>
            <label className="block text-sm font-semibold mb-3" style={{ color: "#145a2c" }}>
              Choose Design
            </label>
            <div className="grid grid-cols-2 gap-3">
              {cardDesigns.map((design) => (
                <button
                  key={design.id}
                  onClick={() => setSelectedDesign(design.id)}
                  className="relative rounded-xl p-3 text-left transition-all active:scale-[0.97]"
                  style={{
                    border:
                      selectedDesign === design.id
                        ? `2.5px solid ${design.previewColors[0]}`
                        : "2px solid rgba(0,0,0,0.08)",
                    background:
                      selectedDesign === design.id
                        ? `linear-gradient(135deg, ${design.previewColors[1]}, white)`
                        : "white",
                    boxShadow:
                      selectedDesign === design.id
                        ? `0 2px 12px ${design.previewColors[0]}25`
                        : "0 1px 4px rgba(0,0,0,0.04)",
                  }}
                >
                  {/* Color preview dots */}
                  <div className="flex gap-1.5 mb-2">
                    {design.previewColors.map((color, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 rounded-full"
                        style={{
                          background: color,
                          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.15)",
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-xs font-semibold" style={{ color: design.previewColors[0] }}>
                    {design.name}
                  </div>
                  <div className="text-[10px] text-gray-500">{design.nameEn}</div>
                  {selectedDesign === design.id && (
                    <div
                      className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                      style={{ background: design.previewColors[0] }}
                    >
                      ✓
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Name input */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#145a2c" }}>
              Your Name
            </label>
            <input
              type="text"
              placeholder="JEEM"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-base outline-none transition-shadow"
              style={{ border: "2px solid rgba(30,120,60,0.2)", background: "#fff" }}
              onFocus={(e) => (e.target.style.borderColor = currentDesign.previewColors[0])}
              onBlur={(e) => (e.target.style.borderColor = "rgba(30,120,60,0.2)")}
            />
          </div>

          {/* Photo upload */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#145a2c" }}>
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
                border: "2px dashed rgba(30,120,60,0.3)",
                color: currentDesign.previewColors[0],
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
                  style={{ border: `3px solid ${currentDesign.previewColors[0]}` }}
                />
              </div>
            )}
          </div>

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white text-lg font-bold transition-all active:scale-[0.96]"
            style={{
              background: `linear-gradient(135deg, ${currentDesign.previewColors[0]}, ${currentDesign.previewColors[2]})`,
              boxShadow: `0 4px 16px ${currentDesign.previewColors[0]}55`,
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
                  style={{ background: "#e8f5e9", color: "#145a2c" }}
                >
                  <Download size={16} /> PNG
                </button>
                <button
                  onClick={downloadPDF}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all active:scale-[0.97]"
                  style={{ background: "#e8f5e9", color: "#145a2c" }}
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
              style={{ background: "#fdf6e3" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EidCard;
