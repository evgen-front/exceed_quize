import { FC, memo } from 'react';
import { TestListItem } from '../TestListItem/TestListItem';
import { useTests } from 'hooks/useTests';
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
      {testList?.length &&
        testList.map((test, index) => <TestListItem key={`test_${index}`} test={test} />)}
    </>
  );
});
