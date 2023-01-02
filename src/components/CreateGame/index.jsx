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
    const { name, publisher, developer, released, genres } = value;
    mutate({
      data: {
        Name: name,
        Publisher: publisher,
        Developer: developer,
        Released: released,
        genres,
      },
    });
  }

  return (
    <>
      {contextHolder}
      <BackButton />
      <GameForm onFinish={handleFinish} f />
    </>
  );
}
