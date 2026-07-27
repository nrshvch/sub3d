export function createPalette16Bit() {
  const palette = new Array(65536);
  for (let i = 0; i < 65536; i++) {
    // Extract the 5-6-5 bits
    // RRRRR GGGGGG BBBBB
    const r5 = (i >> 11) & 0x1f;
    const g6 = (i >> 5) & 0x3f;
    const b5 = i & 0x1f;

    // Scale to 8-bit (0-255)
    // Using (n << bitShift) | (n >> compensation) for accurate scaling
    const r8 = (r5 << 3) | (r5 >> 2);
    const g8 = (g6 << 2) | (g6 >> 4);
    const b8 = (b5 << 3) | (b5 >> 2);

    // Format as #RRGGBB
    // canvas fillStyle is faster with hex color.
    // also, hex color strings are of consistent length
    // this enables low level js array optimization
    palette[i] = "#" + 
      (r8 < 16 ? "0" : "") + r8.toString(16) +
      (g8 < 16 ? "0" : "") + g8.toString(16) +
      (b8 < 16 ? "0" : "") + b8.toString(16);
  }
  return palette;
}

export const PALETTE_16BIT = createPalette16Bit();
