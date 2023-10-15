import { message } from 'antd';
import { useMutation } from 'react-query';

import GameForm from '../GameForm';
import BackButton from '../BackButton';
import client from '@/utils/client';

function addGame(data) {
  return client.post(`/games`, data);
}

export default function CreateGame() {
  const [messageApi, contextHolder] = message.useMessage();

  const { mutate } = useMutation(addGame, {
    onSuccess: () => {
      messageApi.open({ type: 'success', content: 'Entry added successfully' });
    },
    onError: (error) => {
      const { path, message } = error.response.data.error.details.errors[0];
      messageApi.open({ type: 'error', content: `${path[0]}: ${message.toLowerCase()}` });
    },
  });

  function handleFinish(value) {
    const { name, publisher, developer, released, genres, description, image } = value;
    const data = {
      Name: name,
      Publisher: publisher,
      Developer: developer,
      Released: released,
      genres,
      description,
    };
    const formData = new FormData();
    if (image?.length) {
      if (image[0].originFileObj) {
        formData.append('files.background_image', image[0].originFileObj, image[0].name);
      } else {
        formData.append('files.background_image', null);
      }
    } else {
      data.background_image = null;
    }
    formData.append('data', JSON.stringify(data));
    mutate(formData);
  }

  return (
    <>
      {contextHolder}
      <BackButton />
      <GameForm onFinish={handleFinish} />
    </>
  );
}
