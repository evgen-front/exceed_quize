import { useQuery } from 'react-query';
import { AnswerService } from 'services/AnswerService';
import { AnswerResponse } from 'types/types';

export const useAnswers = (id: any) => {
  const {
    data: answers,
    isError,
    isLoading,
    refetch,
  } = useQuery('Answers', () => AnswerService.getAnswers(id), {
    select: ({ data }): AnswerResponse[] => data.sort((a, b) => a.id - b.id),
    enabled: !!id,
  });

  return { answers, isError, refetch, isLoading };
};
