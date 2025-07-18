export type Size = string | number;

export interface EventProps {
    onClick?: (e?: any) => void;
    onTouchStart?: (e?: any) => void;
    onTouchMove?: (e?: any) => void;
    onTouchEnd?: (e?: any) => void;
    onTouchCancel?: (e?: any) => void;
    onMouseEnter?: (e?: any) => void;
    onMouseLeave?: (e?: any) => void;
}

export interface SpacingProps {
  p?: Size;
  pt?: Size;
  pr?: Size;
  pb?: Size;
  pl?: Size;
  ph?: Size;
  pv?: Size;

  m?: Size;
  mt?: Size;
  mr?: Size;
  mb?: Size;
  ml?: Size;

  r?: Size;
  rt?: Size;
  rb?: Size;
  rl?: Size;
  rr?: Size;

  gap?: Size;
}

export interface SizeProps {
    w?: Size;
    h?: Size;
    minw?: Size;
    minh?: Size;
    maxw?: Size;
    maxh?: Size;
}

export interface LayoutProps {
    row?: boolean;
    col?: boolean;
    justifyStart?: boolean;
    justifyEnd?: boolean;
    justifyCenter?: boolean;
    justifyBetween?: boolean;
    justifyAround?: boolean;
    justifyEvenly?: boolean;
    itemsStart?: boolean;
    itemsEnd?: boolean;
    itemsCenter?: boolean;
    itemsBaseline?: boolean;
    itemsStretch?: boolean;
    wrap?: boolean;
    flex?: number;
}

export interface PositionProps {
    absolute?: boolean;
    relative?: boolean;
    fixed?: boolean;
    sticky?: boolean;
    t?: Size;
    r?: Size;
    b?: Size;
    l?: Size;
    zIdx?: number;
}

export interface StyleProps {
    textColor?: string;
    bgColor?: string;
    borderColor?: string;
    borderWidth?: Size;
}

export interface TransformProps {
    x?: Size;
    y?: Size;
    z?: Size;
    rotate?: Size;
    rotateX?: Size;
    rotateY?: Size;
    rotateZ?: Size;
    scale?: Size;
    scaleX?: Size;
    scaleY?: Size;
    skew?: Size;
    skewX?: Size;
    skewY?: Size;
}

export interface AnimationProps {
    duration?: Size;
    delay?: Size;
    easing?: string;
    iterationCount?: number;
    direction?: string;
    fillMode?: string;
}