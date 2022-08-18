import { FC } from 'react';

import { RiPencilFill, RiCloseFill } from 'react-icons/ri';
import { Box, Space, Text } from 'components';
import { colors } from 'consts';
import { BoxWithEllipsis } from './styled';

import { QuestionResponse } from 'types';

interface QuestionListItemProps {
  question: QuestionResponse;
  index: number;
  handleOpenSubDrawer: (question: QuestionResponse, index: number) => void;
}

export const QuestionListItem: FC<QuestionListItemProps> = ({
  question,
  index,
  handleOpenSubDrawer,
}) => {
  return (
    <Box
      key={question.id}
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      mb={33.5}
    >
      <Text fontSize={16} fontWeight={500}>
        Вопрос {index + 1}
      </Text>
      <BoxWithEllipsis>
        <Text fontSize={16} fontWeight={400}>
          {question.text}
        </Text>
      </BoxWithEllipsis>
      <Box display='flex' alignItems='center'>
        <RiPencilFill
          size={20}
          color={colors.GREY}
          onClick={() => handleOpenSubDrawer(question, index + 1)}
        />
        <Space width={14} />
        <RiCloseFill size={25} color={colors.GREY} />
      </Box>
    </Box>
  );
};
