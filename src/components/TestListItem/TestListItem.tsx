import { FC, memo, useMemo } from 'react';
import { TestService } from '../../api/services/TestService';
import { getSessionPath, getTestEditPath } from '../../Router/routes';
import { useMutation, useQueryClient } from 'react-query';
import { AtentionModal } from 'components/TestListItem/utils/AtentionModal';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { RiPencilFill, RiDeleteBin6Fill } from 'react-icons/ri';
import { TestResponse } from 'types';
import { Card, Box, Text, Space, Button } from 'components';
import { colors } from 'consts';
import { userAtom } from 'atoms/userAtom';
import { getQuestionAmount } from 'Pages/Home/utils';
import { useBoolean } from 'hooks/useBoolean';

interface TestListItemProps {
  test: TestResponse;
  openDrawer: (data: TestResponse) => void;
}

export const TestListItem: FC<TestListItemProps> = memo(({ test, openDrawer }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [user] = useAtom(userAtom);
  const questionAmount = useMemo(() => getQuestionAmount(test.questions?.length), []);
  const [isDeleteModalOpen, { setTrue: openDeleteModal, setFalse: closeDeleteModal }] =
    useBoolean();

  const { mutateAsync } = useMutation(
    'deleteTest',
    (id: number) => TestService.deleteTest(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('testList');
      },
    }
  );

  const deleteTest = async () => {
    if (test.id) {
      await mutateAsync(test.id);
    }
    closeDeleteModal();
  };

  return (
    <>
      <Card>
        <Box
          display='flex'
          justifyContent={user?.is_admin || true ? 'space-between' : ''}
          alignItems='center'
        >
          <Text fontSize='20px' fontWeight={700}>
            {test.title}
          </Text>
          {user?.is_admin ||
            (true && (
              <Box display='flex'>
                <RiPencilFill
                  color={colors.GREY}
                  size={20}
                  // onClick={() => navigate(getTestEditPath(test.id))}
                  onClick={() => openDrawer(test)}
                />
                <Space width={17} />
                <RiDeleteBin6Fill
                  color={colors.GREY}
                  size={20}
                  onClick={openDeleteModal}
                />
              </Box>
            ))}
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

      <AtentionModal
        isVisible={isDeleteModalOpen}
        text='Вы уверены, что хотите удалить тест?'
        onSubmit={deleteTest}
        onClose={closeDeleteModal}
        submitText='Удалить'
      />
    </>
  );
});
