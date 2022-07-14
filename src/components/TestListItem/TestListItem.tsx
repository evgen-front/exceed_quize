import { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { TestService } from '../../services/TestService';
import { getSessionPath, getTestEditPath } from '../../Router/routes';
import { useMutation, useQueryClient } from 'react-query';
import { Test } from '../../types/types';
import { CaretRightFilled, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import './testListItem.scss';
import { DelModal } from 'components/TestListItem/utils/DelModal';
import { SessionService } from 'services/SessionService';
interface TestListItemProps {
  test: Test;
  refetch: () => void;
}

export const TestListItem: FC<TestListItemProps> = ({ test, refetch }) => {
  const queryClient = useQueryClient();
  const [isModal, setModal] = useState(false);

  const mutation = useMutation('createSession', () =>
    SessionService.getSessions(Number(test.id))
  );

  const { data } = mutation;

  console.log(data);

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

  const deleteTest = async () => {
    if (test.id) {
      await mutateAsync(test.id);
    }
    handleModal();
  };

  const questionAmount = (test: Test) => {
    if (test.questions) {
      const amount = test.questions.length;
      if (amount === 1) {
        return `${amount} вопрос`;
      }
      if (amount === 2 || amount === 3 || amount === 4) {
        return `${amount} вопроса`;
      }
      return `${amount} вопросов`;
    }
  };

  return (
    <>
      <div className='testListItem completed'>
        <div className='testListItem_header'>
          <div className='testListItem_title'>{test.title}</div>
          <div className='testListItem_buttons'>
            <NavLink to={getSessionPath(test.id)}>
              <CaretRightFilled />
            </NavLink>
            <NavLink to={getTestEditPath(test.id)}>
              <EditOutlined />
            </NavLink>
            <DeleteOutlined onClick={handleModal} />
            <button
              onClick={() => {
                mutation.mutateAsync();
              }}
            >
              нажми
            </button>
          </div>
        </div>
        <div className='testListItem_bottom'>
          <div className='testListItem_progress'>{questionAmount(test)}</div>
        </div>
      </div>

      <DelModal
        isVisible={isModal}
        content={<p>Вы уверены, что хотите удалить тест?</p>}
        onSubmit={deleteTest}
        onClose={handleModal}
      />
    </>
  );
};
