import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';

import { SessionService } from 'api/services/SessionService';
import { Box, Button, Text } from 'components';
import { useAnswers } from 'hooks';

import { SessionLayout } from 'Layouts/MainView/SessionLayout';
import { AnswerResponse, QuestionResponse } from 'types';
import { PaginationBullet, AnswerItem } from './styled';

type SessionPageParams = {
  testId: string;
};

export const Session = () => {
  const { testId } = useParams<SessionPageParams>();
  const [selectedAnswer, setSelectedAnswer] = useState<null | AnswerResponse>(null);
  const [rightAnswers, setRightAnsers] = useState(0);
  const [countAnswers, setCountAnswers] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const { isLoading: isSessionDataLoading, data: sessionData } = useQuery(
    'createSession',
    () => SessionService.createSession(Number(testId)),
    {
      select: ({ data }) => {
        const sortedQuestions = data.questions.sort((a, b) => a.ordering - b.ordering);
        const result: {
          questions: QuestionResponse[];
          sessionId: number;
        } = { questions: sortedQuestions || [], sessionId: data.id };

        return result;
      },
      enabled: !!testId,
    }
  );

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

  const { mutateAsync: createUserAnswerAsync } = useMutation(
    'createUserAnswer',
    (answer_id: number) => SessionService.createUserAnswer(sessionId!, { answer_id })
  );

  const handleNext = () => {
    if (selectedAnswer) {
      createUserAnswerAsync(selectedAnswer?.id);
    }

    if (selectedAnswer?.is_true) {
      setRightAnsers(rightAnswers + 1);
      setSelectedAnswer(null);
    }

    if (questionIndexState.currentQuestionIndex === questions.length - 1) {
      setIsComplete(true);
      return;
    }
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
        <Box backgroundColor='#F2F3F4' height={240} style={{ textAlign: 'center' }}>
          <img
            height={240}
            src={`http://localhost/tests/${testId}/questions/${currentQuestion.id}/images/`}
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
                onClick={() => setSelectedAnswer(answer)}
                selected={selectedAnswer?.id === answer.id}
              >
                {answer.text}
              </AnswerItem>
            ))
          )}
        </Box>
      </Box>
      <Button
        disabled={!selectedAnswer || isNextQuestionAnswersLoading}
        onClick={handleNext}
      >
        {questionIndexState.currentQuestionIndex + 1 === questions.length
          ? 'Завершить'
          : 'Следующий вопрос'}
      </Button>
    </SessionLayout>
  );
};
