import styled from 'styled-components';
import { colors } from 'consts';

export const Background = styled.div`
  position: relative;
  background-color: black;
  height: 100%;
  min-height: 100vh;
  padding: 20px 20px 50px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ResultCard = styled.div`
  position: relative;
  padding: 60px 20px 30px;
  min-height: 566px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  max-height: 600px;

  &::after,
  &::before {
    content: '';
    position: absolute;
    display: block;
    height: 100px;
    border-radius: 15px;
  }

  &::after {
    bottom: -20px;
    left: 20px;
    right: 20px;
    z-index: -1;
    background-color: #8f9197;
  }

  &::before {
    bottom: -40px;
    left: 40px;
    right: 40px;
    z-index: -2;
    background-color: #525457;
  }
`;

interface ResultItemsProps {
  isTrue: boolean;
}

export const ResultItem = styled.div<ResultItemsProps>`
  position: relative;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${({ isTrue }) => (isTrue ? colors.GREEN : colors.DANGER)};
  background-color: ${({ isTrue }) => (isTrue ? '#E4F2EB' : '#FBE6E6')};
`;
