import axios from 'axios';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Typography, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

const URL = import.meta.env.VITE_URL;

function fetchGenres() {
  return axios.get(`${URL}/genres`, {
    params: {
      populate: '*',
    },
  });
}

export default function Genres() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery('genres', fetchGenres, {
    select: (data) => data.data.data.map((game) => game),
  });

  const columns = [
    { title: 'Id', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Slug', dataIndex: 'slug', key: 'slug' },
  ];

  const tableData = data?.map(({ id, attributes }) => {
    const { name, slug } = attributes;
    return {
      key: id,
      id,
      name,
      slug,
    };
  });

  if (isError) {
    return <Title level={2}>Please try again later</Title>;
  }

  return (
    <>
      <Title level={2} style={{ margin: 0 }}>
        Genres
      </Title>
      <Text type="secondary">{data?.length} entries found</Text>
      <Row justify="end">
        <Col>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/game/create')}>
            Create new entry
          </Button>
        </Col>
      </Row>
      <Table columns={columns} dataSource={tableData} style={{ marginTop: '1em' }} loading={isLoading} />
    </>
  );
}
