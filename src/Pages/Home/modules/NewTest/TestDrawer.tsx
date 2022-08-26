import { FC, useEffect, useMemo, useState, useCallback, memo } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { BackButton, DrawerContent, DrawerHeader } from 'components/Drawer/styles';
import { createTestAction, updateTestAction } from 'api/action-creators';
import { Button, Switch, Drawer, Box, Space, Text } from 'components';
import { QuestionListItem } from './modules/QuestionListItem';
import { getQuestionAmount } from 'Pages/Home/utils';
import { Input } from 'components/Input';
import { SubDrawer } from './modules';
import { useBoolean } from 'hooks';
import { colors } from 'consts';

import {
  NewTestDataType,
  QuestionResponse,
  questionsSubdrawerType,
  TestResponse,
} from 'types';
import { testInDrawerType } from '../TestList';
import { RiArrowLeftLine } from 'react-icons/ri';

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

const initialStateQuestionSubdrawer = {
  isCreating: true,
  index: null,
  data: null,
};

export const TestDrawer: FC<DrawerProps> = memo(({ isVisible, onClose, testData }) => {
  const [isSubDrawerOpen, { setTrue: openSubDrawer, setFalse: closeSubDrawer }] =
    useBoolean();
  const [currentTest, setCurrentTest] = useState<TestResponse | NewTestDataType>(
    initialTestState
  );
  const [questionSubdrawer, setQuestionSubdrawer] = useState<questionsSubdrawerType>(
    initialStateQuestionSubdrawer
  );
  const queryClient = useQueryClient();

  // Разница между внутренним состоянием и состоянием которые пришло при открытии Drawer
  // А так же наличие title и хотя бы 1-го вопроса
  // Для того что бы заблокировать кнопку Сохранить если отличий нет
  const testDataDifference = useMemo(() => {
    const isSame = JSON.stringify(currentTest) === JSON.stringify(testData.data);
    return isSame || !currentTest.title;
  }, [currentTest, testData.data]);

  const { mutateAsync: createTest } = useMutation(createTestAction, {
    onSuccess: () => {
      queryClient.invalidateQueries('testList');
    },
  });

  const { mutateAsync: updateTest } = useMutation(updateTestAction, {
    onSuccess: () => {
      queryClient.invalidateQueries('testList');
    },
  });

  // Значение строки с количеством вопросов с правильным склонением
  const questionAmount = useMemo(
    () => getQuestionAmount(currentTest.questions?.length),
    [currentTest.questions]
  );

  const handleSaveTest = useCallback(() => {
    if (testData.isCreating && !testData.data?.id) {
      createTest({ currentTest });
    } else {
      updateTest({ test_id: currentTest.id!, currentTest });
      onClose();
    }
  }, [testData, createTest, updateTest, onClose, currentTest]);

  const handleOpenSubDrawer = useCallback(
    (data?: QuestionResponse, index?: number) => {
      setQuestionSubdrawer(
        data && index ? { isCreating: false, data, index } : initialStateQuestionSubdrawer
      );
      // Создаем тест если его нет и получаем id теста
      !currentTest.id && handleSaveTest();
      openSubDrawer();
    },
    [currentTest, openSubDrawer, handleSaveTest]
  );

  // Обновление внутреннего состояния Drawer (устанавливаем значение по умолчанию если не передали данные)
  useEffect(() => {
    setCurrentTest(testData.data || initialTestState);
  }, [isVisible, testData.data]);

  useEffect(() => {
    if (currentTest) {
      setQuestionSubdrawer((prevState) => ({
        ...prevState,
        data: currentTest.questions[currentTest.questions.length - 1],
      }));
    }
  }, [currentTest]);

  return (
    <Drawer open={isVisible} onClose={onClose}>
      <DrawerHeader>
        <BackButton onClick={onClose}>
          <RiArrowLeftLine />
        </BackButton>
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
            onChange={(e) =>
              setCurrentTest((prevState) => ({
                ...prevState,
                title: e.target.value,
              }))
            }
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
            onSwitch={() =>
              setCurrentTest((prevState) => ({
                ...prevState,
                published: !prevState.published,
              }))
            }
            disabled={!currentTest.questions.length}
          />
        </Box>
        <Text color={colors.GREY} fontSize='16px' fontWeight={500}>
          {questionAmount}
        </Text>
        <Space height={33.5} />
        {!!currentTest.questions.length && (
          <Box width='100%' flex='1 1 auto' style={{ overflow: 'auto' }}>
            {currentTest.questions.map((question, index) => (
              <QuestionListItem
                key={question.id}
                question={question}
                index={index}
                handleOpenSubDrawer={handleOpenSubDrawer}
                testId={currentTest.id!}
              />
            ))}
          </Box>
        )}
      </DrawerContent>
      <Box>
        <Button view='ghost' onClick={handleOpenSubDrawer} disabled={!currentTest.title}>
          Добавить вопрос
        </Button>
        <Space height={20} />
        <Button view='primary' onClick={handleSaveTest} disabled={testDataDifference}>
          Сохранить и закрыть
        </Button>
      </Box>

      {currentTest.id && (
        <SubDrawer
          open={isSubDrawerOpen}
          onClose={closeSubDrawer}
          questionData={questionSubdrawer}
          testId={currentTest.id}
        />
      )}
    </Drawer>
  );
});
