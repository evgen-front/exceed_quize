import { useQuery } from 'react-query';
import { TestService } from 'services/TestService';
import { TestResponse } from 'types/types';

export const useTests = () => {
  const {
    data: testList,
    isError,
    isLoading,
    refetch,
  } = useQuery('testList', TestService.getAllTests, {
    select: ({ data }): TestResponse[] => data.sort((a, b) => a.id - b.id),
  });

  return { testList, isError, refetch, isLoading };
};
