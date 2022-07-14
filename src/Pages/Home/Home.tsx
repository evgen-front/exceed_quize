import { AddButton } from './modules/AddButton';
import { FC, useState } from 'react';
import { Box, Text } from '../../components';
import { TestsList } from '../../components/TestList/TestList';
import { Main } from '../../Layouts/MainView/Main';
import './Home.scss';

// *********** TEST ************
import { Col, Drawer, Form, Input, Row, Select } from 'antd';
import { Switch } from 'antd';
import { useMutation } from 'react-query';
import { Test } from 'types/types';
import { TestService } from 'services/TestService';
import { useQueryClient } from 'react-query';

const { Option } = Select;

export const Home: FC = () => {
  const queryClient = useQueryClient();
  const [createFormOpen, setCreateFormOpen] = useState(false);

  const { mutateAsync } = useMutation(
    'createTest',
    (data: Test) => TestService.createTest(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('testList');
      },
    }
  );

  const handleDrawer = () => {
    setCreateFormOpen(!createFormOpen);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault('');
    const data = {
      title: 'Новый тест',
      published: false,
    };
    await mutateAsync(data);
    handleDrawer();
  };

  const onSwitchChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <Main>
      <Box padding='20px 25px'>
        <Text fontSize='24px' fontWeight='700'>
          Доступные тесты:
        </Text>

        <div className='testListWrapper' style={{ maxHeight: '100%' }}>
          <TestsList />
        </div>
      </Box>

      <Box position='fixed' bottom='95px' right='25px'>
        <AddButton handler={handleDrawer} />
      </Box>

      <Drawer
        title='Создание Quiz'
        width={'100%'}
        onClose={handleDrawer}
        visible={createFormOpen}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form
          layout='vertical'
          hideRequiredMark
          initialValues={{ published: false, duration: '10' }}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name='name'
                label='Название'
                rules={[{ required: true, message: 'Пожалуйста введите название' }]}
              >
                <Input placeholder='Название теста' />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name='duration'
                label='Длительность'
                rules={[{ required: true, message: 'Пожалуйста введите длительность' }]}
              >
                <Select placeholder='Выберите длительность'>
                  <Option value='5'>5 минут</Option>
                  <Option value='10'>10 минут</Option>
                  <Option value='15'>15 минут</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name='published' label='Опубликован' valuePropName='checked'>
                <Switch onChange={onSwitchChange} />
              </Form.Item>
            </Col>
          </Row>

          <button onClick={handleSubmit}>Сохранить</button>
        </Form>
      </Drawer>
    </Main>
  );
};
