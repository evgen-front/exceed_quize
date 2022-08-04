import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { RiCloseFill } from 'react-icons/ri';
import { BackButton, DrawerHeader } from 'components/Drawer/styles';
import { colors } from 'consts';
import { Box, Button, Drawer, Input, QuestionImage, Space, Text } from 'components';
import { Answer, AnswerDrawer, AnswerResponse, QuestionResponse } from 'types';
import { questionsSubdrawerType } from '../../TestDrawer';
import { useAnswers } from 'hooks';
import { useMutation, useQueryClient } from 'react-query';
import { AnswerService } from 'api/services/AnswerService';

interface SubDrawerProps {
  open: boolean;
  onClose: () => void;
  questionData: questionsSubdrawerType;
}

interface NewQuestionType {
  text: string;
  answers: AnswerDrawer[];
}

const initialQuestionState = {
  text: '',
  answers: [],
};

export const SubDrawer: FC<SubDrawerProps> = ({ open, onClose, questionData }) => {
  const [currentQuestion, setCurrentQuestion] =
    useState<NewQuestionType>(initialQuestionState);

  const queryClient = useQueryClient();
  const { isLoading, answers } = useAnswers(questionData.data?.id);

  const { mutateAsync: updateAnswer } = useMutation(
    'updateAnswer',
    ({
      question_id,
      answer_id,
      data,
    }: {
      question_id: number;
      answer_id: number;
      data: Answer;
    }) => AnswerService.updateAnswer(question_id, answer_id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('Answers');
      },
    }
  );

  const { mutateAsync: deleteAnswer } = useMutation(
    'deleteAnswer',
    ({ question_id, answer_id }: { question_id: number; answer_id: number }) =>
      AnswerService.deleteAnswer(question_id, answer_id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('Answers');
      },
    }
  );

  const { mutateAsync: createAnswer } = useMutation(
    'createAnswer',
    ({ question_id, data }: { question_id: number; data: Answer }) =>
      AnswerService.createNewAnswer(question_id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('Answers');
      },
    }
  );

  const handleDeleteAnswer = useCallback(
    (id: number) => {
      if (questionData.data && id) {
        deleteAnswer({
          question_id: questionData.data?.id,
          answer_id: id,
        });
      }
    },
    [questionData.data, deleteAnswer]
  );

  const handleCheckAnswer = useCallback(
    (data: Answer) => {
      if (questionData.data && data.id) {
        updateAnswer({
          question_id: questionData.data?.id,
          answer_id: data.id,
          data: data,
        });
      }
    },
    [questionData.data, updateAnswer]
  );

  const handleTextChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setCurrentQuestion((prevState) => ({
        ...prevState,
        text: e.target.value,
      }));
    },
    [setCurrentQuestion]
  );

  const handleEditAnswer = useCallback((e: ChangeEvent<HTMLInputElement>, id: number) => {
    setCurrentQuestion((prevState) => ({
      ...prevState,
      answers: prevState.answers.map((answer) => {
        return answer.id === id ? { ...answer, text: e.target.value } : answer;
      }),
    }));
  }, []);

  const handleSaveAnswer = (index: number, data: AnswerDrawer, id?: number) => {
    if (questionData.data) {
      if (id && !data.is_new) {
        updateAnswer({
          question_id: questionData.data?.id,
          answer_id: id,
          data: {
            text: currentQuestion.answers[index].text,
          },
        });
      } else {
        createAnswer({
          question_id: questionData.data?.id,
          data: {
            text: currentQuestion.answers[index].text,
          },
        });
      }
    }
  };

  const handleCreateNewAnswer = () => {
    // Задаем для только что созданного вопроса уникальный id, потому что после сохраниения новый "рабочий" id придет с сервера и перерисует наш список
    const uid = Math.floor(Math.random() * 1000);

    setCurrentQuestion((prevState) => ({
      ...prevState,
      answers: [
        ...prevState.answers,
        // Создаем внутри флаг что вопрос новый, при refetch это поле всё ровно удалится
        { id: uid, text: '', is_true: false, is_new: true },
      ],
    }));
  };

  useEffect(() => {
    setCurrentQuestion(
      questionData.data && answers
        ? {
            text: questionData.data.text,
            answers: answers,
          }
        : initialQuestionState
    );
  }, [open, questionData.data, answers]);

  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerHeader>
        <BackButton onClick={onClose}>{'<'}</BackButton>
        <p>{questionData.index ? `Вопрос ${questionData.index}` : 'Новый вопрос'}</p>
      </DrawerHeader>
      <Box flex={1}>
        <Text fontWeight={500} fontSize={16}>
          Вопрос
        </Text>
        <Space height={12} />
        <Input
          placeholder='Ведите вопрос'
          value={currentQuestion.text}
          onChange={handleTextChange}
        />
        <Space height={30.5} />

        <Box>
          <input type='file' />
          <Text fontSize={16} fontWeight={500} onClick={() => {}}>
            + Добавить изображение
          </Text>
        </Box>

        <Box mt={50.5}>
          <Text>Варианты ответов</Text>
          <Space height={12} />
          <Box maxHeight={300} overflow='auto'>
            {isLoading ||
              currentQuestion.answers?.map(({ text, id, is_true, is_new }, index) => (
                <React.Fragment key={id}>
                  {/* ============= Добавить onBlur  ============= */}
                  <Input
                    withAnswerControls
                    isRight={is_true}
                    value={text}
                    onDelete={() => handleDeleteAnswer(id)}
                    onCheck={() => handleCheckAnswer({ text, id, is_true: !is_true })}
                    onChange={(e) => handleEditAnswer(e, id)}
                    onSave={(e) =>
                      handleSaveAnswer(index, { text, id, is_true, is_new }, id)
                    }
                  />
                  <Space height={20} />
                </React.Fragment>
              ))}

            {currentQuestion.answers.length < 4 && (
              <Text
                fontSize={16}
                fontWeight={500}
                onClick={() => handleCreateNewAnswer()}
              >
                + Добавить вариант ответа
              </Text>
            )}
          </Box>
        </Box>
      </Box>

      <Box justifySelf='end'>
        <>
          {questionData.isCreating && (
            <Button view='ghost' onClick={() => {}}>
              Следующий вопрос
            </Button>
          )}

          <Space height={20} />
          <Button view='primary' onClick={onClose}>
            Сохранить и закрыть
          </Button>
        </>
      </Box>
    </Drawer>
  );
};
