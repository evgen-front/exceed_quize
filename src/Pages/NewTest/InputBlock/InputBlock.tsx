import { Button, Checkbox, Input } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormState } from '../../../hooks/useForm';
import './InputBlock.scss';
import { Box, Text } from 'components';

interface InputBlockProps {
  testName: string;
  handleChange: (text: string, value: string) => void;
  handleTestPublic: () => void;
  handleSubmit: () => void;
  errors: FormState;
  testPublished: boolean;
  // testEditFlag?: boolean
}

export const InputBlock: FC<InputBlockProps> = ({
  testName,
  handleChange,
  handleTestPublic,
  handleSubmit,
  errors,
  testPublished,
  // testEditFlag
}) => {
  const { id } = useParams();

  return (
    <div className='NT_createTest'>
      <div className='NT_createTest_inputBlock'>
        <Input
          name='title'
          placeholder='Введите название теста'
          value={testName}
          onChange={(e) => handleChange('testName', e.target.value)}
        />
        {errors?.testName && (
          <p className='NT_createTest_inputBlock_error'>{errors?.testName}</p>
        )}
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Text>Опубликован</Text>
        </Box>
      </div>
      <Button
        className='NTSaveButton'
        type='primary'
        shape='round'
        size={'middle'}
        onClick={handleSubmit}
      >
        {id ? 'Сохранить' : 'Далее'}
      </Button>
    </div>
  );
};
