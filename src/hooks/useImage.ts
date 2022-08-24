import { useQuery } from 'react-query';
import { QuestionService } from 'api/services/QuestionService';

export const useImage = (test_id: number, question_id: number) => {
  const {
    data: image,
    isError,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery(
    ['Image', test_id, question_id],
    () => QuestionService.getImage(test_id, question_id),
    {
      // onSuccess: ({ data }) => {
      //   data
      // },
      enabled: !!test_id && !!question_id,
      retry: 0,
    }
  );

  return { image, isLoading, isError, refetch, isRefetching };
};
