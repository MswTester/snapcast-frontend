import React from "react";
import styled from "@emotion/styled";
import { ApplySpacingProps, ApplySizeProps, ApplyLayoutProps, ApplyPositionProps, ApplyStyleProps, ApplyTransformProps, ApplyAnimationProps } from "../../../css";
import { css } from "@emotion/react";
import type { EventProps, SpacingProps, SizeProps, LayoutProps, PositionProps, StyleProps, TransformProps, AnimationProps } from "../../../types";
import type { ThemeIncludes } from "../../../themes/types";

interface VStackProps extends EventProps, SpacingProps, SizeProps, LayoutProps, PositionProps, StyleProps, TransformProps, AnimationProps, ThemeIncludes {
  children?: React.ReactNode;
  justify?: string;
  items?: string;
  scrollable?: boolean;
  style?: any;
}

const StyledVStack = styled.div<VStackProps>`
  display: flex;
  flex-direction: column;
  justify-content: ${props => props.justify || 'flex-start'} !important;
  align-items: ${props => props.items || 'flex-start'} !important;
  ${props => props.scrollable ? 'overflow-y: auto' : ''}
  
  ${ApplyPositionProps}
  ${ApplyLayoutProps}
  ${ApplySizeProps}
  ${ApplySpacingProps}
  ${ApplyTransformProps}
  ${ApplyAnimationProps}
  ${ApplyStyleProps}
  ${props => props.style ? css`${props.style}` : css``}
`;

export const VStack: React.FC<VStackProps> = ({ children, ...props }) => {
  return <StyledVStack {...props}
    onClick={props.onClick}
    onTouchStart={props.onTouchStart}
    onTouchMove={props.onTouchMove}
    onTouchEnd={props.onTouchEnd}
    onTouchCancel={props.onTouchCancel}
    onMouseEnter={props.onMouseEnter}
    onMouseLeave={props.onMouseLeave}
  >
    {children}
  </StyledVStack>;
};