import axios from 'axios';
import { useQuery } from 'react-query';
import { Button, Card, DatePicker, Form, Input, Row, Select } from 'antd';
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

// eslint-disable-next-line react/prop-types
export default function GameForm({ onFinish, fields = [] }) {
  const [form] = Form.useForm();
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

  function handleFinish(value) {
    onFinish(value);
    form.resetFields();
  }

  if (isError) {
    return <Title level={2}>Error! Please try again later</Title>;
  }

  return (
    <Card className="game-form" type="inner">
      <Form layout="vertical" onFinish={handleFinish} form={form} fields={fields}>
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
        <Form.Item label="Genres" name="genres" required rules={[{ required: true, message: 'Please select genres' }]}>
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
  );
}
