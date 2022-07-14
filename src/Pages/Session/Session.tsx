import { Button } from 'antd';
import { useAnswers } from 'hooks/useAnswers';
import { TestView } from 'Layouts/MainView/TestView';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import { SessionService } from 'services/SessionService';
import { AnswerResponse, QuestionResponse } from 'types/types';
import { AnswerItem } from './modules/AnswerItem/AnwerItem';
import './Session.scss';

export const Session = () => {
  const { id } = useParams();
  const [sessionId, setSessionId] = useState<null | number>(null);
  const [questions, setQuestions] = useState<QuestionResponse[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<null | AnswerResponse>(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [rightAnswers, setRightAnsers] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const { answers, refetch } = useAnswers(questions[questionCount]?.id);

  const mutation = useMutation(
    'createSession',
    () => SessionService.createSession(Number(id)),
    {
      onSuccess: (data) => {
        setQuestions(data.data.questions);
        setSessionId(data.data.id);
      },
    }
  );

  const userAnswer = useMutation('createUserAnswer', () =>
    SessionService.createUserAnswer(sessionId!, { answer_id: selectedAnswer?.id })
  );
  const { isLoading } = mutation;

  useEffect(() => {
    mutation.mutateAsync();
  }, []);

  const handleNext = () => {
    if (questions) {
      userAnswer.mutateAsync();

      if (selectedAnswer?.is_true) {
        setRightAnsers(rightAnswers + 1);
      }

      if (questionCount + 1 !== questions.length) {
        setQuestionCount(questionCount + 1);
        setTimeout(() => {
          refetch();
        }, 0);
      } else {
        setIsComplete(true);
      }
    }
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isComplete) {
    return (
      <div>
        ответы: {rightAnswers} / {questions?.length}
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
            <div className='session_slide-question_text'>
              {questions[questionCount]?.text}
            </div>
          </div>
          <div className='session_slide-answers'>
            {answers &&
              answers.map((answer) => (
                <AnswerItem
                  key={answer.id}
                  onSelect={() => setSelectedAnswer(answer)}
                  selected={selectedAnswer?.id === answer.id}
                  answer={answer}
                />
              ))}

            <Button shape='round' onClick={handleNext}>
              next
            </Button>
          </div>
        </div>
      </div>
    </TestView>
  );
};
