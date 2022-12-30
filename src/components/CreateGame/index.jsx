import axios from 'axios';
import { Button, Card, DatePicker, Form, Input, Row, Select, message } from 'antd';
import { useQuery, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';

import './index.css';

const URL = import.meta.env.VITE_URL;

function fetchGenres() {
  return axios.get(`${URL}/genres`, {
    params: {
      populate: '*',
    },
  });
}
function addGame(data) {
  return axios.post(`${URL}/games`, data, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
    },
  });
}

export default function CreateGame() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { data, isError, isLoading } = useQuery('genres', fetchGenres, {
    select: (data) => data.data.data.map((game) => game),
  });
  const genresData = data?.map(({ id, attributes }) => {
    const { name } = attributes;
    return {
      label: name,
      value: id,
    };
  });
  const { mutate } = useMutation(addGame, {
    onSuccess: () => {
      messageApi.open({ type: 'success', content: 'Entry added successfully' });
    },
    onError: (error) => {
      const { path, message } = error.response.data.error.details.errors[0];
      messageApi.open({ type: 'error', content: `${path[0]}: ${message.toLowerCase()}` });
    },
  });

  function handleFinish(value) {
    const { name, publisher, developer, released, genres } = value;
    mutate({
      data: {
        Name: name,
        Publisher: publisher,
        Developer: developer,
        Released: released,
        genres,
      },
    });
    form.resetFields();
  }

  return (
    <>
      {contextHolder}
      <Button type="link" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
        Back
      </Button>
      {isError ? (
        <Title level={2}>Error! Please try again later</Title>
      ) : (
        <Card className="game-form" type="inner">
          <Form layout="vertical" onFinish={handleFinish} form={form}>
            <Form.Item
              label="Name"
              name="name"
              required
              rules={[{ required: true, message: 'Please input game name', type: 'string' }]}
            >
              <Input name="name" />
            </Form.Item>
            <Form.Item
              label="Publisher"
              name="publisher"
              required
              rules={[{ required: true, message: 'Please input publisher name', type: 'string' }]}
            >
              <Input name="publisher" />
            </Form.Item>
            <Form.Item
              label="Developer"
              name="developer"
              required
              rules={[{ required: true, message: 'Please input developer name', type: 'string' }]}
            >
              <Input name="developer" />
            </Form.Item>
            <Form.Item
              label="Released"
              name="released"
              required
              rules={[{ required: true, message: 'Please select released date', type: 'date' }]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              label="Genres"
              name="genres"
              required
              rules={[{ required: true, message: 'Please select genres' }]}
            >
              <Select
                options={genresData}
                mode="multiple"
                allowClear
                loading={isLoading}
                dropdownStyle={{ backgroundColor: '#f5f5f5' }}
              />
            </Form.Item>
            <Row justify="end">
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </Row>
          </Form>
        </Card>
      )}
    </>
  );
}
