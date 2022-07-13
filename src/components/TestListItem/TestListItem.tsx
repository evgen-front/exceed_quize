import { CaretRightFilled, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { TestService } from '../../services/TestService';
import { Test } from '../../types/types';
import './testListItem.scss';
import { Modal } from 'antd';
import { FC } from 'react';
import { getSessionPath, getTestEditPath } from '../../Router/routes';

interface TestListItemProps {
  test: Test;
  refetch: () => void;
}

export const TestListItem: FC<TestListItemProps> = ({ test, refetch }) => {
  const { confirm } = Modal;

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
      TestService.deleteTest(test.id)
        .then(() => refetch())
        .catch((err) => console.log(err.message));
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
          <DeleteOutlined onClick={showDeleteConfirm} />
        </div>
      </div>
      <div className='testListItem_bottom'>
        <div className='testListItem_progress'>{questionAmount(test)}</div>
      </div>
    </div>
  );
};
