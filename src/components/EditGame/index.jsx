import { useParams } from 'react-router-dom';
import { message } from 'antd';
import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import dayjs from 'dayjs';
import { useState } from 'react';

import BackButton from '../BackButton';
import GameForm from '../GameForm';
import Title from 'antd/es/typography/Title';

const URL = import.meta.env.VITE_URL;

function fetchGame({ queryKey }) {
  const id = queryKey[1];
  return axios.get(`${URL}/games/${id}`, {
    params: {
      populate: '*',
    },
  });
}

function editGame({ id, formData }) {
  return axios.put(`${URL}/games/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
      'Content-Type': 'multipart/form-data',
    },
  });
}

export default function EditGame() {
  const { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const [gameData, setGameData] = useState([]);
  function updateGameData(value) {
    const { Name, Publisher, Developer, Released, genres, description, background_image } = value.attributes;

    const imageValue = (function () {
      if (background_image.data) {
        const {
          id,
          attributes: { name, url },
        } = background_image.data;
        return [{ uid: id, name, url: `http://localhost:1337${url}` }];
      }
      return null;
    })();
    setGameData({
      name: Name,
      publisher: Publisher,
      developer: Developer,
      released: dayjs(Released),
      genres: genres.data.map((genre) => genre.id),
      description,
      image: imageValue,
    });
  }
  const { isLoading, isError } = useQuery(['game', id], fetchGame, {
    select: (data) => data.data.data,
    cacheTime: 0,
    onSuccess: updateGameData,
  });

  const { mutate } = useMutation(editGame, {
    onSuccess: () => {
      messageApi.open({ type: 'success', content: 'Entry updated successfully' });
    },
    onError: (error) => {
      messageApi.open({ type: 'error', content: `${error}` });
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
    if (image.length) {
      if (image[0].originFileObj) {
        formData.append('files.background_image', image[0].originFileObj, image[0].name);
      } else {
        formData.append('files.background_image', null);
      }
    } else {
      data.background_image = null;
    }
    formData.append('data', JSON.stringify(data));
    mutate({ id, formData });
  }

  return (
    <>
      {contextHolder}
      <BackButton />
      {isError ? (
        <Title level={3}>An error occurred. Please try again later</Title>
      ) : (
        <GameForm onFinish={handleFinish} fields={gameData} loading={isLoading} resetOnSubmit={false} />
      )}
    </>
  );
}
