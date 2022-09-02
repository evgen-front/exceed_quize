import { useCallback, useState } from 'react';
import { useParams, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

import { Box, Button, Space, Text } from 'components';
import { useAnswers, useBoolean, useInterval } from 'hooks';
import { API_URL } from 'api';

import { SessionLayout } from 'Layouts/SessionLayout';
import { AnswerResponse } from 'types';
import { PaginationBullet, AnswerItem, Timer } from './styled';
import { useSession } from 'hooks/useSession';
import { createUserAnswerAction } from 'api/action-creators';
import { RiCloseFill, RiTimeFill } from 'react-icons/ri';

import { colors } from 'consts';
import { timeCounter } from './utils/timeCounter';
import { HOME } from 'Router/routes';
import { AtentionModal } from 'Pages/Home/modules/TestListItem/utils/AtentionModal';

export const Session = () => {
  const { testId } = useParams() as { testId: string };
  const location = useLocation();
  const navigate = useNavigate();
  const locationState = location.state as { duration: number };
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
  const [timeLeft, setTimeLeft] = useState(locationState.duration);
  const [isModalOpen, { setTrue: openModal, setFalse: closeModal }] = useBoolean();

  const currentQuestion = questions[questionIndexState.currentQuestionIndex];
  const nextQuestion = questions[questionIndexState.nextQuestionIndex];

  const { answers: currentQuestionAnswers, isLoading: isCurrentQuestionAnswersLoading } =
    useAnswers(currentQuestion?.id);

  const { isLoading: isNextQuestionAnswersLoading } = useAnswers(nextQuestion?.id);
  const { mutateAsync: createUserAnswerAsync } = useMutation(createUserAnswerAction);

  const handleNext = () => {
    if (!selectedAnswer) return;

    createUserAnswerAsync({ session_id: sessionId!, answer_id: selectedAnswer?.id });

    if (selectedAnswer.is_true) {
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

  const setComplete = useCallback(() => {
    timeLeft < 2 && setIsComplete(true);
  }, [timeLeft]);

  useInterval(() => {
    setComplete();
    setTimeLeft(timeLeft - 1);
  }, 1000);

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
    <>
      <SessionLayout>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Box display='flex' alignItems='center'>
            <Timer onClick={openModal}>
              <RiCloseFill size={20} />
            </Timer>

            <Space width={10} />
            <Text fontSize={20} fontWeight={700}>
              Вопрос {questionIndexState.currentQuestionIndex + 1}
            </Text>
          </Box>
          <Timer>
            <RiTimeFill color={colors.GREY} size={20} />
            <Box width={45} style={{ textAlign: 'right' }}>
              {timeCounter(timeLeft)}
            </Box>
          </Timer>
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
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src =
                  'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAEALAAAAAABAAEAAAICTAEAOw==';
              }}
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

      <AtentionModal
        isVisible={isModalOpen}
        onClose={closeModal}
        onSubmit={() => navigate(HOME)}
        submitText='Выйти'
        text='Хотите покинуть тест?'
      ></AtentionModal>
    </>
  );
};
