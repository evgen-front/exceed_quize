import { FC, memo, Fragment, useState, useCallback } from 'react';
import { useAtom } from 'jotai';
import { useTests } from 'hooks/useTests';
import { userAtom } from '../../../../atoms/userAtom';
import { Box, Space, Text } from 'components';
import { TestListItem } from '../TestListItem';
import { CreateDrawer } from 'Pages/Home/modules/NewTest/CreateTest';
import { AddButton } from 'Pages/Home/modules/AddButton';
import { useBoolean } from 'hooks/useBoolean';
import { Question } from '../NewTest/types';
import { TestResponse } from 'types';

let mode: 'create' | 'edit' = 'create';
let index = 0;

export const TestsList: FC = memo(() => {
  const [user] = useAtom(userAtom);
  const { isLoading, isError, testList } = useTests();
  const [isDrawerOpen, { setTrue: openDrawer, setFalse: closeDrawer }] = useBoolean();

  const handleOpenEditDrawer = useCallback(
    (i: number) => {
      mode = 'edit';
      index = i;
      openDrawer();
    },
    [openDrawer]
  );

  const handleOpenCreateDrawer = useCallback(() => {
    mode = 'create';
    openDrawer();
  }, [openDrawer]);

  if (isLoading) {
    return <div>Загрузка</div>;
  }

  if (isError) {
    return <div>Ошибка загрузки</div>;
  }

  return (
    <>
      <Text fontSize={24} fontWeight={700}>
        {!!testList?.length ? 'Доступные тесты:' : 'Нет доступных тестов'}
      </Text>
      <Space height={36} />
      <Box>
        {testList
          ? testList.map((test, i) => (
              <Fragment key={test.id}>
                <TestListItem test={test} openDrawer={() => handleOpenEditDrawer(i)} />
                <Space height='20px' />
              </Fragment>
            ))
          : 'Нет тестов'}
      </Box>
      {user?.is_admin && (
        <Box position='fixed' bottom='95px' right='25px'>
          <AddButton onClick={handleOpenCreateDrawer} />
        </Box>
      )}
      <CreateDrawer
        isVisible={isDrawerOpen}
        index={index}
        onClose={closeDrawer}
        mode={mode}
      />
    </>
  );
});
