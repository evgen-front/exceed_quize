import React, { FC } from 'react';
import styled from 'styled-components';

interface QuestionImageProps {
  src: string | null;
}

const StyledImage = styled.img`
  height: 120px;
  width: 120px;
  border-radius: 8px;
  object-fit: cover;
`;

export const QuestionImage: FC<QuestionImageProps> = ({ src }) => {
  return <StyledImage src={src || ''} alt='image' />;
};
