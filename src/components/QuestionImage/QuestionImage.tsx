import { FC } from 'react';
import styled from 'styled-components';

interface QuestionImageProps {
  src: string | null;
  onError?: (e?: any) => void;
  onLoad?: (e?: any) => void;
}

const StyledImage = styled.img`
  height: 120px;
  width: 120px;
  border-radius: 8px;
  object-fit: cover;
`;

export const QuestionImage: FC<QuestionImageProps> = ({ src, onError, onLoad }) => {
  return <StyledImage src={src || ''} alt='image' onError={onError} onLoad={onLoad} />;
};
