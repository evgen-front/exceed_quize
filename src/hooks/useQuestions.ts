import { useQuery } from 'react-query';
import { QuestionService } from 'api/services/QuestionService';
import { QuestionResponse } from 'types';

export const useQuestions = (id: any) => {
  const {
    data: questions,
    isError,
    isLoading,
    refetch,
  } = useQuery('Questions', () => QuestionService.getQuestions(id), {
    select: ({ data }): QuestionResponse[] => data.sort((a, b) => a.id - b.id),
  });

  return { questions, isError, refetch, isLoading };
};
