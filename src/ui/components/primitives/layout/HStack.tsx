import React from "react";
import styled from "@emotion/styled";
import { ApplySpacingProps, ApplySizeProps, ApplyLayoutProps, ApplyPositionProps, ApplyStyleProps, ApplyTransformProps, ApplyAnimationProps } from "../../../css";
import type { SpacingProps, SizeProps, LayoutProps, PositionProps, StyleProps, TransformProps, AnimationProps } from "../../../types";
import type { ThemeIncludes } from "../../../themes/types";

interface HStackProps extends SpacingProps, SizeProps, LayoutProps, PositionProps, StyleProps, TransformProps, AnimationProps, ThemeIncludes {
  children?: React.ReactNode;
  justify?: string;
  items?: string;
}

const StyledHStack = styled.div<HStackProps>`
  display: flex;
  flex-direction: row;
  justify-content: ${props => props.justify || 'flex-start'} !important;
  align-items: ${props => props.items || 'flex-start'} !important;
  
  ${ApplyPositionProps}
  ${ApplyLayoutProps}
  ${ApplySizeProps}
  ${ApplySpacingProps}
  ${ApplyTransformProps}
  ${ApplyAnimationProps}
  ${ApplyStyleProps}
`;

export const HStack: React.FC<HStackProps> = ({ children, ...props }) => {
  return <StyledHStack {...props}>{children}</StyledHStack>;
};