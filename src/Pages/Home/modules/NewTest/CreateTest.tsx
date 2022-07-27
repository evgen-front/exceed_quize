import { ChangeEvent, FC, useEffect, useMemo, useState, useCallback } from 'react';
import { RiPencilFill, RiCloseFill } from 'react-icons/ri';
import { Button, Switch, Drawer, Box, Space, Text } from 'components';
import {
  BackButton,
  DrawerContent,
  DrawerHeader,
  QuestionsList,
} from 'components/Drawer/styles';
import { Input } from 'components/Input';
import { useBoolean, useTests } from 'hooks';
import { TestResponse } from 'types';
import { getQuestionAmount } from 'Pages/Home/utils';
import { SubDrawer } from './modules';
import { Question as QuestionType } from './types';
import { colors } from '../../../../consts';
import styled from 'styled-components';

const BoxWithEllipsis = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  margin-left: 12px;
  margin-right: 15px;
`;

interface DrawerProps {
  isVisible: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  index: number;
}

interface CurrentTestInit {
  isEdit: boolean;
  testData:
    | {
        title: string;
        published: boolean;
        questions: QuestionType[];
      }
    | TestResponse;
}

const blankQuestion = {
  text: '',
  image: null,
  answers: [
    { id: 0, text: '', is_true: true },
    { id: 1, text: '', is_true: false },
  ],
};
const mockData = { published: false, title: '', questions: [] };

export const CreateDrawer: FC<DrawerProps> = ({ isVisible, onClose, mode, index }) => {
  const { testList } = useTests();
  const [isSubDrawerOpen, { setTrue: openSubDrawer, setFalse: closeSubDrawer }] =
    useBoolean();
  const isCreatingTest = mode === 'create';
  const [currentTest, setCurrentTest] = useState<CurrentTestInit>({
    isEdit: false,
    testData: !isCreatingTest && testList ? testList[index] : mockData,
  });
  const [questions, setQuestions] = useState<QuestionType[]>([blankQuestion]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const initialTitle = useMemo(() => currentTest.testData.title, []);

  const questionAmount = useMemo(
    () => getQuestionAmount(currentTest.testData.questions?.length),
    [currentTest.testData.questions]
  );

  // useEffect(() => {
  //   setCurrentTest({
  //     ...currentTest,
  //     testData: data || mockData,
  //   });
  // }, [data]);

  useEffect(() => {
    setCurrentTest((prevState) => ({
      ...prevState,
      isEdit: currentTest.testData.title !== initialTitle,
    }));
  }, [currentTest.testData.title]);

  const openEditSubDrawer = (index: number) => {
    setCurrentIndex(index);
    openSubDrawer();
  };

  const toggleSwitch = () =>
    setCurrentTest((prevState) => ({
      ...prevState,
      testData: { ...prevState.testData, published: !prevState.testData.published },
    }));

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) =>
    setCurrentTest((prevState) => ({
      ...prevState,
      testData: { ...prevState.testData, title: event.target.value },
    }));

  const addAnswer = useCallback((index: number) => {
    setQuestions((prevState) =>
      prevState.map((question, i) => {
        return i === index
          ? {
              ...question,
              answers: [
                ...question.answers,
                { id: question.answers.length + 1, text: '', is_true: false },
              ],
            }
          : question;
      })
    );
  }, []);

  const deleteAnswer = useCallback((index: number, id: number) => {
    setQuestions((prevState) =>
      prevState.map((question, i) => {
        return index === i
          ? {
              ...question,
              answers: question.answers.filter((answer) => answer.id !== id),
            }
          : question;
      })
    );
  }, []);

  const handleAnswerValue = useCallback((index: number, id: number, value: string) => {
    setQuestions((prevState) =>
      prevState.map((question, i) => {
        return index === i
          ? {
              ...question,
              answers: question.answers.map((answer) => {
                return answer.id === id ? { ...answer, text: value } : answer;
              }),
            }
          : question;
      })
    );
  }, []);

  const chooseRightAnswer = useCallback((index: number, id: number) => {
    setQuestions((prevState) =>
      prevState.map((question, i) => {
        return i === index
          ? {
              ...question,
              answers: question.answers.map((answer) => {
                return id === answer.id
                  ? { ...answer, is_true: true }
                  : { ...answer, is_true: false };
              }),
            }
          : question;
      })
    );
  }, []);

  const handleQuestionTitle = useCallback((index: number, value: string) => {
    setQuestions((prevState) =>
      prevState.map((question, i) => {
        return index === i ? { ...question, text: value } : question;
      })
    );
  }, []);

  const addImage = useCallback((index: number, acceptedFiles: File[]) => {
    setQuestions((prevState) =>
      prevState.map((question, i) => {
        return i === index
          ? {
              ...question,
              image: acceptedFiles.map((file: File) => {
                return URL.createObjectURL(file);
              })[0],
            }
          : question;
      })
    );
  }, []);

  const deleteImage = useCallback((index: number) => {
    setQuestions((prevState) =>
      prevState.map((question, i) => {
        return i === index ? { ...question, image: null } : question;
      })
    );
  }, []);

  const goToNextQuestion = useCallback(() => {
    if (!questions[currentIndex + 1]) {
      setQuestions((prevState) => [...prevState, blankQuestion]);
    }
    setCurrentIndex((prevState) => prevState + 1);
  }, [currentIndex]);

  const goToPreviousQuestion = useCallback(() => {
    if (!currentIndex) {
      closeSubDrawer();
      return;
    }
    setCurrentIndex((prevState) => prevState - 1);
  }, [currentIndex]);

  const closeDrawer = useCallback(() => {
    setQuestions([blankQuestion]);
    onClose();
  }, []);

  const saveQuestionsToData = () => {
    setCurrentTest((prevState) => ({
      ...prevState,
      testData: { ...prevState.testData, questions: questions },
    }));
  };

  const deleteQuestion = useCallback((index: number) => {
    setQuestions((prevState) => prevState.filter((_, i) => i !== index));
  }, []);

  return (
    <Drawer open={isVisible} onClose={onClose}>
      <DrawerHeader>
        <BackButton onClick={closeDrawer}>{'<'}</BackButton>
        <p>{isCreatingTest ? 'Создание Quiz' : 'Редактирование Quiz'}</p>
      </DrawerHeader>
      <DrawerContent>
        <Box width='100%'>
          <Text fontSize='16px' fontWeight='500'>
            Название теста
          </Text>
          <Space height='12px' />
          <Input
            name='title'
            type='text'
            value={currentTest.testData.title}
            onChange={handleTitle}
          />
          <Space height='28px' />
        </Box>
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          width='100%'
        >
          <Text fontSize='16px' fontWeight='500'>
            Опубликован
          </Text>
          <Switch isActive={currentTest.testData.published} onSwitch={toggleSwitch} />
        </Box>

        {!!questions?.length && (
          <Box width='100%' mt='40px'>
            <Text color={colors.GREY} fontSize='16px' fontWeight={500}>
              {questionAmount}
            </Text>
            <Space height={33.5} />

            {questions.map((question, i) => (
              <Box
                key={`question_${i}`}
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                mb={33.5}
              >
                <Text fontSize={16} fontWeight={500}>
                  Вопрос {i + 1}
                </Text>
                <BoxWithEllipsis>
                  <Text fontSize={16} fontWeight={400}>
                    {question.text}
                  </Text>
                </BoxWithEllipsis>
                <Box display='flex' alignItems='center'>
                  <RiPencilFill
                    size={20}
                    color={colors.GREY}
                    onClick={() => openEditSubDrawer(i)}
                  />
                  <Space width={14} />
                  <RiCloseFill size={25} color={colors.GREY} />
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </DrawerContent>
      <Button view='ghost' onClick={isCreatingTest ? openSubDrawer : () => {}}>
        {isCreatingTest ? 'Далее' : 'Сохранить'}
      </Button>
      <SubDrawer
        open={isSubDrawerOpen}
        onClose={closeSubDrawer}
        currentIndex={currentIndex}
        currentQuestion={questions[currentIndex]}
        addAnswer={addAnswer}
        deleteAnswer={deleteAnswer}
        handleAnswerValue={handleAnswerValue}
        handleQuestionTitle={handleQuestionTitle}
        chooseRightAnswer={chooseRightAnswer}
        goToNextQuestion={goToNextQuestion}
        goToPreviousQuestion={goToPreviousQuestion}
        addImage={addImage}
        deleteImage={deleteImage}
        deleteQuestion={deleteQuestion}
        mode={mode}
      />
    </Drawer>
  );
};
