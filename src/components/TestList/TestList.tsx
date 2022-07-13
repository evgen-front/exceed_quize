import { FC } from 'react';
import { TestListItem } from '../TestListItem/TestListItem';
import { useTests } from 'hooks/useTests';
import { Spin } from 'antd';
import './testList.scss';

export const TestsList: FC = () => {
  const { isLoading, isError, testList, refetch } = useTests();

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <div>Ошибка загрузки</div>;
  }

  return (
    <>
      {testList?.length &&
        testList.map((test, index) => (
          <TestListItem refetch={refetch} key={`test_${index}`} test={test} />
        ))}
    </>
  );
};
