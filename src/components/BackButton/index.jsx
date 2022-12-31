import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <Button type="link" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
      Back
    </Button>
  );
}
