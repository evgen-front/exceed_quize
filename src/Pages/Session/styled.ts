import styled from 'styled-components';
import { colors } from 'consts';

interface PaginationBulletProps {
  isComplete: boolean;
}

export const PaginationBullet = styled.span<PaginationBulletProps>`
  display: block;
  flex: 1 1 auto;
  background: ${({ isComplete }) => (isComplete ? colors.PRIMARY : colors.SILVERSPRINGS)};
  border-radius: 5px;
  height: 4px;
`;

interface AnswerItemProps {
  selected: boolean;
}

export const AnswerItem = styled.div<AnswerItemProps>`
  border-radius: 8px;
  padding: 11px 14px;
  border: 1px solid ${({ selected }) => (selected ? colors.PRIMARY : colors.GREY)};
  color: ${({ selected }) => (selected ? colors.PRIMARY : colors.SECONDARY)};
  ${({ selected }) => selected && `background: ${colors.PALEPRIMARY}`};
  cursor: pointer;
  transition: 0.2s ease-in-out;
  -webkit-tap-highlight-color: transparent;

  &:hover {
  }
`;
