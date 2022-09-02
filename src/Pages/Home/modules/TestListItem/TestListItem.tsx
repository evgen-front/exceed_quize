import { FC, memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { useAtom } from 'jotai';

import { AtentionModal } from 'Pages/Home/modules/TestListItem/utils/AtentionModal';
import { Card, Box, Text, Space, Button } from 'components';
import { TestService } from 'api/services/TestService';
import { getQuestionAmount } from 'Pages/Home/utils';
import { getSessionPath } from 'Router/routes';
import { useBoolean } from 'hooks/useBoolean';
import { userAtom } from 'atoms/userAtom';

import { RiPencilFill, RiDeleteBin6Fill } from 'react-icons/ri';
import EyeIcon from 'public/icons/eye-fill.svg';
import EyeCloseIcon from 'public/icons/eye-off-fill.svg';
import { TestResponse } from 'types';
import { colors } from 'consts';
import { Icon } from 'components/Input/styled';

interface TestListItemProps {
  test: TestResponse;
  openDrawer: (data: TestResponse) => void;
}

export const TestListItem: FC<TestListItemProps> = memo(({ test, openDrawer }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [user] = useAtom(userAtom);
  const questionAmount = useMemo(
    () => getQuestionAmount(test.questions?.length),
    [test.questions.length]
  );
  const [isDeleteModalOpen, { setTrue: openDeleteModal, setFalse: closeDeleteModal }] =
    useBoolean();

  const { mutateAsync: deleteTestRequest } = useMutation(
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
      await deleteTestRequest(test.id);
    }
    closeDeleteModal();
  };

  return (
    <>
      <Card>
        <Box display='flex' alignItems='center'>
          <Text fontSize='20px' fontWeight={700}>
            {test.title}
          </Text>
          {(user?.is_admin || (user?.is_moderator && test.holder_id === user.id)) && (
            <>
              <Box width={20} height={24} ml={15} color={colors.GREY}>
                <Icon src={test.published ? EyeIcon : EyeCloseIcon} alt='visible' />
              </Box>
              <Box display='flex' marginLeft='auto' paddingLeft={20}>
                <RiPencilFill
                  color={colors.GREY}
                  size={20}
                  onClick={() => openDrawer(test)}
                />
                <Space width={17} />
                <RiDeleteBin6Fill
                  color={colors.GREY}
                  size={20}
                  onClick={openDeleteModal}
                />
              </Box>
            </>
          )}
        </Box>
        <Space height={12} />
        <Text fontSize={16} fontWeight={600} color={colors.GREY} letterSpacing='0.025em'>
          {questionAmount}
        </Text>
        <Space height={32} />
        <Button
          view='primary'
          onClick={() =>
            navigate(getSessionPath(test.id), { state: { duration: test.duration } })
          }
          disabled={!test.questions.length}
        >
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
