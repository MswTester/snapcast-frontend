import React from "react";
import styled from "@emotion/styled";
import { ApplySpacingProps, ApplySizeProps, ApplyLayoutProps, ApplyPositionProps, ApplyStyleProps, ApplyTransformProps, ApplyAnimationProps } from "../../../css";
import type { EventProps, SpacingProps, SizeProps, LayoutProps, PositionProps, StyleProps, TransformProps, AnimationProps } from "../../../types";
import type { ThemeIncludes } from "../../../themes/types";

interface HStackProps extends EventProps, SpacingProps, SizeProps, LayoutProps, PositionProps, StyleProps, TransformProps, AnimationProps, ThemeIncludes {
  children?: React.ReactNode;
  justify?: string;
  items?: string;
  style?: React.CSSProperties;
}

const StyledHStack = styled.div<HStackProps>`
  display: flex;
  flex-direction: row;
  justify-content: ${props => props.justify || 'flex-start'} !important;
  align-items: ${props => props.items || 'stretch'} !important;
  
  ${ApplyPositionProps}
  ${ApplyLayoutProps}
  ${ApplySizeProps}
  ${ApplySpacingProps}
  ${ApplyTransformProps}
  ${ApplyAnimationProps}
  ${ApplyStyleProps}
  ${props => props.style ? Object.entries(props.style).map(([key, value]) => `${key}: ${value};`).join('\n') : ''}
`;

export const HStack: React.FC<HStackProps> = ({ children, ...props }) => {
  return <StyledHStack {...props}
    onClick={props.onClick}
    onTouchStart={props.onTouchStart}
    onTouchMove={props.onTouchMove}
    onTouchEnd={props.onTouchEnd}
    onMouseEnter={props.onMouseEnter}
    onMouseLeave={props.onMouseLeave}
  >
    {children}
  </StyledHStack>;
};