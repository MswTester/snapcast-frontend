import React from "react";
import styled from "@emotion/styled";
import { ApplySpacingProps, ApplySizeProps, ApplyLayoutProps, ApplyPositionProps, ApplyStyleProps, ApplyTransformProps, ApplyAnimationProps } from "../../../css";
import type { SpacingProps, SizeProps, LayoutProps, PositionProps, StyleProps, TransformProps, AnimationProps } from "../../../types";
import type { ThemeIncludes } from "../../../themes/types";

interface VStackProps extends SpacingProps, SizeProps, LayoutProps, PositionProps, StyleProps, TransformProps, AnimationProps, ThemeIncludes {
  children?: React.ReactNode;
}

const StyledVStack = styled.div<VStackProps>`
  display: flex;
  flex-direction: column;
  
  ${ApplyPositionProps}
  ${ApplyLayoutProps}
  ${ApplySizeProps}
  ${ApplySpacingProps}
  ${ApplyTransformProps}
  ${ApplyAnimationProps}
  ${ApplyStyleProps}
`;

export const VStack: React.FC<VStackProps> = ({ children, ...props }) => {
  return <StyledVStack {...props}>{children}</StyledVStack>;
};