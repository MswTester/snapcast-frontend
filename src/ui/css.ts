import { css } from "@emotion/react";
import type { SpacingProps, SizeProps, LayoutProps, PositionProps, StyleProps, TransformProps, AnimationProps } from "./types";
import { parseSize, parseColor } from "./utils";
import type { ThemeIncludes } from "./themes/types";

export const ApplySpacingProps = (props: SpacingProps & ThemeIncludes) => {
  const styles: string[] = [];
  
  if (props.p) styles.push(`padding: ${parseSize(props.p, props.theme)}`);
  if (props.pt) styles.push(`padding-top: ${parseSize(props.pt, props.theme)}`);
  if (props.pr) styles.push(`padding-right: ${parseSize(props.pr, props.theme)}`);
  if (props.pb) styles.push(`padding-bottom: ${parseSize(props.pb, props.theme)}`);
  if (props.pl) styles.push(`padding-left: ${parseSize(props.pl, props.theme)}`);
  if (props.ph) {
    const size = parseSize(props.ph, props.theme);
    styles.push(`padding-left: ${size}`, `padding-right: ${size}`);
  }
  if (props.pv) {
    const size = parseSize(props.pv, props.theme);
    styles.push(`padding-top: ${size}`, `padding-bottom: ${size}`);
  }
  if (props.m) styles.push(`margin: ${parseSize(props.m, props.theme)}`);
  if (props.mt) styles.push(`margin-top: ${parseSize(props.mt, props.theme)}`);
  if (props.mr) styles.push(`margin-right: ${parseSize(props.mr, props.theme)}`);
  if (props.mb) styles.push(`margin-bottom: ${parseSize(props.mb, props.theme)}`);
  if (props.ml) styles.push(`margin-left: ${parseSize(props.ml, props.theme)}`);
  if (props.gap) styles.push(`gap: ${parseSize(props.gap, props.theme)}`);
  if (props.r) styles.push(`border-radius: ${parseSize(props.r, props.theme)}`);
  
  return styles.length ? css`${styles.join('; ')};` : css``;
}

export const ApplySizeProps = (props: SizeProps & ThemeIncludes) => {
  const styles: string[] = [];
  
  if (props.w) styles.push(`width: ${parseSize(props.w, props.theme)}`);
  if (props.h) styles.push(`height: ${parseSize(props.h, props.theme)}`);
  if (props.minw) styles.push(`min-width: ${parseSize(props.minw, props.theme)}`);
  if (props.minh) styles.push(`min-height: ${parseSize(props.minh, props.theme)}`);
  if (props.maxw) styles.push(`max-width: ${parseSize(props.maxw, props.theme)}`);
  if (props.maxh) styles.push(`max-height: ${parseSize(props.maxh, props.theme)}`);
  
  return styles.length ? css`${styles.join('; ')};` : css``;
}

export const ApplyLayoutProps = (props: LayoutProps & ThemeIncludes) => {
  if (!props.row && !props.col) return css``;
  
  const styles: string[] = ['display: flex'];
  
  if (props.row) {
    styles.push('flex-direction: row');
  } else if (props.col) {
    styles.push('flex-direction: column');
  }
  
  const justifyContent = props.justifyStart ? "flex-start" 
    : props.justifyEnd ? "flex-end" 
    : props.justifyCenter ? "center" 
    : props.justifyBetween ? "space-between" 
    : props.justifyAround ? "space-around" 
    : props.justifyEvenly ? "space-evenly" 
    : null;
  
  if (justifyContent) {
    styles.push(`justify-content: ${justifyContent}`);
  }
  
  const alignItems = props.itemsStart ? "flex-start" 
    : props.itemsEnd ? "flex-end" 
    : props.itemsCenter ? "center" 
    : props.itemsBaseline ? "baseline" 
    : props.itemsStretch ? "stretch" 
    : null;
  
  if (alignItems) {
    styles.push(`align-items: ${alignItems}`);
  }
  
  if (props.wrap) {
    styles.push('flex-wrap: wrap');
  }

  if (props.flex != undefined) {
    styles.push(`flex: ${props.flex}`);
  }
  
  return css`${styles.join('; ')};`;
}

