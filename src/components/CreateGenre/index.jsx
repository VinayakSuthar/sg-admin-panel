import { message } from 'antd';
import { useMutation } from 'react-query';

import GenreForm from '../GenreForm';
import BackButton from '../BackButton';
import client from '@/utils/client';

function createGenre(data) {
  return client.post(`/genres`, data);
}

export default function CreateGenre() {
  const [messageApi, contextHolder] = message.useMessage();

  const { mutate } = useMutation(createGenre, {
    onSuccess: () => {
      messageApi.open({ type: 'success', content: 'Entry added successfully' });
    },
    onError: (error) => {
      const { path, message } = error.response.data.error.details.errors[0];
      messageApi.open({ type: 'error', content: `${path[0]}: ${message.toLowerCase()}` });
    },
  });

  function handleFinish(value) {
    const { name, slug } = value;
    mutate({
      data: {
        name,
        slug,
      },
    });
  }

  return (
    <>
      {contextHolder}
      <BackButton />
      <GenreForm onFinish={handleFinish} f />
    </>
  );
}
