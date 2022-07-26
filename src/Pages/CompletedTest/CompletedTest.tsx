import { SessionService } from 'api/services/SessionService';
import { Box, Button, Space, Text } from 'components';
import { Drawer } from 'components/Drawer/Drawer';
import { useBoolean } from 'hooks/useBoolean';
import { FC, Fragment, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Navigate, NavLink, useLocation } from 'react-router-dom';
import { Background, ResultCard, ResultItem } from './styled';
import { resultMessage } from './utils';

const useUserAnswers = (session_id: number) => {
  const {
    data: resultState,
    isLoading,
    refetch,
  } = useQuery(['UserAnswers'], () => SessionService.getUserAnswer(session_id), {
    select: ({ data }) => data.sort((a, b) => b.question.ordering - a.question.ordering),
    enabled: !!session_id,
  });
  return { resultState, isLoading, refetch };
};

interface CompletedTestState {
  lenght: number;
  rightAnswers: number;
  sessionId: number;
}

export const CompletedTest: FC = () => {
  const location = useLocation();
  const state = location.state as CompletedTestState;
  const [isFirstRequest, setIsFirstRequest] = useState(true);
  const [isResultOpen, { setTrue: openResult, setFalse: closeResult }] = useBoolean();
  const { textMessge, emoji, color } = resultMessage(state.rightAnswers, state.lenght);
  const { resultState, isLoading, refetch } = useUserAnswers(state && state.sessionId);

  useEffect(() => {
    if (isResultOpen && isFirstRequest) {
      refetch();
      setIsFirstRequest(false);
    }
  }, [isResultOpen, refetch, isFirstRequest]);

  if (!state) {
    return <Navigate to='/' />;
  }

  return (
    <Background>
      <ResultCard>
        <Box display='flex' flexDirection='column' alignItems='center'>
          <Text fontWeight='700' fontSize='36px' textAlign='center'>
            {textMessge}
          </Text>
          <Space height='70px' />
          <Text fontWeight='700' fontSize='46px' color={color}>
            {state.rightAnswers}/{state.lenght}
          </Text>
          <Space height='55px' />
          <Text fontSize='80px'>{emoji}</Text>
        </Box>
        <Box>
          <Button onClick={openResult}>Посмотреть ответы</Button>
          <Space height='20px' />
          <NavLink to={'/'}>
            <Button view='ghost'>Закрыть</Button>
          </NavLink>
        </Box>
      </ResultCard>

      <Drawer open={isResultOpen} onClose={closeResult}>
        <Text fontWeight={700} fontSize={24} textAlign='center'>
          Ответы
        </Text>
        <Space height='40px' style={{ flexShrink: '0' }} />
        <Box flex={'1 1 auto'} overflow={'auto'}>
          {!isLoading && resultState
            ? resultState.map(({ question, right_answer, answer }, index) => (
                <Fragment key={index}>
                  <ResultItem isTrue={answer.is_true}>
                    <Text fontSize={16}>
                      <b>Вопрос {++index}</b>
                      &nbsp;
                      {question.text}
                    </Text>
                    <Space height={25} />
                    <Text fontSize={14}>
                      <b>Правильный ответ:</b>
                      &nbsp;
                      {right_answer.text}
                    </Text>
                  </ResultItem>
                  <Space height={12} />
                </Fragment>
              ))
            : 'Загрузка'}
        </Box>
        <Box>
          <Space height='20px' />
          <Button onClick={closeResult}>Закрыть</Button>
        </Box>
      </Drawer>
    </Background>
  );
};
