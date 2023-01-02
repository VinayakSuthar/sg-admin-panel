import { useParams } from 'react-router-dom';
import { message, Typography } from 'antd';
import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import { useState } from 'react';

import BackButton from '../BackButton';
import GenreForm from '../GenreForm';
const { Title } = Typography;

const URL = import.meta.env.VITE_URL;

function fetchGenre({ queryKey }) {
  const id = queryKey[1];
  return axios.get(`${URL}/genres/${id}`, {
    params: {
      populate: '*',
    },
  });
}

function editGenre({ id, body }) {
  return axios.put(`${URL}/genres/${id}`, body, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
    },
  });
}

export default function EditGenre() {
  const { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const [genreData, setGenreData] = useState([]);
  function updateGameData(value) {
    const { name, slug } = value.attributes;
    setGenreData([
      { name: 'name', value: name },
      { name: 'slug', value: slug },
    ]);
  }
  const { isLoading, isError } = useQuery(['game', id], fetchGenre, {
    select: (data) => data.data.data,
    cacheTime: 0,
    onSuccess: updateGameData,
  });

  const { mutate } = useMutation(editGenre, {
    onSuccess: () => {
      messageApi.open({ type: 'success', content: 'Entry updated successfully' });
    },
    onError: (error) => {
      messageApi.open({ type: 'error', content: `${error}` });
    },
  });

  function handleFinish(value) {
    console.log('🚀 ~ file: index.jsx:57 ~ handleFinish ~ value', value);
    const { name, slug } = value;
    mutate({
      id,
      body: {
        data: { name, slug },
      },
    });
  }

  return (
    <>
      {contextHolder}
      <BackButton />
      {isError ? (
        <Title level={3}>An error occured. Please try again later</Title>
      ) : (
        <GenreForm onFinish={handleFinish} fields={genreData} loading={isLoading} resetOnSubmit={false} />
      )}
    </>
  );
}
