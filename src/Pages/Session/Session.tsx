import { Button } from 'antd';
import { Box } from 'components';
import { TestView } from 'Layouts/MainView/TestView';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { NavLink, useParams } from 'react-router-dom';
import { AnswerService } from 'services/AnswerService';
import { SessionService } from 'services/SessionService';
import { AnswerResponse } from 'types/types';
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

  const { questions } = sessionData || { questions: [] };
  const [questionState, setQuestionState] = useState({
    currentQuestionIndex: 0,
    nextQuestionIndex: 1,
  });

  console.log(questionState);

  const currentQuestion = questions[questionState.currentQuestionIndex];
  const nextQuestion = questions[questionState.nextQuestionIndex];

  const { data: currentQuestionAnswers, isLoading: areCurrentQuestionAnswersLoading } =
    useQuestionAnswers(currentQuestion?.id);

  const { isLoading: areNextQuestionAnswersLoading } = useQuestionAnswers(
    nextQuestion?.id
  );

  const handleNext = () => {
    setQuestionState(({ nextQuestionIndex }) => {
      const updatedNextQuestionIndex = nextQuestionIndex + 1;
      console.log(updatedNextQuestionIndex, questions);
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
        <Box>
          Ответы: {rightAnswers} / {questions?.length}
        </Box>
        <NavLink to={'/'}>
          <Button>На главную</Button>
        </NavLink>
      </div>
    );
  }

  return (
    <TestView>
      <div className='sessionWrapper'>
        <div className='session_slide'>
          <div className='session_slide-question'>
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
              shape='round'
              onClick={handleNext}
            >
              next
            </Button>
          </div>
        </div>
      </div>
    </TestView>
  );
};
