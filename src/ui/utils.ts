import type { Size } from "./types";
import type { Theme } from "./themes/types";

const getThemeUnits = (theme?: Theme) => theme?.dimensions ? Object.keys(theme.dimensions) : [];
const getFontUnits = (theme?: Theme) => theme?.typography ? Object.keys(theme.typography) : [];
const getColorUnits = (theme?: Theme) => theme?.colors ? Object.keys(theme.colors) : [];
const UNIT_REGEX = /^(\d+)([a-zA-Z-]+)$/;

const parseCache = new Map<string, string>();

export const parseSize = (size?: Size, theme?: Theme): string => {
  if (!size) return "0";
  
  if (typeof size === "string") {
    const cacheKey = `${size}-${JSON.stringify(theme?.colors) || 'default'}`;
    const cached = parseCache.get(cacheKey);
    if (cached) return cached;
    
    let result: string;
    const match = size.match(UNIT_REGEX);
    
    if (match) {
      const [, num, unit] = match;
      
      if (unit && getThemeUnits(theme).includes(unit) && theme?.dimensions) {
        const spacingKey = unit as keyof typeof theme.dimensions;
        const spacingValue = theme.dimensions[spacingKey];
        if (spacingValue) {
          result = `calc(${num} * ${spacingValue})`;
        } else {
          result = `${num}${unit}`;
        }
      } else if (unit && getFontUnits(theme).includes(unit) && theme?.typography) {
        const fontValue = theme.typography[unit as keyof typeof theme.typography];
        result = fontValue?.fontSize ? `calc(${num} * ${fontValue.fontSize})` : `${num}${unit}`;
      } else {
        result = `${num}${unit}`;
      }
    } else if (getThemeUnits(theme).includes(size) && theme?.dimensions) {
      const spacingKey = size as keyof typeof theme.dimensions;
      const spacingValue = theme.dimensions[spacingKey];
      result = spacingValue || `${size}px`;
    } else if (getFontUnits(theme).includes(size) && theme?.typography) {
      const fontValue = theme.typography[size as keyof typeof theme.typography];
      result = fontValue?.fontSize || `${size}px`;
    } else {
      // Check if it's already a valid CSS value (contains units)
      const hasUnits = /\d+(px|em|rem|%|vh|vw|pt|pc|in|cm|mm|ex|ch|lh|rlh|vmin|vmax|deg|rad|turn|s|ms)$/.test(size);
      result = hasUnits ? size : `${size}px`;
    }
    
    parseCache.set(cacheKey, result);
    return result;
  }
  
  return `${size}px`;
}

export const parseColor = (color?: string, theme?: Theme): string => {
  if (!color) return "transparent";
  
  if (getColorUnits(theme).includes(color) && theme?.colors) {
    const themeColor = theme.colors[color as keyof typeof theme.colors];
    return themeColor || color;
  }
  
  return color;
}
