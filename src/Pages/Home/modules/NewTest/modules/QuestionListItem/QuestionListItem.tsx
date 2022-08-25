import { FC } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { QuestionService } from 'api/services/QuestionService';
import { Box, Space, Text } from 'components';
import { QuestionResponse } from 'types';

import { RiPencilFill, RiCloseFill } from 'react-icons/ri';
import { BoxWithEllipsis } from './styled';
import { colors } from 'consts';

interface QuestionListItemProps {
  question: QuestionResponse;
  index: number;
  handleOpenSubDrawer: (question: QuestionResponse, index: number) => void;
  testId: number;
}

export const QuestionListItem: FC<QuestionListItemProps> = ({
  question,
  index,
  handleOpenSubDrawer,
  testId,
}) => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteQuestion } = useMutation(
    'deleteQuestion',
    ({ testId, questionId }: { testId: number; questionId: number }) =>
      QuestionService.deleteQuestion(testId, questionId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('testList');
      },
    }
  );

  return (
    <Box
      key={question.id}
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      mb={33.5}
    >
      <Text fontSize={16} fontWeight={600}>
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
        <RiCloseFill
          size={25}
          color={colors.GREY}
          onClick={() => deleteQuestion({ testId, questionId: question.id })}
        />
      </Box>
    </Box>
  );
};
