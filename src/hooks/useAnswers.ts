import { useQuery } from 'react-query';
import { AnswerService } from 'api/services/AnswerService';
import { AnswerResponse } from 'types';

export const useAnswers = (questionId: number) => {
  const {
    data: answers,
    isError,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery(['Answers', questionId], () => AnswerService.getAnswers(questionId), {
    select: ({ data }): AnswerResponse[] => data.sort((a, b) => a.id - b.id),
    enabled: !!questionId,
  });

  return { answers, isLoading, isError, refetch, isRefetching };
};