export const ApplyPositionProps = (props: PositionProps & ThemeIncludes) => {
  const styles: string[] = [];
  
  if (props.absolute) styles.push('position: absolute');
  if (props.relative) styles.push('position: relative');
  if (props.fixed) styles.push('position: fixed');
  if (props.sticky) styles.push('position: sticky');
  if (props.t) styles.push(`top: ${parseSize(props.t, props.theme)}`);
  if (props.r) styles.push(`right: ${parseSize(props.r, props.theme)}`);
  if (props.b) styles.push(`bottom: ${parseSize(props.b, props.theme)}`);
  if (props.l) styles.push(`left: ${parseSize(props.l, props.theme)}`);
  if (props.zIdx) styles.push(`z-index: ${props.zIdx}`);
  
  return styles.length ? css`${styles.join('; ')};` : css``;
}

export const ApplyStyleProps = (props: StyleProps & ThemeIncludes) => {
  const styles: string[] = [];
  
  if (props.textColor) styles.push(`color: ${parseColor(props.textColor, props.theme)}`);
  if (props.bgColor) styles.push(`background-color: ${parseColor(props.bgColor, props.theme)}`);
  if (props.borderColor) styles.push(`border-color: ${parseColor(props.borderColor, props.theme)}`);
  if (props.borderWidth) styles.push(`border-width: ${parseSize(props.borderWidth, props.theme)}`);
  
  return styles.length ? css`${styles.join('; ')};` : css``;
}
  
export const ApplyTransformProps = (props: TransformProps & ThemeIncludes) => {
  const transforms: string[] = [];
  
  if (props.x || props.y) {
    const x = props.x ? parseSize(props.x, props.theme) : '0';
    const y = props.y ? parseSize(props.y, props.theme) : '0';
    transforms.push(`translate(${x}, ${y})`);
  }
  if (props.rotate) transforms.push(`rotate(${parseSize(props.rotate, props.theme)})`);
  if (props.rotateX) transforms.push(`rotateX(${parseSize(props.rotateX, props.theme)})`);
  if (props.rotateY) transforms.push(`rotateY(${parseSize(props.rotateY, props.theme)})`);
  if (props.rotateZ) transforms.push(`rotateZ(${parseSize(props.rotateZ, props.theme)})`);
  if (props.scale) transforms.push(`scale(${parseSize(props.scale, props.theme)})`);
  if (props.scaleX) transforms.push(`scaleX(${parseSize(props.scaleX, props.theme)})`);
  if (props.scaleY) transforms.push(`scaleY(${parseSize(props.scaleY, props.theme)})`);
  if (props.skew) transforms.push(`skew(${parseSize(props.skew, props.theme)})`);
  if (props.skewX) transforms.push(`skewX(${parseSize(props.skewX, props.theme)})`);
  if (props.skewY) transforms.push(`skewY(${parseSize(props.skewY, props.theme)})`);
  
  return transforms.length ? css`transform: ${transforms.join(' ')};` : css``;
}

export const ApplyAnimationProps = (props: AnimationProps & ThemeIncludes) => {
  const styles: string[] = [];
  
  if (props.duration) styles.push(`animation-duration: ${parseSize(props.duration, props.theme)}`);
  if (props.delay) styles.push(`animation-delay: ${parseSize(props.delay, props.theme)}`);
  if (props.easing) styles.push(`animation-timing-function: ${props.easing}`);
  if (props.iterationCount) styles.push(`animation-iteration-count: ${props.iterationCount}`);
  if (props.direction) styles.push(`animation-direction: ${props.direction}`);
  if (props.fillMode) styles.push(`animation-fill-mode: ${props.fillMode}`);
  
  return styles.length ? css`${styles.join('; ')};` : css``;
}
