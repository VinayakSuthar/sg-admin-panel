import { useQuery } from 'react-query';
import { Button, Card, DatePicker, Form, Input, Row, Select, Upload, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import client from '@/utils/client';
const { Title } = Typography;
const { TextArea } = Input;

import './index.css';

// eslint-disable-next-line no-unused-vars
const dummyRequest = ({ _, onSuccess }) => {
  setTimeout(() => {
    onSuccess('ok');
  }, 0);
};

function fetchGenres() {
  return client.get(`/genres`, {
    params: {
      populate: '*',
    },
  });
}

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

// eslint-disable-next-line react/prop-types
export default function GameForm({ onFinish, fields = [], loading = false, resetOnSubmit = true }) {
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
    if (resetOnSubmit) form.resetFields();
  }

  if (isError) {
    return <Title level={2}>Error! Please try again later</Title>;
  }

  return (
    <Card className="game-form" type="inner" loading={loading}>
      <Form layout="vertical" onFinish={handleFinish} form={form} initialValues={fields}>
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
        <Row justify="space-between">
          <Form.Item
            label="Released"
            name="released"
            required
            rules={[{ required: true, message: 'Please select released date', type: 'date' }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item label="Image" name="image" valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload customRequest={dummyRequest} beforeUpload={() => false} listType="picture">
              <Button icon={<UploadOutlined />}>Click To Upload</Button>
            </Upload>
          </Form.Item>
        </Row>
        <Form.Item label="Genres" name="genres" required rules={[{ required: true, message: 'Please select genres' }]}>
          <Select
            options={genresData}
            mode="multiple"
            allowClear
            loading={isLoading}
            dropdownStyle={{ backgroundColor: '#f5f5f5' }}
          />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <TextArea rows={4} />
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
