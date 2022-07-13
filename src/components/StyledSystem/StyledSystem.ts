import styled from 'styled-components';
import {
  space,
  color,
  flexbox,
  flex,
  typography,
  position,
  layout,
  border,
  shadow,
  FlexboxProps,
  PositionProps,
  SpaceProps,
  ColorProps,
  TypographyProps,
  LayoutProps,
  BorderProps,
  ShadowProps,
} from 'styled-system';

export const Box = styled.div<
  | FlexboxProps
  | PositionProps
  | SpaceProps
  | ColorProps
  | LayoutProps
  | BorderProps
  | ShadowProps
>`
  ${flexbox}
  ${flex}
  ${position}
  ${color}
  ${space}
  ${layout}
  ${border}
  ${shadow}
`;

export const Text = styled.span<TypographyProps | ColorProps>`
  ${typography}
  ${color}
`;

export const Space = styled.div<LayoutProps>`
  ${layout}
`;
