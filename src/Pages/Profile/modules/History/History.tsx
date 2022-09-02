import { FC } from 'react';
import { Box, Button, Drawer, Space, Text } from 'components';
import { BackButton, DrawerContent, DrawerHeader } from 'components/Drawer/styles';
import { RiArrowLeftSLine } from 'react-icons/ri';
import { useTests } from 'hooks';
import { TestSessionsItem } from './testSessionsItem';

interface HistoryProps {
  isOpen: boolean;
  close: () => void;
}

export const History: FC<HistoryProps> = ({ isOpen, close }) => {
  const { testList } = useTests();

  return (
    <Drawer open={isOpen} onClose={close}>
      <DrawerHeader>
        <BackButton onClick={close}>
          <RiArrowLeftSLine />
        </BackButton>
        <Text fontWeight={700} fontSize={24}>
          История тестов
        </Text>
      </DrawerHeader>

      <DrawerContent style={{ gap: '20px' }}>
        {testList?.map((test) => (
          <TestSessionsItem key={test.id} test={test} />
        ))}
      </DrawerContent>

      <Box>
        <Space height='20px' />
        <Button onClick={close}>Закрыть</Button>
      </Box>
    </Drawer>
  );
};
