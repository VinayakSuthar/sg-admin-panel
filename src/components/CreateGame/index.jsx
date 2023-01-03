import axios from 'axios';
import { message } from 'antd';
import { useMutation } from 'react-query';

import GameForm from '../GameForm';
import BackButton from '../BackButton';

const URL = import.meta.env.VITE_URL;

function addGame(data) {
  return axios.post(`${URL}/games`, data, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
      'Content-Type': 'multipart/form-data',
    },
  });
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
    const { name, publisher, developer, released, genres, image } = value;
    const data = {
      Name: name,
      Publisher: publisher,
      Developer: developer,
      Released: released,
      genres,
    };
    const formData = new FormData();
    formData.append('files.background_image', image.file, image.file.name);
    formData.append('data', JSON.stringify(data));
    mutate(formData);
  }

  return (
    <>
      {contextHolder}
      <BackButton />
      <GameForm onFinish={handleFinish} f />
    </>
  );
}
