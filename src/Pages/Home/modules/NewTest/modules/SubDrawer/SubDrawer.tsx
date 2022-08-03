import React, { FC, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { RiCloseFill } from 'react-icons/ri';
import { BackButton, DrawerHeader } from 'components/Drawer/styles';
import { colors } from 'consts';
import { Box, Button, Drawer, Input, QuestionImage, Space, Text } from 'components';
import { Question } from '../../types';

interface SubDrawerProps {
  open: boolean;
  onClose: () => void;
  currentIndex: number;
  currentQuestion: Question;
  mode: 'create' | 'edit';
  addAnswer: (index: number) => void;
  deleteQuestion: (index: number) => void;
  deleteAnswer: (index: number, id: number) => void;
  handleAnswerValue: (index: number, id: number, value: string) => void;
  handleQuestionTitle: (index: number, value: string) => void;
  chooseRightAnswer: (index: number, id: number) => void;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  addImage: (index: number, acceptedFiles: File[]) => void;
  deleteImage: (index: number) => void;
}

export const SubDrawer: FC<SubDrawerProps> = ({
  open,
  onClose,
  currentQuestion,
  currentIndex,
  addAnswer,
  deleteAnswer,
  deleteQuestion,
  handleAnswerValue,
  handleQuestionTitle,
  chooseRightAnswer,
  goToNextQuestion,
  goToPreviousQuestion,
  addImage,
  deleteImage,
  mode,
}) => {
  const [isError, setIsError] = useState<boolean>(false);
  const withImage = !!currentQuestion?.image;
  const isCreatingTest = mode === 'create';
  const inputsAreFilled =
    currentQuestion.answers.every(({ text }) => !!text) && currentQuestion.text;
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      addImage(currentIndex, acceptedFiles);
    },
    [currentIndex]
  );

  const onClick = () => {
    if (inputsAreFilled) {
      if (isError) {
        setIsError(false);
      }
      goToNextQuestion();
      return;
    }
    if (!isError) {
      setIsError(true);
    }
  };

  const onBackClick = () => {
    if (!inputsAreFilled && !!currentIndex) {
      deleteQuestion(currentIndex);
    }
    goToPreviousQuestion();
  };

  const onSaveClick = () => {
    if (inputsAreFilled) {
      if (isError) {
        setIsError(false);
      }
      return;
    }
    if (!isError) {
      setIsError(true);
    }
  };

  const {
    getRootProps,
    getInputProps,
    open: openDropzone,
  } = useDropzone({ onDrop, multiple: false, noClick: true, noKeyboard: true });
  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerHeader>
        <BackButton onClick={onBackClick}>{'<'}</BackButton>
        <p>Вопрос {currentIndex + 1}</p>
      </DrawerHeader>
      <Box flex={1}>
        <Text fontWeight={500} fontSize={16}>
          Вопрос
        </Text>
        <Space height={12} />
        <Input
          placeholder='Ведите вопрос'
          value={currentQuestion.text}
          errorMessage={!currentQuestion.text && isError ? 'Заполните поле' : ''}
          onChange={({ target: { value } }) => handleQuestionTitle(currentIndex, value)}
        />
        <Space height={30.5} />
        {withImage ? (
          <Box display='flex' width='100%' justifyContent='space-between'>
            <QuestionImage src={currentQuestion.image} />
            <Box
              display='flex'
              alignItems='center'
              height='fit-content'
              mt={15.5}
              onClick={() => deleteImage(currentIndex)}
            >
              <RiCloseFill color={colors.DANGER} size={20} />
              <Space width={5} />
              <Text color={colors.DANGER} fontSize={16} fontWeight={500}>
                Удалить
              </Text>
            </Box>
          </Box>
        ) : (
          <Box {...getRootProps()}>
            <input {...getInputProps()} />
            <Text fontSize={16} fontWeight={500} onClick={openDropzone}>
              + Добавить изображение
            </Text>
          </Box>
        )}

        <Box mt={50.5}>
          <Text>Варианты ответов</Text>
          <Space height={12} />
          <Box maxHeight={withImage ? 300 : 395} overflow='auto'>
            {currentQuestion.answers.map(({ text, is_true, id }, i) => (
              <React.Fragment key={id}>
                <Input
                  withAnswerControls
                  isRight={is_true}
                  value={currentQuestion.answers[i].text}
                  errorMessage={!text && isError ? 'Заполните поле' : ''}
                  onDelete={() => deleteAnswer(currentIndex, id)}
                  onCheck={() => chooseRightAnswer(currentIndex, id)}
                  onChange={({ target: { value } }) =>
                    handleAnswerValue(currentIndex, id, value)
                  }
                />
                <Space height={20} />
              </React.Fragment>
            ))}
            <Text fontSize={16} fontWeight={500} onClick={() => addAnswer(currentIndex)}>
              + Добавить вариант ответа
            </Text>
          </Box>
        </Box>
      </Box>

      <Box justifySelf='end'>
        {isCreatingTest ? (
          <>
            <Button view='ghost' onClick={onClick}>
              Следующий вопрос
            </Button>
            <Space height={20} />
            <Button view='primary' onClick={onSaveClick}>
              Сохранить и закрыть
            </Button>
          </>
        ) : (
          <Button view='ghost'>Сохранить</Button>
        )}
      </Box>
    </Drawer>
  );
};
