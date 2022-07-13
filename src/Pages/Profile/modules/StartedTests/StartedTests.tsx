import { EmptyStartedTests } from '../../../../components/EmptyStartedTests/EmptyStartedTests';
import { TestsList } from '../../../../components/TestList/TestList';
import { Test } from '../../../../types/types';

export const StartedTests = ({ tests }: { tests?: Test[] | [] }) => {
  return (
    <>
      <h2>Активные тесты</h2>
      {/* {tests ? <TestsList tests={tests} /> : <EmptyStartedTests />} */}
    </>
  );
};
