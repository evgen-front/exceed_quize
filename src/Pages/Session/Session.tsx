import { Box, Button, Text } from 'components';
import { TestView } from 'Layouts/MainView/TestView';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { NavLink, useParams } from 'react-router-dom';
import { AnswerService } from 'api/services/AnswerService';
import { SessionService } from 'api/services/SessionService';
import { AnswerResponse } from 'types';
import { AnswerItem } from './modules/AnswerItem/AnwerItem';
import './Session.scss';

type SessionPageParams = {
  testId: string;
};

const useQuestionAnswers = (questionId?: number) => {
  return useQuery(['Answers', questionId], () => AnswerService.getAnswers(questionId!), {
    select: ({ data }): AnswerResponse[] => data.sort((a, b) => a.id - b.id),
    enabled: !!questionId,
  });
};

export const Session = () => {
  const { testId } = useParams<SessionPageParams>() as SessionPageParams;
  const [selectedAnswer, setSelectedAnswer] = useState<null | AnswerResponse>(null);
  const [rightAnswers, setRightAnsers] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const { isLoading: isSessionDataLoading, data: sessionData } = useQuery(
    'createSession',
    () => SessionService.createSession(+testId),
    {
      select: ({ data }: any) => {
        const result: {
          questions: any[];
          sessionId: number;
        } = { questions: data.questions || [], sessionId: data.id };

        return result;
      },
      enabled: !!testId,
    }
  );

  const { questions, sessionId } = sessionData || { questions: [] };
  const [questionState, setQuestionState] = useState({
    currentQuestionIndex: 0,
    nextQuestionIndex: 1,
  });

  const currentQuestion = questions[questionState.currentQuestionIndex];
  const nextQuestion = questions[questionState.nextQuestionIndex];

  const { data: currentQuestionAnswers, isLoading: areCurrentQuestionAnswersLoading } =
    useQuestionAnswers(currentQuestion?.id);

  const { isLoading: areNextQuestionAnswersLoading } = useQuestionAnswers(
    nextQuestion?.id
  );

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

    if (questionState.currentQuestionIndex === questions.length - 1) {
      setIsComplete(true);
    }

    setQuestionState(({ nextQuestionIndex }) => {
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
      <div>
        <Box maxWidth={'500px'} margin='30px auto'>
          <Text>
            Ответы: {rightAnswers} / {questions?.length}
          </Text>
          <NavLink to={'/'}>
            <Button>На главную</Button>
          </NavLink>
        </Box>
      </div>
    );
  }

  return (
    <TestView>
      <div className='sessionWrapper'>
        <div className='session_slide'>
          <div className='session_slide-question'>
            {/* <img
              src='https://picsum.photos/220/190'
              alt='default'
              className='session_slide-question_img'
            /> */}
            <div className='session_slide-question_text'>{currentQuestion?.text}</div>
          </div>
          <div className='session_slide-answers'>
            {areCurrentQuestionAnswersLoading ? (
              <div>Загрузка</div>
            ) : (
              currentQuestionAnswers &&
              currentQuestionAnswers.map((answer) => (
                <AnswerItem
                  key={answer.id}
                  onSelect={() => setSelectedAnswer(answer)}
                  selected={selectedAnswer?.id === answer.id}
                  answer={answer}
                />
              ))
            )}

            <Button
              disabled={!selectedAnswer || areNextQuestionAnswersLoading}
              onClick={handleNext}
            >
              Следующий вопрос
            </Button>
          </div>
        </div>
      </div>
    </TestView>
  );
};
