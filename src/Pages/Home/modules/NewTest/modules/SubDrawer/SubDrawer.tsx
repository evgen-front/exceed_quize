import { FC, Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useDropzone } from 'react-dropzone';

import { Box, Button, Drawer, Input, QuestionImage, Space, Text } from 'components';
import { QuestionService } from 'api/services/QuestionService';
import { AnswerService } from 'api/services/AnswerService';
import { Answer, AnswerDrawer, Question } from 'types';
import { questionsSubdrawerType } from '../../types';
import { useAnswers } from 'hooks';

import { BackButton, DrawerHeader } from 'components/Drawer/styles';
import { RiArrowLeftLine, RiCloseFill } from 'react-icons/ri';
import { colors } from 'consts';

interface SubDrawerProps {
  open: boolean;
  onClose: () => void;
  questionData: questionsSubdrawerType;
  testId: number;
}

interface NewQuestionType {
  id?: number;
  text: string;
  answers: AnswerDrawer[];
  image?: boolean;
}

const initialQuestionState = {
  text: '',
  answers: [],
  image: false,
};

export const SubDrawer: FC<SubDrawerProps> = ({
  open,
  onClose,
  questionData,
  testId,
}) => {
  const [currentQuestion, setCurrentQuestion] =
    useState<NewQuestionType>(initialQuestionState);

  const queryClient = useQueryClient();
  const { isLoading, answers } = useAnswers(Number(questionData.data?.id));

  const { mutateAsync: updateQuestion } = useMutation(
    'updateQuestion',
    ({
      test_id,
      question_id,
      data,
    }: {
      test_id: number;
      question_id: number;
      data: Question;
    }) => QuestionService.updateQuestion(test_id, question_id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('testList');
      },
    }
  );

  const { mutateAsync: createQuestion } = useMutation(
    'createQuestion',
    ({ test_id, data }: { test_id: number; data: Question }) =>
      QuestionService.createNewQuestion(test_id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('testList');
      },
    }
  );

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

  const { mutateAsync: createImage } = useMutation(
    'createImage',
    ({
      test_id,
      question_id,
      data,
    }: {
      test_id: number;
      question_id: number;
      data: any;
    }) => QuestionService.createImage(test_id, question_id, data)
  );

  const { mutateAsync: deleteImage } = useMutation(
    'deleteImage',
    ({ test_id, question_id }: { test_id: number; question_id: number }) =>
      QuestionService.deleteImage(test_id, question_id)
  );

  const addImage = (acceptedFiles: File[]) => {
    const data = new FormData();
    data.append('file', acceptedFiles[0]);

    currentQuestion.id &&
      createImage({
        test_id: testId,
        question_id: currentQuestion.id,
        data,
      });

    setTimeout(
      () =>
        setCurrentQuestion((prevState) => ({
          ...prevState,
          image: true,
        })),
      1000
    );
  };

  const removeImage = () => {
    if (currentQuestion.id) {
      deleteImage({
        test_id: testId,
        question_id: currentQuestion.id,
      });
    }

    setCurrentQuestion((prevState) => ({
      ...prevState,
      image: false,
    }));
  };

  const onDrop = (acceptedFiles: File[]) => {
    addImage(acceptedFiles);
  };

  const {
    getRootProps,
    getInputProps,
    open: openDropzone,
  } = useDropzone({ onDrop, multiple: false, noClick: true, noKeyboard: true });

  const questionDataDifference = useMemo(() => {
    const isSame = questionData.data?.text === currentQuestion.text;
    return isSame || !currentQuestion.text;
  }, [currentQuestion.text, questionData.data?.text]);

  const handleSaveQuestion = useCallback(() => {
    updateQuestion({
      test_id: testId,
      question_id: currentQuestion.id!,
      data: { text: currentQuestion.text },
    });
    onClose();
  }, [currentQuestion, onClose, testId, updateQuestion]);

  const handleDeleteAnswer = useCallback(
    (question_id: number, answer_id: number) => {
      deleteAnswer({
        question_id,
        answer_id,
      });
    },
    [deleteAnswer]
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

  const handleTextChange = useCallback((text: string) => {
    setCurrentQuestion((prevState) => ({
      ...prevState,
      text,
    }));
  }, []);

  const handleEditAnswer = useCallback((value: string, id: number) => {
    setCurrentQuestion((prevState) => ({
      ...prevState,
      answers: prevState.answers.map((answer) => {
        return answer.id === id ? { ...answer, text: value } : answer;
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
    // Задаем для только что созданного ответа уникальный id, потому что после сохраниения новый "рабочий" id придет с сервера и перерисует наш список
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
      questionData.data
        ? {
            id: questionData.data.id,
            text: questionData.data.text,
            answers: answers || [],
            image: true,
          }
        : initialQuestionState
    );
  }, [answers, open, questionData.data]);

  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerHeader>
        <BackButton onClick={onClose}>
          <RiArrowLeftLine />
        </BackButton>
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
          onChange={(e) => handleTextChange(e.target.value)}
        />
        <Space height={10} />
        {!currentQuestion.id && (
          <Button
            onClick={() =>
              createQuestion({ test_id: testId, data: { text: currentQuestion.text } })
            }
            disabled={!currentQuestion.text}
          >
            Сохранить
          </Button>
        )}
        <Space height={30.5} />

        {currentQuestion.id &&
          (currentQuestion.image ? (
            <Box display='flex' width='100%' justifyContent='space-between'>
              <QuestionImage
                src={`http://localhost/tests/${testId}/questions/${currentQuestion.id}/images/`}
                onError={() =>
                  setCurrentQuestion((prevState) => ({
                    ...prevState,
                    image: false,
                  }))
                }
                onLoad={() =>
                  setCurrentQuestion((prevState) => ({
                    ...prevState,
                    image: true,
                  }))
                }
              />
              <Box
                display='flex'
                alignItems='center'
                height='fit-content'
                mt={15.5}
                onClick={removeImage}
              >
                <RiCloseFill color={colors.DANGER} size={20} />
                <Space width={5} />
                <Text color={colors.DANGER} fontSize={16} fontWeight={500}>
                  Удалить
                </Text>
              </Box>
            </Box>
          ) : (
            <Box {...getRootProps()}>
              <input {...getInputProps()} />
              <Text fontSize={16} fontWeight={500} onClick={openDropzone}>
                + Добавить изображение
              </Text>
            </Box>
          ))}

        {currentQuestion.id && (
          <Box mt={50.5}>
            <Text>Варианты ответов</Text>
            <Space height={12} />
            <Box maxHeight={300} overflow='auto'>
              {isLoading ||
                currentQuestion.answers?.map(({ text, id, is_true, is_new }, index) => (
                  <Fragment key={id}>
                    <Input
                      withAnswerControls
                      isRight={is_true}
                      value={text}
                      onDelete={() => handleDeleteAnswer(currentQuestion.id!, id)}
                      onCheck={() => handleCheckAnswer({ text, id, is_true: !is_true })}
                      onChange={(e) => handleEditAnswer(e.target.value, id)}
                      onSave={() =>
                        handleSaveAnswer(index, { text, id, is_true, is_new }, id)
                      }
                    />
                    <Space height={20} />
                  </Fragment>
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
        )}
      </Box>

      <Box justifySelf='end'>
        {currentQuestion.id && (
          <Button
            view='primary'
            onClick={handleSaveQuestion}
            disabled={questionDataDifference}
          >
            Сохранить и закрыть
          </Button>
        )}
      </Box>
    </Drawer>
  );
};
