import styled, { keyframes } from 'styled-components';

const darkIn = keyframes`
 from {
    background-color: rgba(0, 0, 0, 0);
  }
  to {
    background-color: rgba(0, 0, 0, 0.25);
  }
`;

const slideIn = keyframes`
 from {
    transform: translateX(100vw);
  }
  to {
    transform: translateX(0);
  }
`;

export const DrawerModel = styled.div<{ closing: boolean; isClose: boolean }>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: ${({ closing }) =>
    !closing ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.25)'};
  animation-name: ${darkIn};
  animation-duration: 0.3s;
  transform: ${({ isClose }) => (isClose ? 'translateX(100vw)' : 'translateX(0)')};
  transition: background-color 0.3s ease-in-out;
`;

export const DrawerContainer = styled.div<{ closing: boolean }>`
  width: 100vw;
  max-width: 600px;
  height: 100vh;
  padding: 35px 20px;
  background: white;
  position: relative;
  text-align: left;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation-name: ${slideIn};
  animation-duration: 0.3s;
  transform: ${({ closing }) => (!closing ? 'translateX(100vw)' : 'translateX(0)')};
  transition: transform 0.3s ease-in-out;
`;

export const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  column-gap: 8px;
  font-size: 20px;
  line-height: 28px;
  margin-bottom: 30px;
  align-items: flex-start;
`;

export const DrawerControls = styled.div`
  display: flex;
  column-gap: 20px;
  justify-content: space-between;
`;

export const DrawerHeader = styled.div`
  display: flex;
  column-gap: 20px;
  & p {
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
  }
`;

export const BackButton = styled.button`
  outline: none;
  border: none;
  background: none;
  width: 32px;
  height: 32px;
  margin-bottom: 38px;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  cursor: pointer;
`;

export const QuestionsList = styled.div`
  margin-top: 40px;
  overflow-y: auto;
  width: 100%;
`;
