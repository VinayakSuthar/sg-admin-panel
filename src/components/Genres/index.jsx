import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Typography, Row, Col, Space, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

const URL = import.meta.env.VITE_URL;

function fetchGenres() {
  return axios.get(`${URL}/genres`, {
    params: {
      populate: '*',
    },
  });
}
function deleteGenre(id) {
  return axios.delete(`${URL}/genres/${id}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
    },
  });
}

export default function Genres() {
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useQuery('genres', fetchGenres, {
    select: (data) => data.data.data.map((game) => game),
  });

  const { mutate } = useMutation(deleteGenre, {
    onSuccess: () => {
      refetch();
    },
  });

  const columns = [
    { title: 'Id', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Slug', dataIndex: 'slug', key: 'slug' },
    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'action',
      render: (_, { id }) => {
        return (
          <Space>
            <Popconfirm
              title="Delete the entry"
              description="Are you sure to delete this entry?"
              onConfirm={() => {
                mutate(id);
              }}
              okText="Yes"
              cancelText="No"
              placement="left"
            >
              <Button type="text" danger size="small">
                <DeleteOutlined />
              </Button>
            </Popconfirm>
            <Button type="text" size="small" onClick={() => navigate(`/game/${id}`)}>
              <EditOutlined />
            </Button>
          </Space>
        );
      },
    },
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
          <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/genre/create')}>
            Create new entry
          </Button>
        </Col>
      </Row>
      <Table columns={columns} dataSource={tableData} style={{ marginTop: '1em' }} loading={isLoading} />
    </>
  );
}
