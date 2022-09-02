import { SessionService } from 'api/services/SessionService';
import { Box, Text } from 'components';
import { colors } from 'consts';
import { FC, useEffect } from 'react';
import { useQuery } from 'react-query';
import { TestResponse } from 'types';

interface TestSessionsItemProps {
  test: TestResponse;
}

export const useSessions = (test_id: number) => {
  const {
    data: sessionsList,
    isError,
    isLoading,
    refetch,
  } = useQuery(['sessionsList', test_id], () => SessionService.getSessions(test_id), {
    select: ({ data }) => data.sort((a, b) => b.id - a.id),
    enabled: !!test_id,
  });

  return { sessionsList, isError, refetch, isLoading };
};

export const TestSessionsItem: FC<TestSessionsItemProps> = ({ test }) => {
  const { sessionsList } = useSessions(test.id);

  return (
    <Box>
      <Text fontWeight={500} fontSize={16}>
        Тест: {test.title}
      </Text>
      <hr />
      <Box>
        {sessionsList?.map((session) => {
          const date = session.finished_date
            ? new Date(session.finished_date).toLocaleString()
            : 'Не закончен';
          return (
            <Box m='5px 0'>
              <Text fontSize={16}>{date}</Text>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
