import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { RiPencilFill, RiDeleteBin6Fill } from 'react-icons/ri';
import { Modal } from 'antd';
import { HomeService } from 'services/HomeService';
import { Test } from 'types/types';
import { getSessionPath, getTestEditPath } from 'Router/routes';
import { Card, Box, Text, Space, Button } from 'components';
import { colors } from 'consts';
import { userAtom } from 'atoms/userAtom';
import { getQuestionAmount } from 'Pages/Home/utils';

interface TestListItemProps {
  test: Test;
  refetch: () => void;
}

export const TestListItem: FC<TestListItemProps> = ({ test, refetch }) => {
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();
  const { confirm } = Modal;

  const questionAmount = getQuestionAmount(test.questions?.length);

  const showDeleteConfirm = () => {
    confirm({
      title: 'Подтвердить удаление теста?',
      okText: 'Подтвердить',
      okType: 'danger',
      cancelText: 'Отменить',
      onOk() {
        deleteTest();
      },
    });
  };

  const deleteTest = () => {
    test.id &&
      HomeService.deleteTest(test.id)
        .then(() => refetch())
        .catch((err) => console.log(err.message));
  };

  return (
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
            <RiDeleteBin6Fill color={colors.GREY} size={20} onClick={showDeleteConfirm} />
          </Box>
        )}
      </Box>
      <Space height={12} />
      <Text
        fontSize={16}
        fontWeight={600}
        color={colors.GREY}
      >{`${questionAmount} / 10`}</Text>
      <Space height={32} />
      <Button view='primary' onClick={() => navigate(getSessionPath(test.id))}>
        Начать
      </Button>
    </Card>
  );
};
