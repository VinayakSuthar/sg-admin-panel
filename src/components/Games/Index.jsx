import { Table, Typography } from 'antd';
const { Title, Text } = Typography;

import useGameData from '@/hooks/useGameData';

const columns = [
  { title: 'Id', dataIndex: 'id', key: 'id' },
  {
    title: 'Name',
    dataIndex: 'Name',
    key: 'name',
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

export default function Games() {
  const { data } = useGameData();
  const tableData = data?.map(({ id, attributes }) => {
    const { Name, Publisher, Developer, Released } = attributes;
    return {
      key: id,
      id,
      Name,
      Publisher,
      Developer,
      Released,
    };
  });
  console.log(data);
  return (
    <>
      <Title level={2} style={{ margin: 0 }}>
        Games
      </Title>
      <Text type="secondary">{data?.length} entries found</Text>
      <Table columns={columns} dataSource={tableData} style={{ marginTop: '1em' }} />
    </>
  );
}
