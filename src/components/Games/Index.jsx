import axios from 'axios';
import { useQuery } from 'react-query';
import { Button, Popover, Space, Table, Typography } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

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
      const content = (
        <Space direction="vertical">
          {genres.map(({ id, attributes }) => {
            return <Text key={id}>{attributes.name}</Text>;
          })}
        </Space>
      );
      return (
        <Popover content={content} placement="bottom" trigger="click">
          <Button>
            Items <CaretDownOutlined />
          </Button>
        </Popover>
      );
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
      Released,
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
      <Text type="secondary">{data?.length || 'No'} entries found</Text>
      <Table columns={columns} dataSource={tableData} style={{ marginTop: '1em' }} loading={isLoading} />
    </>
  );
}
