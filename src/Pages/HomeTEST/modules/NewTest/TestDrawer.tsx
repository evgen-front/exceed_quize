import { ChangeEvent, FC, useEffect, useMemo, useState, useCallback, memo } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { BackButton, DrawerContent, DrawerHeader } from 'components/Drawer/styles';
import { Button, Switch, Drawer, Box, Space, Text } from 'components';
import { QuestionListItem } from './modules/QuestionListItem';
import { getQuestionAmount } from 'Pages/HomeTEST/utils';
import { TestService } from 'api/services/TestService';
import { Input } from 'components/Input';
import { SubDrawer } from './modules';
import { useBoolean } from 'hooks';
import { colors } from 'consts';

import { NewTestDataType, questionsSubdrawerType } from './types';
import { QuestionResponse, TestResponse } from 'types';
import { testInDrawerType } from '../TestList';
// import { useQuery } from 'react-query';
// import { QuestionService } from 'api/services/QuestionService';

interface DrawerProps {
  isVisible: boolean;
  onClose: () => void;
  testData: testInDrawerType;
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

// export const useQuestions = (id: any) => {
//   const {
//     data: questions,
//     isError,
//     isLoading,
//     refetch,
//   } = useQuery('Questions', () => QuestionService.getQuestions(id), {
//     select: ({ data }) => data.sort((a, b) => a.id - b.id),
//     enabled: false,
//   });
//   return { questions, isError, refetch, isLoading };
// };

export const TestDrawer: FC<DrawerProps> = memo(({ isVisible, onClose, testData }) => {
  const [isSubDrawerOpen, { setTrue: openSubDrawer, setFalse: closeSubDrawer }] =
    useBoolean();
  const [currentTest, setCurrentTest] = useState<TestResponse | NewTestDataType>(
    initialTestState
  );
  const [questionSubdrawer, setQuestionSubdrawer] = useState<questionsSubdrawerType>(
    initialStateQuestionDrawer
  );
  const queryClient = useQueryClient();

  // Разница между внутренним состоянием и состоянием которые пришло при открытии Drawer
  // А так же наличие title и хотя бы 1-го вопроса
  // Для того что бы заблокировать кнопку Сохранить если отличий нет
  const testDataDifference = useMemo(() => {
    const isSame = JSON.stringify(currentTest) === JSON.stringify(testData.data);
    return isSame || !currentTest.questions.length || !currentTest.title;
  }, [currentTest, testData.data]);

  // Запросы для создания/редактирования теста
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

  // Значение строки с количеством вопросов с парвильным склонением
  const questionAmount = useMemo(
    () => getQuestionAmount(currentTest.questions?.length),
    [currentTest.questions]
  );

  const handleOpenSubDrawer = useCallback(
    (data?: QuestionResponse, index?: number) => {
      setQuestionSubdrawer(
        data && index ? { isCreating: false, data, index } : initialStateQuestionDrawer
      );
      !currentTest.id && handleCreateTest();
      openSubDrawer();
    },
    [currentTest, openSubDrawer]
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
      onClose();
    }
  }, [testData.isCreating, createTest, updateTest, onClose]);

  // Обновление внутреннего состояния Drawer (сетим пустое значение если никаких данных нет)
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
          <Space height={12} />
          <Input
            name='title'
            type='text'
            value={currentTest.title}
            onChange={handleTitleChange}
          />
          <Space height={28} />
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
          <Switch
            isActive={currentTest.published}
            onSwitch={handlePublishChange}
            // disabled={true}
          />
        </Box>
        <Text color={colors.GREY} fontSize='16px' fontWeight={500}>
          {questionAmount}
        </Text>

        {!!currentTest.questions.length && (
          <Box width='100%' mt='40px'>
            <Space height={33.5} />
            {currentTest.questions.map((question, index) => (
              <QuestionListItem
                key={question.id}
                question={question}
                index={index}
                handleOpenSubDrawer={handleOpenSubDrawer}
              />
            ))}
          </Box>
        )}
      </DrawerContent>
      <Button
        view='ghost'
        onClick={() => handleOpenSubDrawer()}
        disabled={!currentTest.title}
      >
        Добавить вопрос
      </Button>
      <Space height={20} />
      <Button view='primary' onClick={handleCreateTest} disabled={testDataDifference}>
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
