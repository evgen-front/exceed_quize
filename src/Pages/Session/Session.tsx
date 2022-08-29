import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useMutation } from 'react-query';

import { Box, Button, Space, Text } from 'components';
import { useAnswers } from 'hooks';
import { API_URL } from 'api';

import { SessionLayout } from 'Layouts/MainView/SessionLayout';
import { AnswerResponse } from 'types';
import { PaginationBullet, AnswerItem } from './styled';
import { useSession } from 'hooks/useSession';
import { createUserAnswerAction } from 'api/action-creators';
import { colors } from 'consts';

export const Session = () => {
  const { testId } = useParams() as { testId: string };
  const [selectedAnswer, setSelectedAnswer] = useState<null | AnswerResponse>(null);
  const [rightAnswers, setRightAnsers] = useState(0);
  const [countAnswers, setCountAnswers] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const { isSessionDataLoading, sessionData } = useSession(Number(testId));
  const { questions, sessionId } = sessionData || { questions: [] };
  const [questionIndexState, setQuestionIndexState] = useState({
    currentQuestionIndex: 0,
    nextQuestionIndex: 1,
  });

  const currentQuestion = questions[questionIndexState.currentQuestionIndex];
  const nextQuestion = questions[questionIndexState.nextQuestionIndex];

  const { answers: currentQuestionAnswers, isLoading: isCurrentQuestionAnswersLoading } =
    useAnswers(currentQuestion?.id);

  const { isLoading: isNextQuestionAnswersLoading } = useAnswers(nextQuestion?.id);
  const { mutateAsync: createUserAnswerAsync } = useMutation(createUserAnswerAction);

  const handleNext = () => {
    if (selectedAnswer) {
      createUserAnswerAsync({ session_id: sessionId!, answer_id: selectedAnswer?.id });
    }

    if (selectedAnswer?.is_true) {
      setRightAnsers(rightAnswers + 1);
    }

    if (questionIndexState.currentQuestionIndex === questions.length - 1) {
      setIsComplete(true);
      return;
    }

    setSelectedAnswer(null);
    setCountAnswers(countAnswers + 1);

    setQuestionIndexState(({ nextQuestionIndex }) => {
      const updatedNextQuestionIndex = nextQuestionIndex + 1;
      return {
        currentQuestionIndex: nextQuestionIndex,
        nextQuestionIndex:
          updatedNextQuestionIndex < questions.length
            ? updatedNextQuestionIndex
            : nextQuestionIndex,
      };
    });
  };

  if (isSessionDataLoading) {
    return <div>Загрузка</div>;
  }

  if (isComplete) {
    return (
      <Navigate
        to='/completed'
        state={{ rightAnswers, lenght: questions?.length, sessionId }}
      />
    );
  }

  return (
    <SessionLayout>
      <Box>
        <Text fontSize={20} fontWeight={700}>
          Вопрос {questionIndexState.currentQuestionIndex + 1}
        </Text>
      </Box>
      <Box display='flex' style={{ gap: '4px' }} margin='30px 0'>
        {questions.map(({ id }, index) => (
          <PaginationBullet key={id} isComplete={countAnswers > index} />
        ))}
      </Box>
      <Text fontSize={20} fontWeight={500}>
        {currentQuestion?.text}
      </Text>
      <Box
        display='flex'
        flexDirection='column'
        flex='1 1 auto'
        marginTop={20}
        style={{ gap: 20 }}
      >
        <Box
          backgroundColor={colors.SILVERSPRINGS}
          height={240}
          style={{ textAlign: 'center' }}
        >
          <img
            height={240}
            src={`${API_URL}/tests/${testId}/questions/${currentQuestion.id}/images/`}
            alt='question_image'
          />
        </Box>
        <Box display='flex' flexDirection='column' style={{ gap: 20 }}>
          {isCurrentQuestionAnswersLoading ? (
            <div>Загрузка</div>
          ) : (
            currentQuestionAnswers &&
            currentQuestionAnswers.map((answer) => (
              <AnswerItem
                key={answer.id}
                onClick={() => {
                  if ('vibrate' in window.navigator) {
                    window.navigator.vibrate(10);
                  }
                  setSelectedAnswer(answer);
                }}
                selected={selectedAnswer?.id === answer.id}
              >
                {answer.text}
              </AnswerItem>
            ))
          )}
        </Box>
      </Box>

      <Box>
        <Space height={20} />
        <Button
          disabled={!selectedAnswer || isNextQuestionAnswersLoading}
          onClick={handleNext}
        >
          {questionIndexState.currentQuestionIndex + 1 === questions.length
            ? 'Завершить'
            : 'Следующий вопрос'}
        </Button>
      </Box>
    </SessionLayout>
  );
};
