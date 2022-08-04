import { ChangeEvent, FC, useEffect, useMemo, useState, useCallback, memo } from 'react';
import { RiPencilFill, RiCloseFill } from 'react-icons/ri';
import { Button, Switch, Drawer, Box, Space, Text } from 'components';
import { BackButton, DrawerContent, DrawerHeader } from 'components/Drawer/styles';
import { Input } from 'components/Input';
import { useBoolean } from 'hooks';
import { getQuestionAmount } from 'Pages/HomeTEST/utils';
import { SubDrawer } from './modules';
import { colors } from 'consts';
import styled from 'styled-components';
import { testInDrawerType } from '../TestList';
import { QuestionResponse, TestResponse } from 'types';
import { useMutation, useQueryClient } from 'react-query';
import { TestService } from 'api/services/TestService';
import { useQuery } from 'react-query';
import { QuestionService } from 'api/services/QuestionService';

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
  testData: testInDrawerType;
}

interface NewTestDataType {
  id?: number;
  published: boolean;
  title: string;
  questions: QuestionResponse[];
}

export interface questionsSubdrawerType {
  isCreating: boolean;
  index: number | null;
  data: QuestionResponse | null;
}

const initialTestState = {
  published: false,
  title: '',
  questions: [],
};

const initialStateQuestionDrawer = {
  isCreating: true,
  index: null,
  data: null,
};

export const useQuestions = (id: any) => {
  const {
    data: questions,
    isError,
    isLoading,
    refetch,
  } = useQuery('Questions', () => QuestionService.getQuestions(id), {
    select: ({ data }) => data.sort((a, b) => a.id - b.id),
    enabled: false,
  });

  return { questions, isError, refetch, isLoading };
};

export const TestDrawer: FC<DrawerProps> = memo(({ isVisible, onClose, testData }) => {
  const [isSubDrawerOpen, { setTrue: openSubDrawer, setFalse: closeSubDrawer }] =
    useBoolean();

  // ************** TEST ****************
  const queryClient = useQueryClient();

  const [currentTest, setCurrentTest] = useState<TestResponse | NewTestDataType>(
    initialTestState
  );
  const [questionSubdrawer, setQuestionSubdrawer] = useState<questionsSubdrawerType>(
    initialStateQuestionDrawer
  );

  // Разница между внутренним состоянием и состоянием которые пришло при открытии Drawer
  // А так же наличие title и хотя бы 1-го вопроса
  const testDataDifference = useMemo(() => {
    const isSame = JSON.stringify(currentTest) === JSON.stringify(testData.data);
    return isSame || !currentTest.questions.length || !currentTest.title;
  }, [currentTest, testData.data]);

  // *** Мутирующие запросы для создания/редактирования теста ***
  const { mutateAsync: createTest } = useMutation(
    'createTest',
    () => TestService.createTest(currentTest),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('testList');
      },
    }
  );

  const { mutateAsync: updateTest } = useMutation(
    'updateTest',
    () => TestService.updateTest(currentTest.id!, currentTest),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('testList');
      },
    }
  );
  // *** --------------------------------------------------- ***

  // Значение строки с количественным
  const questionAmount = useMemo(
    () => getQuestionAmount(currentTest.questions?.length),
    [currentTest.questions]
  );

  const handleOpenSubDrawer = useCallback(
    (data?: QuestionResponse, index?: number) => {
      setQuestionSubdrawer(
        data && index ? { isCreating: false, data, index } : initialStateQuestionDrawer
      );
      openSubDrawer();
    },
    [openSubDrawer]
  );

  const handleTitleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setCurrentTest((prevState) => ({
        ...prevState,
        title: e.target.value,
      }));
    },
    [setCurrentTest]
  );

  const handlePublishChange = useCallback(() => {
    setCurrentTest((prevState) => ({
      ...prevState,
      published: !prevState.published,
    }));
  }, [setCurrentTest]);

  const handleCreateTest = useCallback(() => {
    if (testData.isCreating) {
      createTest();
    } else {
      updateTest();
    }
    onClose();
  }, [testData.isCreating, createTest, updateTest, onClose]);

  // Обновление внутреннего состояния Drawer
  useEffect(() => {
    setCurrentTest(testData.data || initialTestState);
  }, [isVisible, testData.data]);

  return (
    <Drawer open={isVisible} onClose={onClose}>
      <DrawerHeader>
        <BackButton onClick={onClose}>{'<'}</BackButton>
        <p>{testData.isCreating ? 'Создание Quiz' : 'Редактирование Quiz'}</p>
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
            value={currentTest.title}
            onChange={handleTitleChange}
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
          <Switch isActive={currentTest.published} onSwitch={handlePublishChange} />
        </Box>
        <Text color={colors.GREY} fontSize='16px' fontWeight={500}>
          {questionAmount}
        </Text>

        {!!currentTest.questions.length && (
          <Box width='100%' mt='40px'>
            <Space height={33.5} />

            {/* Вопросы */}
            {currentTest.questions.map((question, index) => (
              <Box
                key={question.id}
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                mb={33.5}
              >
                <Text fontSize={16} fontWeight={500}>
                  Вопрос {index + 1}
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
                    onClick={() => handleOpenSubDrawer(question, index + 1)}
                  />
                  <Space width={14} />
                  <RiCloseFill size={25} color={colors.GREY} />
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </DrawerContent>
      <Button view='ghost' onClick={() => handleOpenSubDrawer()}>
        Добавить вопрос
      </Button>
      <br />
      {/* <Button view='primary' onClick={handleCreateTest} disabled={testDataDifference}> */}
      <Button view='primary' onClick={handleCreateTest}>
        Сохранить и закрыть
      </Button>

      <SubDrawer
        open={isSubDrawerOpen}
        onClose={closeSubDrawer}
        questionData={questionSubdrawer}
      />
    </Drawer>
  );
});
