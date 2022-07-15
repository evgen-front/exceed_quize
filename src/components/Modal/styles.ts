import styled, { keyframes } from 'styled-components';

const appear = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const disappear = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const slideIn = keyframes`
 from {
    transform: translateY(-30px);
  }
  to {
    transform: translateY(0);
  }
`;

export const ModalModel = styled.div<{ closing?: boolean }>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.25);
  animation-name: ${appear};
  animation-name: ${({ closing }) => (!closing ? disappear : appear)};
  animation-duration: 300ms;
`;

export const ModalContainer = styled.div`
  width: 100%;
  padding: 20px;
  max-width: 350px;
  background: white;
  position: relative;
  margin: 0 20px;
  max-height: calc(100vh - 40px);
  text-align: left;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0px 4px 20px -5px rgba(36, 36, 36, 0.16);
  border-radius: 8px;
  animation-name: ${slideIn};
  animation-duration: 0.3s;
`;

export const ModalContent = styled.div`
  display: flex;
  column-gap: 8px;
  font-size: 20px;
  line-height: 28px;
  margin-bottom: 30px;
  align-items: flex-start;
`;

export const ModalControls = styled.div`
  display: flex;
  column-gap: 20px;
`;
