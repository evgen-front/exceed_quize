import styled from 'styled-components';

export interface WrapperProps {
  margin?: string;
  width?: string;
  height?: string;
  display?: string;
  alignItems?: string;
  alignSelf?: string;
  justifySelf?: string;
  justifyContent?: string;
  position?: string;
  padding?: string;
  overflow?: string;
  overflowX?: string;
  overflowY?: string;
  opacity?: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  zIndex?: string;
  maxHeight?: string;
  minHeight?: string;
  maxWidth?: string;
  minWidth?: string;
  boxShadow?: string;
  flexShrink?: string;
  flexDirection?: string;
  flexGrow?: string;
  flexBasis?: string;
  flexWrap?: string;
  borderBottom?: string;
  borderTop?: string;
  borderLeft?: string;
  borderRight?: string;
  verticalAlign?: string;
  cursor?: string;
  float?: string;
  backGround?: string;
  borderRadius?: string;
  border?: string;
  transform?: string;
  withFadeIn?: boolean;
  withAppearanceDelay?: boolean;
  rowGap?: string;
  columnGap?: string;
  whiteSpace?: string;
  overflowWrap?: string;
  flex?: string;
  fontSize?: string;
  textTransform?: string;
  textAlign?: string;
  transition?: string;
  breakPoints?: string[] | number[];
  _hover?: string;
}

export const Wrapper = styled.section<WrapperProps>`
  ${({ margin }) => (margin ? `margin: ${margin};` : '')}
  ${({ padding }) => (padding ? `padding: ${padding};` : '')}
  ${({ display }) => (display ? `display: ${display};` : '')}
  ${({ alignItems }) => (alignItems ? `align-items: ${alignItems};` : '')}
  ${({ alignSelf }) => (alignSelf ? `align-self: ${alignSelf};` : '')}
  ${({ justifySelf }) => (justifySelf ? `justify-self: ${justifySelf};` : '')}
  ${({ width }) => (width ? `width: ${width};` : '')}
  ${({ height }) => (height ? `height: ${height};` : '')}
  ${({ verticalAlign }) => (verticalAlign ? `vertical-align: ${verticalAlign};` : '')}
  ${({ justifyContent }) => (justifyContent ? `justify-content: ${justifyContent};` : '')}
  ${({ fontSize }) => (fontSize ? `font-size: ${fontSize};` : '')}
  ${({ position }) => (position ? `position: ${position};` : '')}
  ${({ overflow }) => (overflow ? `overflow: ${overflow};` : '')}
  ${({ overflowX }) => (overflowX ? `overflow-x: ${overflowX};` : '')}
  ${({ overflowY }) => (overflowY ? `overflow-y: ${overflowY};` : '')}
  ${({ opacity }) => (opacity ? `opacity: ${opacity};` : '')}
  ${({ backGround }) => (backGround ? `background: ${backGround};` : '')}
  ${({ borderRadius }) => (borderRadius ? `border-radius: ${borderRadius};` : '')}
  ${({ border }) => (border ? `border: ${border};` : '')}
  ${({ transform }) => (transform ? `transform: ${transform};` : '')}
  ${({ textTransform }) => (textTransform ? `text-transform: ${textTransform};` : '')}
  ${({ textAlign }) => (textAlign ? `text-align: ${textAlign};` : '')}
  ${({ whiteSpace }) => (whiteSpace ? `white-space: ${whiteSpace};` : '')}
  ${({ overflowWrap }) => (overflowWrap ? `overflow-wrap: ${overflowWrap};` : '')}
  
  

  ${({ top }) => (top ? `top: ${top};` : '')}
  ${({ bottom }) => (bottom ? `bottom: ${bottom};` : '')}
  ${({ left }) => (left ? `left: ${left};` : '')}
  ${({ right }) => (right ? `right: ${right};` : '')}
  ${({ zIndex }) => (zIndex ? `z-index: ${zIndex};` : '')}
  ${({ maxHeight }) => (maxHeight ? `max-height: ${maxHeight};` : '')}
  ${({ minHeight }) => (minHeight ? `min-height: ${minHeight};` : '')}
  ${({ maxWidth }) => (maxWidth ? `max-width: ${maxWidth};` : '')}
  ${({ minWidth }) => (minWidth ? `min-width: ${minWidth};` : '')}
  ${({ boxShadow }) => (boxShadow ? `box-shadow: ${boxShadow};` : '')}
  ${({ flexShrink }) => (flexShrink ? `flex-shrink: ${flexShrink};` : '')}
  ${({ flexGrow }) => (flexGrow ? `flex-grow: ${flexGrow};` : '')}
  ${({ flexBasis }) => (flexBasis ? `flex-basis: ${flexBasis};` : '')}
  ${({ flexWrap }) => (flexWrap ? `flex-wrap: ${flexWrap};` : '')}
  ${({ columnGap }) => (columnGap ? `column-gap: ${columnGap};` : '')}
  ${({ rowGap }) => (rowGap ? `row-gap: ${rowGap};` : '')}
  ${({ flexDirection }) => (flexDirection ? `flex-direction: ${flexDirection};` : '')}
  ${({ borderBottom }) => (borderBottom ? `border-bottom: ${borderBottom};` : '')}
  ${({ borderTop }) => (borderTop ? `border-top: ${borderTop};` : '')}
  ${({ borderLeft }) => (borderLeft ? `border-left: ${borderLeft};` : '')}
  ${({ borderRight }) => (borderRight ? `border-right: ${borderRight};` : '')}
  ${({ cursor }) => (cursor ? `cursor: ${cursor};` : '')}
  ${({ float }) => (float ? `float: ${float};` : '')}
  ${({ flex }) => (flex ? `flex: ${flex};` : '')}
  ${({ transition }) => (transition ? `transition: ${transition};` : '')}
`;
