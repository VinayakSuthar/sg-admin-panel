import { Button, Card, Form, Input, Row } from 'antd';

import './index.css';

// eslint-disable-next-line react/prop-types
export default function GenreForm({ onFinish, fields = [], loading = false, resetOnSubmit = true }) {
  const [form] = Form.useForm();

  function handleFinish(value) {
    onFinish(value);
    if (resetOnSubmit) form.resetFields();
  }
  return (
    <Card className="genre-form" type="inner" loading={loading}>
      <Form layout="vertical" onFinish={handleFinish} form={form} fields={fields}>
        <Form.Item
          label="Name"
          name="name"
          required
          rules={[{ required: true, message: 'Please input genre name', type: 'string' }]}
        >
          <Input name="name" />
        </Form.Item>
        <Form.Item
          label="Slug"
          name="slug"
          required
          rules={[{ required: true, message: 'Please input slug', type: 'string' }]}
        >
          <Input name="slug" />
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
