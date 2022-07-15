import React, { FC, Fragment } from 'react';
import { Test } from 'types/types';
import { Box, Space } from 'components';
import { TestListItem } from '../TestListItem/TestListItem';

interface TestListProps {
  tests: Test[];
  maxHeight?: string;
  refetch?: () => void;
}

export const TestsList: FC<TestListProps> = ({ tests, maxHeight = '100%', refetch }) => {
  return (
    <Box maxHeight={maxHeight}>
      {tests &&
        tests.map(
          (test, index) =>
            refetch && (
              <Fragment key={test.id}>
                <TestListItem refetch={refetch} key={`test_${index}`} test={test} />
                <Space height='20px' />
              </Fragment>
            )
        )}
    </Box>
  );
};
