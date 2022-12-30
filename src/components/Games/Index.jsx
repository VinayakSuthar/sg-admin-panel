import axios from 'axios';
import { useQuery } from 'react-query';
import { Button, Table, Typography, Row, Col, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

import { formatDate } from '@/utils/date';
import { useNavigate } from 'react-router-dom';

const columns = [
  { title: 'Id', dataIndex: 'id', key: 'id' },
  {
    title: 'Name',
    dataIndex: 'Name',
    key: 'name',
  },
  {
    title: 'Genres',
    dataIndex: 'Genres',
    key: 'genres',
    render: (_, { genres }) => {
      return genres.map(({ id, attributes }) => {
        return (
          <Tag color="blue" key={id}>
            {attributes.name}
          </Tag>
        );
      });
    },
  },
  {
    title: 'Publisher',
    dataIndex: 'Publisher',
    key: 'publisher',
  },
  {
    title: 'Developer',
    dataIndex: 'Developer',
    key: 'developer',
  },
  {
    title: 'Released',
    dataIndex: 'Released',
    key: 'released',
  },
];

const URL = import.meta.env.VITE_URL;
function fetchGames() {
  return axios.get(`${URL}/games`, {
    params: {
      populate: '*',
    },
  });
}

export default function Games() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery('games', fetchGames, {
    select: (data) => data.data.data.map((game) => game),
  });
  const tableData = data?.map(({ id, attributes }) => {
    const { Name, Publisher, Developer, Released, genres } = attributes;
    return {
      key: id,
      id,
      Name,
      Publisher,
      Developer,
      Released: formatDate(Released),
      genres: genres?.data,
    };
  });

  if (isError) {
    return <Title level={2}>Please try again later</Title>;
  }
  return (
    <>
      <Title level={2} style={{ margin: 0 }}>
        Games
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
