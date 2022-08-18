import { FC, memo, Fragment, useCallback, useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { useTests } from 'hooks/useTests';
import { userAtom } from 'atoms/userAtom';
import { Box, Space, Text } from 'components';
import { TestListItem } from '../TestListItem';
import { TestDrawer } from 'Pages/HomeTEST/modules/NewTest/TestDrawer';
import { AddButton } from 'Pages/HomeTEST/modules/AddButton';
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

  // Когда мы сохраням тест при редактировании, то прокидываем новые данные от сервера в Drawer и получаем id для теста
  // Так как добавленый тест всегда последний обращаемся к последнему элементу массива
  // Это необходио для создания вопросов в тесте
  useEffect(() => {
    if (testList) {
      setTestInDrawer((prevState) => ({
        ...prevState,
        data: testList[testList?.length - 1],
      }));
    }
  }, [testList]);

  if (isLoading) {
    return <div>Загрузка</div>;
  }

  if (isError) {
    return <div>Ошибка загрузки</div>;
  }

  return (
    <>
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

      {user?.is_admin && (
        <Box position='fixed' bottom='95px' right='25px'>
          <AddButton onClick={() => handleOpenDrawer()} />
        </Box>
      )}

      <TestDrawer
        isVisible={isDrawerOpen}
        onClose={closeDrawer}
        testData={testInDrawer}
      />
    </>
  );
});
