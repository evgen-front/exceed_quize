import { DeleteTwoTone, EditTwoTone, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useEffect, useState } from 'react';
import { useForm, Validations } from '../../../hooks/useForm';
import { AnswerService } from '../../../services/AnswerService'; //!!!
import { Answer } from '../../../types/types'; //!!!
import './AddAnswer.scss';
import { EditBlock } from './EditBlock/EditBlock';

const validations: Validations = {
  answerName: {
    required: {
      value: true,
      message: 'Введите текст ответа',
    },
  },
};

interface UpdateAnswerProps {
  questionId: number | null;
  id: number | null;
  text: string;
  e?: CheckboxChangeEvent;
}

export const AddAnswer = ({ questionId }: { questionId: number | null }) => {
  const [answerId, setAnswerId] = useState<string>('');
  const [answerList, setAnswerList] = useState<Answer[]>([]);
  const [addAnswerFlag, setAddAnswerFlag] = useState<boolean>(false);
  const [editAnswerId, setEditAnswerId] = useState<number | null>(null);

  const getAnswers = (): void => {
    AnswerService.getAnswers(questionId)
      .then((res) => setAnswerList(res.data))
      .catch((err) => console.log(err)); //!!!
  };

  const updateAnswer = ({ questionId, id, text, e }: UpdateAnswerProps): void => {
    const data = e ? { text, is_true: e?.target.checked } : { text };
    AnswerService.updateAnswer(questionId, id, data)
      .then((res) => getAnswers())
      .catch((err) => console.log(err.message));
  };

  const addAnswerFlagTrue = () => {
    setAddAnswerFlag(true);
  };

  const addAnswerFlagFalse = () => {
    setAddAnswerFlag(false);
    setEditAnswerId(null);
  };

  //@ts-ignore
  const handleRightAnswer = (
    e: CheckboxChangeEvent,
    id: number | null = editAnswerId,
    text: string = formState.answerName
  ): void => {
    updateAnswer({ questionId, id, text, e });
    setEditAnswerId(null);
  };

  const addAnswer = () => {
    AnswerService.createNewAnswer(questionId, { text: formState.answerName })
      .then((res) => setAnswerId(res.data.id))
      .catch((err) => console.log(err));
    setAddAnswerFlag(false);
    setEditAnswerId(null);
    reset();
  };

  const deleteAnswer = (id: number) => {
    AnswerService.deleteAnswer(questionId, id)
      .then((res) => getAnswers())
      .catch((err) => console.log(err.message));
  };

  const startEditAnswer = (id: number, text: string) => {
    setEditAnswerId(id);
    handleChange('answerName', text);
  };

  //@ts-ignore
  const { formState, handleChange, handleSubmit, errors, reset } = useForm({
    validations,
    onSubmit: editAnswerId ? handleRightAnswer : addAnswer,
  });

  useEffect(() => {
    questionId && getAnswers();
  }, [questionId, answerId]);

  return (
    <div className='answerWrap'>
      <div className='answer_viewBlock'>
        <p className='answer_viewBlock_title'>Ответы:</p>
        <div className='answer_viewBlock_list'>
          {answerList.length ? (
            answerList.map(({ id, text, is_true }) => (
              <div key={`answerItem_${id}`} className='answer_viewBlock_list_item'>
                {editAnswerId === id ? (
                  <EditBlock
                    answerName={formState.answerName}
                    errors={errors}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    addAnswerFlagFalse={addAnswerFlagFalse}
                  />
                ) : (
                  <>
                    <p className='answer_viewBlock_list_item_description'>- {text}</p>
                    <div className='answer_viewBlock_list_item_iconBlock'>
                      <Checkbox
                        name='isRightAnswer'
                        onChange={(e) => id && handleRightAnswer(e, id, text)}
                        checked={is_true}
                      ></Checkbox>
                      <EditTwoTone onClick={() => id && startEditAnswer(id, text)} />
                      <DeleteTwoTone onClick={() => id && deleteAnswer(id)} />
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <p>Для этого вопроса нет ни одного ответа</p>
          )}
        </div>
      </div>
      <div className='answer_addAnswerBlock'>
        {addAnswerFlag ? (
          <EditBlock
            answerName={formState.answerName}
            errors={errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            addAnswerFlagFalse={addAnswerFlagFalse}
          />
        ) : (
          <Button
            className='answer_addAnswerBlock_addButton'
            type='primary'
            shape='round'
            icon={<PlusOutlined />}
            size={'middle'}
            onClick={addAnswerFlagTrue}
          >
            Добавить ответ
          </Button>
        )}
      </div>
    </div>
  );
};
