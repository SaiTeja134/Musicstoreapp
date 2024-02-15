import React from 'react'
import { useState, useEffect } from 'react'; 
import BackButton from '../components/BackButton';
import Spinner from  '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import "../css_files/AddSong.css";


const EditSong = () => {
  const [name, setName] = useState('');
  const [artist, setArtist] = useState('');
  const [songURL, setsongURL] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:4000/songs/${id}`)
    .then((response) => {
      setName(response.data.name);
      setArtist(response.data.artist);
      setsongURL(response.data.songURL);
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
      alert('An error happened. Please Check console');
      console.log(error);
    })
  }, [id])
  const handleEditSong = () => {
    const data = {
      name,
      artist,
      songURL,
    };
    setLoading(true);
    axios
      .put(`http://localhost:4000/songs/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Song Edited successfully', { variant: 'success' });
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
      <h1 className='text-3xl my-4'>Edit Song</h1>
      {loading ? <Spinner /> : ''}
      <div className='song-form'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Song Name</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Artists</label>
          <input
            type='text'
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Song URL</label>
          <input
            type='url'
            value={songURL}
            onChange={(e) => setsongURL(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditSong}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditSong
