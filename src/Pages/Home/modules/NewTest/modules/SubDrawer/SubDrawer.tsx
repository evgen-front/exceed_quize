import { FC, Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useDropzone } from 'react-dropzone';

import { Box, Button, Drawer, Input, QuestionImage, Space, Text } from 'components';
import { Answer, AnswerDrawer, Question, questionsSubdrawerType } from 'types';
import { useAnswers } from 'hooks';
import { API_URL } from 'api';

import { BackButton, DrawerHeader } from 'components/Drawer/styles';
import { RiArrowLeftLine, RiCloseFill } from 'react-icons/ri';
import { colors } from 'consts';
import {
  createAnswerAction,
  createImageAction,
  createQuestionAction,
  deleteAnswerAction,
  deleteImageAction,
  updateAnswerAction,
  updateQuestionAction,
} from 'api/action-creators';

interface SubDrawerProps {
  open: boolean;
  onClose: () => void;
  questionData: questionsSubdrawerType;
  testId: number;
}

const initialQuestionState = {
  text: '',
};

export const SubDrawer: FC<SubDrawerProps> = ({
  open,
  onClose,
  questionData,
  testId,
}) => {
  const { isLoading, answers } = useAnswers(Number(questionData.data?.id));
  const queryClient = useQueryClient();

  const [currentQuestion, setCurrentQuestion] = useState<Question>(initialQuestionState);
  const [currentAnswers, setCurrentAnswers] = useState<AnswerDrawer[]>([]);
  const [isImage, setIsImage] = useState(true);

  const { mutateAsync: createImage } = useMutation(createImageAction);
  const { mutateAsync: deleteImage } = useMutation(deleteImageAction);

  const { mutateAsync: updateQuestion } = useMutation(updateQuestionAction, {
    onSuccess: () => {
      queryClient.invalidateQueries('testList');
    },
  });

  const { mutateAsync: createQuestion } = useMutation(createQuestionAction, {
    onSuccess: () => {
      queryClient.invalidateQueries('testList');
    },
  });

  const { mutateAsync: updateAnswer } = useMutation(updateAnswerAction, {
    onSuccess: () => {
      queryClient.invalidateQueries('Answers');
    },
  });

  const { mutateAsync: deleteAnswer } = useMutation(deleteAnswerAction, {
    onSuccess: () => {
      queryClient.invalidateQueries('Answers');
    },
  });

  const { mutateAsync: createAnswer } = useMutation(createAnswerAction, {
    onSuccess: () => {
      queryClient.invalidateQueries('Answers');
    },
  });

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

  const handleEditAnswer = (value: string, id: number) => {
    setCurrentAnswers(
      currentAnswers.map((answer) => {
        return answer.id === id ? { ...answer, text: value } : answer;
      })
    );
  };

  const handleSaveAnswer = (index: number, data: AnswerDrawer, id?: number) => {
    if (questionData.data) {
      if (id && !data.is_new) {
        updateAnswer({
          question_id: questionData.data?.id,
          answer_id: id,
          data: {
            text: currentAnswers[index].text,
          },
        });
      } else {
        createAnswer({
          question_id: questionData.data?.id,
          data: {
            text: currentAnswers[index].text,
          },
        });
      }
    }
  };

  const handleCreateNewAnswer = () => {
    // Задаем для только что созданного ответа уникальный id, потому что после сохраниения новый "рабочий" id придет с сервера и перерисует наш список
    const uid = Math.floor(Math.random() * 1000);

    setCurrentAnswers((prevState) => [
      ...prevState,
      { id: uid, text: '', is_true: false, is_new: true },
    ]);
  };

  useEffect(() => {
    setCurrentAnswers(answers || []);
  }, [answers, open]);

  useEffect(() => {
    setCurrentQuestion(
      questionData.data
        ? {
            id: questionData.data.id,
            text: questionData.data.text,
          }
        : initialQuestionState
    );
    setIsImage(true);
  }, [open, questionData.data]);

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
          (isImage ? (
            <Box display='flex' width='100%' justifyContent='space-between'>
              <QuestionImage
                src={`${API_URL}/tests/${testId}/questions/${currentQuestion.id}/images/`}
                onError={() => setIsImage(false)}
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
                currentAnswers?.map(({ text, id, is_true, is_new }, index) => (
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

              {currentAnswers.length < 4 && (
                <>
                  <Text
                    fontSize={16}
                    fontWeight={500}
                    onClick={() => handleCreateNewAnswer()}
                  >
                    + Добавить вариант ответа
                  </Text>
                  <Space height={10} />
                </>
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
