import { CheckOutlined } from '@ant-design/icons';
import { AnswerResponse } from 'types';
import './AnswerItem.scss';

export interface AnswerItemProps {
  answer: AnswerResponse;
  onSelect: () => void;
  selected: boolean;
}

export const AnswerItem = ({ answer, onSelect, selected }: AnswerItemProps) => {
  return (
    <div
      className={`answer ${selected ? 'selected' : ''}`}
      onClick={selected ? undefined : onSelect}
    >
      <span className='answer_text'>{answer?.text}</span>
      <div className={`selected_sign  ${selected ? 'show' : 'hide'}`}>
        <CheckOutlined className='selected_sign_icon' />
      </div>
    </div>
  );
};
