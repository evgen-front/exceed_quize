import { useQuery } from 'react-query';
import { AnswerService } from 'api/services/AnswerService';
import { AnswerResponse } from 'types';

export const useAnswers = (id: any) => {
  const {
    data: answers,
    isError,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery('Answers', () => AnswerService.getAnswers(id), {
    select: ({ data }): AnswerResponse[] => data.sort((a, b) => a.id - b.id),
    enabled: !!id,
  });

  return { answers, isError, refetch, isRefetching };
};
