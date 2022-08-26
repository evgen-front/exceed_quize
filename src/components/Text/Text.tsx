import { ReactNode, FC } from 'react';
import styled from 'styled-components';

interface StyledPProps {
  color?: string;
  fontSize?: string;
  fontStyle?: string;
  fontWeight?: string;
  textOverflow?: string;
  overflow?: string;
  textAlign?: string;
  lineClamp?: string;
  boxOrient?: string;
  display?: string;
  textTransform?: string;
  textDecoration?: string;
  center?: boolean;
}

interface StyledSpanProps {
  color?: string;
  fontSize?: string;
  fontStyle?: string;
  fontWeight?: string;
  textOverflow?: string;
  overflow?: string;
  textAlign?: string;
  lineClamp?: string;
  boxOrient?: string;
  display?: string;
  textTransform?: string;
  textDecoration?: string;
  center?: boolean;
}

interface TextProps {
  children: ReactNode;
  color?: string;
  fontSize?: string;
  fontStyle?: string;
  fontWeight?: string;
  textOverflow?: string;
  overflow?: string;
  textAlign?: string;
  lineClamp?: string;
  boxOrient?: string;
  display?: string;
  textTransform?: string;
  textDecoration?: string;
  asSpan?: boolean;
  center?: boolean;
}

const StyledP = styled.p<StyledPProps>`
  margin: 0;
  ${({ color }) => (color ? `color: ${color};` : '')}
  ${({ fontSize }) => (fontSize ? `font-size: ${fontSize};` : '')}
  ${({ fontStyle }) => (fontStyle ? `font-style: ${fontStyle};` : '')}
  ${({ fontWeight }) => (fontWeight ? `font-weight: ${fontWeight};` : '')}
  ${({ textOverflow }) => (textOverflow ? `text-overflow: ${textOverflow};` : '')}
  ${({ overflow }) => (overflow ? `overflow: ${overflow};` : '')}
  ${({ textAlign }) => (textAlign ? `text-align: ${textAlign};` : '')}
  ${({ lineClamp }) => (lineClamp ? `-webkit-line-clamp: ${lineClamp};` : '')}
  ${({ boxOrient }) => (boxOrient ? `-webkit-box-orient: ${boxOrient};` : '')}
  ${({ display }) => (display ? `display: ${display};` : '')}
  ${({ textTransform }) => (textTransform ? `text-transform: ${textTransform};` : '')}
  ${({ textDecoration }) => (textDecoration ? `text-decoration: ${textDecoration};` : '')}
  ${({ center }) => (center ? `text-align: center;` : '')}
`;

const StyledSpan = styled.span<StyledSpanProps>`
  margin: 0;
  ${({ color }) => (color ? `color: ${color};` : '')}
  ${({ fontSize }) => (fontSize ? `font-size: ${fontSize};` : '')}
  ${({ fontStyle }) => (fontStyle ? `font-style: ${fontStyle};` : '')}
  ${({ fontWeight }) => (fontWeight ? `font-weight: ${fontWeight};` : '')}
  ${({ textOverflow }) => (textOverflow ? `text-overflow: ${textOverflow};` : '')}
  ${({ overflow }) => (overflow ? `overflow: ${overflow};` : '')}
  ${({ textAlign }) => (textAlign ? `text-align: ${textAlign};` : '')}
  ${({ lineClamp }) => (lineClamp ? `-webkit-line-clamp: ${lineClamp};` : '')}
  ${({ boxOrient }) => (boxOrient ? `-webkit-box-orient: ${boxOrient};` : '')}
  ${({ display }) => (display ? `display: ${display};` : '')}
  ${({ textTransform }) => (textTransform ? `text-transform: ${textTransform};` : '')}
  ${({ textDecoration }) => (textDecoration ? `text-decoration: ${textDecoration};` : '')}
  ${({ center }) => (center ? `text-align: center;` : '')}
`;

export const Text: FC<TextProps> = ({
  children,
  color,
  fontWeight,
  fontStyle,
  fontSize,
  textOverflow,
  overflow,
  textAlign,
  display,
  lineClamp,
  boxOrient,
  textDecoration,
  textTransform,
  asSpan = false,
  center = false,
}) => {
  return asSpan ? (
    <StyledSpan
      textOverflow={textOverflow}
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      fontStyle={fontStyle}
      overflow={overflow}
      textAlign={textAlign}
      display={display}
      lineClamp={lineClamp}
      boxOrient={boxOrient}
      textDecoration={textDecoration}
      textTransform={textTransform}
      center={center}
    >
      {children}
    </StyledSpan>
  ) : (
    <StyledP
      textOverflow={textOverflow}
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      fontStyle={fontStyle}
      overflow={overflow}
      textAlign={textAlign}
      display={display}
      lineClamp={lineClamp}
      boxOrient={boxOrient}
      textTransform={textTransform}
      textDecoration={textDecoration}
      center={center}
    >
      {children}
    </StyledP>
  );
};
