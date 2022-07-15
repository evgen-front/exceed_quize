import { FC, memo, Fragment } from 'react';
import { useTests } from 'hooks/useTests';
import { Box, Space } from 'components';
import { TestListItem } from '../TestListItem/TestListItem';
import './testList.scss';

export const MemoizedTestsList: FC = memo(function TestsList() {
  const { isLoading, isError, testList } = useTests();

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
              <TestListItem test={test} />
              <Space height='20px' />
            </Fragment>
          ))}
      </Box>
    </>
  );
});
