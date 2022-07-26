import { FC, memo, Fragment, useState, useCallback } from 'react';
import { useTests } from 'hooks/useTests';
import { Box, Space } from 'components';
import { TestListItem } from '../TestListItem/TestListItem';
import { CreateDrawer } from 'components/Drawer/NewTest/CreateTest';
import { AddButton } from 'Pages/Home/modules/AddButton';
import { useBoolean } from 'hooks/useBoolean';
import { TestResponse } from 'types';

export const TestsList: FC = memo(() => {
  const { isLoading, isError, testList } = useTests();
  const [isDrawerOpen, { setTrue: openDrawer, setFalse: closeDrawer }] = useBoolean();
  const [currentTestData, setCurrentTestData] = useState<TestResponse | null>(null);

  const handleOpenEditDrawer = useCallback(
    (data: TestResponse) => {
      setCurrentTestData(data);
      openDrawer();
    },
    [openDrawer]
  );

  const handleOpenCreateDrawer = useCallback(() => {
    setCurrentTestData(null);
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
      <Box>
        {testList?.length &&
          testList.map((test) => (
            <Fragment key={test.id}>
              <TestListItem test={test} openDrawer={handleOpenEditDrawer} />
              <Space height='20px' />
            </Fragment>
          ))}
      </Box>

      <Box position='fixed' bottom='95px' right='25px'>
        <AddButton onClick={handleOpenCreateDrawer} />
      </Box>

      <CreateDrawer
        isVisible={isDrawerOpen}
        data={currentTestData}
        onClose={closeDrawer}
      />
    </>
  );
});
