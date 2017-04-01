/**
 * Convert a color value 0-255 to hex 00-FF
 */
export function toColorHex(value) {
  let colorHex = value.toString(16);

  if(colorHex.length < 2) {
    colorHex = `0${colorHex}`;
  }

  return colorHex;
}