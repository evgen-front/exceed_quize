import { FC, useEffect, useMemo, useState } from 'react';
import { Drawer } from '../Drawer';
import { Button } from 'components/Button';
import {
  BackButton,
  DrawerContent,
  DrawerControls,
  DrawerHeader,
  QuestionsList,
} from 'components/Drawer/styles';
import { Box, Space, Text } from 'components/StyledSystem';
import { Input } from 'components/Input';
import { useBoolean } from 'hooks/useBoolean';
import { TestResponse } from 'types';
import { getQuestionAmount } from 'Pages/Home/utils';

interface ModalProps {
  isVisible: boolean;
  data: TestResponse | null;
  onClose: () => void;
}

interface CurrnetTestInit {
  isEdit: boolean;
  testData: TestResponse | null;
}

export const CreateDrawer: FC<ModalProps> = ({
  isVisible,
  data,
  onClose,
}: ModalProps) => {
  const [isSubDrawerOpen, { setTrue: openSubDrawer, setFalse: closeSubDrawer }] =
    useBoolean();

  const [currentTest, setCurrnetTest] = useState<CurrnetTestInit>({
    isEdit: false,
    testData: data && { ...data },
  });

  const questionAmount = useMemo(
    () => getQuestionAmount(data?.questions?.length),
    [data?.questions?.length]
  );

  useEffect(() => {
    setCurrnetTest({
      ...currentTest,
      testData: data && { ...data },
    });
  }, [data]);

  return (
    <Drawer open={isVisible} onClose={onClose}>
      <DrawerHeader>
        <BackButton onClick={onClose}>{'<'}</BackButton>
        <p>{data ? 'Редактирование Quiz' : 'Создание Quiz'}</p>
      </DrawerHeader>

      <DrawerContent>
        <Box width='100%'>
          <Text fontSize='16px' fontWeight='500'>
            Название теста
          </Text>
          <Space height='12px' />
          <Input
            name='title'
            type='text'
            value={data ? data?.title : ''}
            onChange={() => {}}
          />
          <Space height='28px' />
        </Box>

        <DrawerControls>
          <Text fontSize='16px' fontWeight='500'>
            Опубликован
          </Text>
          <input type='checkbox' name='published' checked={data?.published} />
        </DrawerControls>

        <Box width='100%'>
          <span>{questionAmount}</span>
          <QuestionsList>
            {data &&
              data.questions?.map((question) => (
                <Box display={'flex'} key={question.id}>
                  <div>{question.ordering} - </div>
                  <div>{question.text}</div>
                </Box>
              ))}
          </QuestionsList>
        </Box>
      </DrawerContent>

      <Button view='ghost' onClick={openSubDrawer}>
        Еще вопрос
      </Button>
      <br />
      <Button onClick={onClose} disabled={!currentTest.isEdit}>
        Сохранить
      </Button>

      <Drawer open={isSubDrawerOpen} onClose={closeSubDrawer}>
        <DrawerHeader>
          <BackButton onClick={closeSubDrawer}>{'<'}</BackButton>
          <p>Вопрос #</p>
        </DrawerHeader>
        <DrawerContent></DrawerContent>
        <DrawerControls>
          <Button view='ghost' onClick={closeSubDrawer}>
            Далее
          </Button>
        </DrawerControls>
      </Drawer>
    </Drawer>
  );
};
