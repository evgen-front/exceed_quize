import styled from 'styled-components';

export const Background = styled.div`
  position: relative;
  background-color: black;
  height: 100%;
  min-height: 100vh;
  padding: 140px 20px 40px;
  z-index: 1;
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
  border: 1px solid ${({ isTrue }) => (isTrue ? '#10B981' : '#EF4444')};
  background-color: ${({ isTrue }) => (isTrue ? '#E4F2EB' : '#FBE6E6')};
`;
