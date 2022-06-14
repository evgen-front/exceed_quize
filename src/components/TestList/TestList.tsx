import { Test } from '../../types/types';
import { TestListItem } from '../TestListItem/TestListItem';
import './testList.scss';

export const TestsList = ({
  tests,
  maxHeight = '100%',
  refetch,
}: {
  tests: Test[];
  maxHeight?: string;
  refetch?: () => void;
}) => {
  return (
    <div className='testListWrapper' style={{ maxHeight }}>
      <h2>Мои тесты</h2>
      {tests &&
        tests.map(
          (test, index) =>
            refetch && (
              <TestListItem refetch={refetch} key={`test_${index}`} test={test} />
            )
        )}
    </div>
  );
};
