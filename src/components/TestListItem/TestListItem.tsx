import { FC, useState } from 'react';
import { TestService } from '../../services/TestService';
import { getSessionPath, getTestEditPath } from '../../Router/routes';
import { useMutation, useQueryClient } from 'react-query';
import { DelModal } from 'components/TestListItem/utils/DelModal';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { RiPencilFill, RiDeleteBin6Fill } from 'react-icons/ri';
import { Test } from 'types/types';
import { Card, Box, Text, Space, Button } from 'components';
import { colors } from 'consts';
import { userAtom } from 'atoms/userAtom';
import { getQuestionAmount } from 'Pages/Home/utils';

interface TestListItemProps {
  test: Test;
}

export const TestListItem: FC<TestListItemProps> = ({ test }) => {
  const queryClient = useQueryClient();
  const [isModal, setModal] = useState(false);
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();

  const handleModal = () => {
    setModal(!isModal);
  };

  const { mutateAsync } = useMutation(
    'deleteTest',
    (id: number) => TestService.deleteTest(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('testList');
      },
    }
  );

  const questionAmount = getQuestionAmount(test.questions?.length);

  const deleteTest = async () => {
    if (test.id) {
      await mutateAsync(test.id);
    }
    handleModal();
  };

  return (
    <>
      <Card>
        <Box
          display='flex'
          justifyContent={user?.is_admin ? 'space-between' : ''}
          alignItems='center'
        >
          <Text fontSize='20px' fontWeight={700}>
            {test.title}
          </Text>
          {user?.is_admin && (
            <Box display='flex'>
              <RiPencilFill
                color={colors.GREY}
                size={20}
                onClick={() => navigate(getTestEditPath(test.id))}
              />
              <Space width={17} />
              <RiDeleteBin6Fill color={colors.GREY} size={20} onClick={handleModal} />
            </Box>
          )}
        </Box>
        <Space height={12} />
        <Text fontSize={16} fontWeight={600} color={colors.GREY}>
          {questionAmount}
        </Text>
        <Space height={32} />
        <Button view='primary' onClick={() => navigate(getSessionPath(test.id))}>
          Начать
        </Button>
      </Card>

      <DelModal
        isVisible={isModal}
        content={<p>Вы уверены, что хотите удалить тест?</p>}
        onSubmit={deleteTest}
        onClose={handleModal}
      />
    </>
  );
};
