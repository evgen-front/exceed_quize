import { useState } from 'react';
import { Box, Button } from 'components';
import { useParams } from 'react-router-dom';
import { TestView } from 'Layouts/MainView/TestView';
import { useMutation, useQuery } from 'react-query';
import { AnswerService } from 'api/services/AnswerService';
import { SessionService } from 'api/services/SessionService';
import { QuestionService } from 'api/services/QuestionService';
import { AnswerItem } from './modules/AnswerItem/AnwerItem';
import { AnswerResponse, QuestionResponse } from 'types';
import { Navigate } from 'react-router-dom';
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

const useQuestionImage = (test_id: number, questionId?: number) => {
  return useQuery(
    ['QuestionImage', questionId],
    () => QuestionService.getImage(test_id, questionId!),
    {
      select: ({ data }): any => data,
      enabled: !!questionId,
      retry: 0,
    }
  );
};

export const Session = () => {
  const { testId } = useParams<SessionPageParams>() as SessionPageParams;
  const [selectedAnswer, setSelectedAnswer] = useState<null | AnswerResponse>(null);
  const [rightAnswers, setRightAnsers] = useState(0);
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

  const { data: currentQuestionAnswers, isLoading: isCurrentQuestionAnswersLoading } =
    useQuestionAnswers(currentQuestion?.id);

  const { isLoading: isNextQuestionAnswersLoading } = useQuestionAnswers(
    nextQuestion?.id
  );

  const { data: imageData, isLoading: isImageLoading } = useQuestionImage(
    Number(testId),
    questionIndexState.currentQuestionIndex
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

    if (questionIndexState.currentQuestionIndex === questions.length - 1) {
      setIsComplete(true);
      return;
    }

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
    <TestView>
      <div className='sessionWrapper'>
        <div className='session_slide'>
          <div className='session_slide-question'>
            {isImageLoading ? (
              <p>Загрузка изображения</p>
            ) : (
              <Box flex='1 0 auto'>
                <img
                  // src='https://picsum.photos/220/190'
                  src={
                    imageData
                      ? imageData
                      : `https://www.zepter.ru/static/media/product-placeholder.8057445e.png`
                  }
                  alt='default'
                  className='session_slide-question_img'
                  width='100%'
                />
              </Box>
            )}

            <div className='session_slide-question_text'>{currentQuestion?.text}</div>
          </div>
          <div className='session_slide-answers'>
            {isCurrentQuestionAnswersLoading ? (
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
              disabled={!selectedAnswer || isNextQuestionAnswersLoading}
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
