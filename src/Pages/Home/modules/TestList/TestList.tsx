import { FC, memo, Fragment, useCallback, useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { useTests } from 'hooks/useTests';
import { userAtom } from 'atoms/userAtom';
import { Box, Space, Text } from 'components';
import { TestListItem } from '../TestListItem';
import { TestDrawer } from 'Pages/Home/modules/NewTest/TestDrawer';
import { AddButton } from 'Pages/Home/modules/AddButton';
import { useBoolean } from 'hooks/useBoolean';
import { TestResponse } from 'types';

export type testInDrawerType = {
  isCreating: boolean;
  data: TestResponse | null;
};

const initialDrawerStateTest = {
  isCreating: true,
  data: null,
};

export const TestsList: FC = memo(() => {
  const [user] = useAtom(userAtom);
  const { isLoading, isError, testList } = useTests();
  const [isDrawerOpen, { setTrue: openDrawer, setFalse: closeDrawer }] = useBoolean();
  const [testInDrawer, setTestInDrawer] =
    useState<testInDrawerType>(initialDrawerStateTest);

  const handleOpenDrawer = useCallback(
    (data?: TestResponse) => {
      setTestInDrawer(data ? { isCreating: false, data } : initialDrawerStateTest);
      openDrawer();
    },
    [openDrawer]
  );

  // Когда мы сохраням тест при редактировании или создании, то прокидываем новые данные от сервера в Drawer и получаем id для теста
  // Так как добавленый тест всегда последний обращаемся к последнему элементу массива
  // Если мы редактируем тест, то просто прокидываем данные
  // Это необходио для создания вопросов в тесте
  useEffect(() => {
    if (testList && isDrawerOpen) {
      setTestInDrawer((prevState) => ({
        ...prevState,
        data: testInDrawer.isCreating
          ? testList[testList?.length - 1]
          : (testList.find((test) => test.id === testInDrawer.data?.id) as TestResponse),
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testList]);

  if (isLoading) {
    return <div>Загрузка</div>;
  }

  if (isError) {
    return <div>Ошибка загрузки</div>;
  }

  return (
    <Box padding='46px 25px 0'>
      <Text fontSize={24} fontWeight={700}>
        {!!testList?.length ? 'Доступные тесты :' : 'Нет доступных тестов'}
      </Text>
      <Space height={36} />
      <Box>
        {testList
          ? testList.map((test) => (
              <Fragment key={test.id}>
                <TestListItem test={test} openDrawer={handleOpenDrawer} />
                <Space height={20} />
              </Fragment>
            ))
          : 'Нет тестов'}
      </Box>

      {(user?.is_admin || user?.is_moderator) && (
        <Box position='fixed' bottom='95px' right='25px'>
          <AddButton onClick={() => handleOpenDrawer()} />
        </Box>
      )}

      <TestDrawer
        isVisible={isDrawerOpen}
        onClose={closeDrawer}
        testData={testInDrawer}
      />
    </Box>
  );
});
