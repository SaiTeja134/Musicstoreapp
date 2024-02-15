import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';


import "../css_files/DeleteSong.css";

const DeleteSong = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  // function to handle Delete Song
  const handleDeleteSong = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:4000/songs/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Song Deleted successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      })
  }
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Song</h1>
      {loading ? <Spinner /> : ''}
      <div className='delete-song'>
        <h3 className='text-2xl'>Are You Sure You want to delete this song?</h3>
        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteSong}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  )
}

export default DeleteSong
