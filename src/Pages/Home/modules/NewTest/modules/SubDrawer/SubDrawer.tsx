import {
  FC,
  forwardRef,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useDropzone } from 'react-dropzone';

import { Box, Button, Drawer, Input, QuestionImage, Space, Text } from 'components';
import { Answer, AnswerDrawer, Question, QuestionsSubdrawerType } from 'types';
import { useAnswers } from 'hooks';
import { API_URL } from 'api';

import { BackButton, DrawerContent, DrawerHeader } from 'components/Drawer/styles';
import { RiArrowLeftSLine, RiCloseFill } from 'react-icons/ri';
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
  questionData: QuestionsSubdrawerType;
  testId: number;
}

const initialQuestionState = {
  text: '',
};

const initialNewAnswerState = {
  text: '',
  isCreating: false,
};

const EditAnswerInput = forwardRef((props: any, ref) => (
  <Input withAnswerControls {...props} innerRef={ref} />
));

export const SubDrawer: FC<SubDrawerProps> = ({
  open,
  onClose,
  questionData,
  testId,
}) => {
  const { isLoading, answers, isRefetching } = useAnswers(Number(questionData.data?.id));
  const queryClient = useQueryClient();

  const [currentQuestion, setCurrentQuestion] = useState<Question>(initialQuestionState);
  const [currentAnswers, setCurrentAnswers] = useState<AnswerDrawer[]>([]);
  const [isImage, setIsImage] = useState(true);
  const [newAnswer, setNewAnswer] = useState(initialNewAnswerState);

  const AnswerCreator = useRef<HTMLDivElement>(null);

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

  const newQuestionExist = useMemo(() => {
    return !currentAnswers.map((answer) => answer.is_new).includes(true);
  }, [currentAnswers]);

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

  const handleSaveAnswer = (index: number, data: AnswerDrawer, id: number) => {
    if (questionData.data) {
      updateAnswer({
        question_id: questionData.data?.id,
        answer_id: id,
        data: {
          text: currentAnswers[index].text,
        },
      });
    }
  };

  const handleCreateNewAnswer = () => {
    questionData.data &&
      createAnswer({
        question_id: questionData.data?.id,
        data: {
          text: newAnswer.text,
        },
      });
  };

  useEffect(() => {
    AnswerCreator.current && AnswerCreator.current.focus();
  }, [newAnswer.isCreating]);

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
          <RiArrowLeftSLine />
        </BackButton>
        <p>{questionData.index ? `Вопрос ${questionData.index}` : 'Новый вопрос'}</p>
      </DrawerHeader>
      <DrawerContent>
        <Box width='100%'>
          <Text fontWeight={500} fontSize={16}>
            Вопрос
          </Text>
          <Space height={12} />
          <Input
            placeholder='Ведите вопрос'
            value={currentQuestion.text}
            onChange={(e) => handleTextChange(e.target.value)}
          />
          <Space height={12} />
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
        </Box>

        <Box display='flex' width='100%' justifyContent='space-between' m={'20px 0 50px'}>
          {currentQuestion.id &&
            (isImage ? (
              <>
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
              </>
            ) : (
              <Box {...getRootProps()}>
                <input {...getInputProps()} />
                <Text fontSize={16} fontWeight={500} onClick={openDropzone}>
                  + Добавить изображение
                </Text>
              </Box>
            ))}
        </Box>

        {currentQuestion.id && (
          <>
            <Text>Варианты ответов</Text>

            {isLoading || isRefetching ? (
              <Box m='20px 0' flex='1 0 auto'>
                Загрузка
              </Box>
            ) : (
              <Box mt={12}>
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
                        onBlur={() => answers && setCurrentAnswers(answers)}
                      />
                      <Space height={20} />
                    </Fragment>
                  ))}

                {newAnswer.isCreating && (
                  <EditAnswerInput
                    ref={AnswerCreator}
                    onBlur={() => setNewAnswer(initialNewAnswerState)}
                    value={newAnswer.text}
                    onChange={(e: any) =>
                      setNewAnswer((prev) => ({
                        ...prev,
                        text: e.target.value,
                      }))
                    }
                    onSave={handleCreateNewAnswer}
                  />
                )}

                {currentAnswers.length < 4 && newQuestionExist && (
                  <>
                    <Space height={10} />
                    <Text
                      fontSize={16}
                      fontWeight={500}
                      onClick={() =>
                        setNewAnswer((prev) => ({
                          ...prev,
                          isCreating: true,
                        }))
                      }
                    >
                      + Добавить вариант ответа
                    </Text>
                    <Space height={10} />
                  </>
                )}
              </Box>
            )}
          </>
        )}
      </DrawerContent>

      <Box>
        <Space height={10} />
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
