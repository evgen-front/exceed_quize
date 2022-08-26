import { SessionService } from 'api/services/SessionService';
import { useQuery } from 'react-query';
import { QuestionResponse } from 'types';

export const useSession = (test_id: number) => {
  const { isLoading: isSessionDataLoading, data: sessionData } = useQuery(
    [],
    () => SessionService.createSession(Number(test_id)),
    {
      select: ({ data }) => {
        const sortedQuestions = data.questions.sort((a, b) => a.ordering - b.ordering);
        const result: {
          questions: QuestionResponse[];
          sessionId: number;
        } = { questions: sortedQuestions || [], sessionId: data.id };

        return result;
      },
      enabled: !!test_id,
    }
  );
  return { isSessionDataLoading, sessionData };
};
