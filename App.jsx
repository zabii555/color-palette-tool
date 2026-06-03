import React, { useState, useRef } from 'react';
import { ChromePicker } from 'react-color';
import ColorThief from 'colorthief';
import './index.css';

export default function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [colors, setColors] = useState([]);
  const [customColor, setCustomColor] = useState('#D4AF37');
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [copiedCustom, setCopiedCustom] = useState(false);
  const fileInputRef = useRef(null);
  const imageRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          setUploadedImage(event.target.result);
          extractColors(img);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const extractColors = async (img) => {
    setLoading(true);
    try {
      const colorThief = new ColorThief();
      const palette = await colorThief.getPalette(img, 5);

      const extractedColors = palette.map((rgb) => ({
        rgb,
        hex: rgbToHex(rgb[0], rgb[1], rgb[2]),
      }));

      setColors(extractedColors);
    } catch (error) {
      console.error('Error extracting colors:', error);
      alert('Error extracting colors. Please try another image.');
    } finally {
      setLoading(false);
    }
  };

  const rgbToHex = (r, g, b) => {
    return (
      '#' +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        })
        .join('')
        .toUpperCase()
    );
  };

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const copyToClipboard = (text, index, isCustom = false) => {
    navigator.clipboard.writeText(text);
    if (isCustom) {
      setCopiedCustom(true);
      setTimeout(() => setCopiedCustom(false), 2000);
    } else {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 pt-20 pb-16 shadow-[0_25px_120px_rgba(212,175,55,0.22)] glass">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 luxury-text">
            Lexure
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Color Palette Tool
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Extract stunning color palettes from your images. Explore dominant colors, customize selections, and copy values instantly.
          </p>
        </div>
      </div>

      <section className="mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-yellow-500">✨ How to Use Chromify</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900 border border-yellow-500/20 rounded-3xl p-6 shadow-[0_20px_50px_rgba(212,175,55,0.18)] transform transition duration-300 hover:scale-[1.02]">
              <div className="text-4xl mb-4">📸</div>
              <h3 className="text-xl font-semibold text-white mb-2">Upload Image</h3>
              <p className="text-gray-300">
                Click the box above and select any image (JPG, PNG, WEBP)
              </p>
            </div>
            <div className="bg-gray-900 border border-yellow-500/20 rounded-3xl p-6 shadow-[0_20px_50px_rgba(212,175,55,0.18)] transform transition duration-300 hover:scale-[1.02]">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-white mb-2">Auto Extract</h3>
              <p className="text-gray-300">
                Tool automatically finds 5 dominant colors from your image
              </p>
            </div>
            <div className="bg-gray-900 border border-yellow-500/20 rounded-3xl p-6 shadow-[0_20px_50px_rgba(212,175,55,0.18)] transform transition duration-300 hover:scale-[1.02]">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-white mb-2">Copy & Use</h3>
              <p className="text-gray-300">
                Click Copy Hex or Copy RGB and paste anywhere
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Upload Section */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl glass hover-glow shadow-[0_25px_80px_rgba(212,175,55,0.25)] p-8 md:p-12 mb-12 border border-yellow-500 border-opacity-20 hover:border-opacity-40 transition-all duration-300">
          <div className="flex flex-col items-center">
            <svg
              className="w-16 h-16 text-yellow-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h3 className="text-2xl font-bold text-white mb-2">
              Upload Your Image
            </h3>
            <p className="text-gray-300 mb-6 text-center">
              Supported formats: JPG, PNG, WEBP (Max 10MB)
            </p>
            <button
              onClick={() => fileInputRef.current.click()}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Choose Image
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center mb-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-400 border-t-transparent"></div>
          </div>
        )}

        {/* Image Preview and Color Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Image Preview */}
          {uploadedImage && (
            <div className="bg-slate-800 rounded-xl overflow-hidden glass hover-glow shadow-[0_25px_80px_rgba(212,175,55,0.25)] border border-yellow-500 border-opacity-20">
              <img
                ref={imageRef}
                src={uploadedImage}
                alt="Uploaded"
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Extracted Colors */}
          {colors.length > 0 && (
            <div className={uploadedImage ? 'lg:col-span-2' : 'lg:col-span-3'}>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full mr-3"></span>
                Extracted Colors
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className="bg-slate-800 rounded-lg overflow-hidden glass hover-glow shadow-[0_25px_50px_rgba(212,175,55,0.18)] border border-yellow-500 border-opacity-20 hover:border-opacity-40 transition-all duration-300 transform hover:scale-105"
                  >
                    <div
                      style={{
                        backgroundColor: color.hex,
                      }}
                      className="h-24 w-full"
                    ></div>
                    <div className="p-4">
                      <p className="text-yellow-400 font-mono font-bold text-lg mb-2">
                        {color.hex}
                      </p>
                      <p className="text-gray-300 font-mono text-sm mb-4">
                        RGB({color.rgb[0]}, {color.rgb[1]}, {color.rgb[2]})
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            copyToClipboard(color.hex, index)
                          }
                          className={`flex-1 py-2 px-3 rounded font-semibold transition-all duration-300 ${
                            copiedIndex === index
                              ? 'bg-green-600 text-white'
                              : 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600'
                          }`}
                        >
                          {copiedIndex === index ? '✓ Copied' : 'Copy Hex'}
                        </button>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              `rgb(${color.rgb[0]}, ${color.rgb[1]}, ${color.rgb[2]})`,
                              index
                            )
                          }
                          className={`flex-1 py-2 px-3 rounded font-semibold transition-all duration-300 ${
                            copiedIndex === index
                              ? 'bg-green-600 text-white'
                              : 'bg-slate-700 text-yellow-400 hover:bg-slate-600'
                          }`}
                        >
                          Copy RGB
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Custom Color Picker Section */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl glass hover-glow shadow-[0_25px_80px_rgba(212,175,55,0.25)] p-8 md:p-12 border border-yellow-500 border-opacity-20">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full mr-3"></span>
            Custom Color Picker
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Color Picker */}
            <div className="flex justify-center">
              <div className="bg-slate-900 p-4 rounded-lg shadow-lg">
                <ChromePicker
                  color={customColor}
                  onChange={(color) => setCustomColor(color.hex)}
                  disableAlpha={true}
                />
              </div>
            </div>

            {/* Color Preview and Copy */}
            <div className="flex flex-col justify-center">
              <div
                style={{ backgroundColor: customColor }}
                className="h-32 rounded-lg mb-6 shadow-lg border-2 border-yellow-500 border-opacity-30"
              ></div>

              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Hex Code</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customColor}
                      readOnly
                      className="flex-1 bg-slate-900 text-yellow-400 font-mono font-bold py-2 px-4 rounded border border-yellow-500 border-opacity-30"
                    />
                    <button
                      onClick={() =>
                        copyToClipboard(customColor, null, true)
                      }
                      className={`py-2 px-6 rounded font-semibold transition-all duration-300 ${
                        copiedCustom
                          ? 'bg-green-600 text-white'
                          : 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600'
                      }`}
                    >
                      {copiedCustom ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-gray-400 text-sm mb-1">RGB Code</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={(() => {
                        const rgb = hexToRgb(customColor);
                        return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
                      })()}
                      readOnly
                      className="flex-1 bg-slate-900 text-yellow-400 font-mono font-bold py-2 px-4 rounded border border-yellow-500 border-opacity-30"
                    />
                    <button
                      onClick={() => {
                        const rgb = hexToRgb(customColor);
                        copyToClipboard(
                          `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
                          null,
                          true
                        );
                      }}
                      className={`py-2 px-6 rounded font-semibold transition-all duration-300 ${
                        copiedCustom
                          ? 'bg-green-600 text-white'
                          : 'bg-slate-700 text-yellow-400 hover:bg-slate-600'
                      }`}
                    >
                      {copiedCustom ? '✓' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-t border-yellow-500 border-opacity-20 mt-16 glass shadow-[0_25px_120px_rgba(212,175,55,0.18)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent mb-2">
              Lexure Color Palette Tool
            </h3>
            <p className="text-gray-400 mb-4">
              Professional Color Extraction & Management
            </p>
            <div className="border-t border-yellow-500 border-opacity-20 pt-6 mt-6">
              <p className="text-gray-500 text-sm">
                Developed with precision for color professionals
              </p>
              <p className="text-gray-600 text-xs mt-2">
                © 2026 Lexure. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
