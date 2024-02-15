import React from 'react'
import { useState } from 'react'; 
import BackButton from '../components/BackButton';
import Spinner from  '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useSnackbar} from 'notistack';

import '../css_files/AddSong.css';


const AddSong = () => {
  const [name, setName] = useState('');
  const [artist, setArtist] = useState('');
  const [songURL, setsongURL] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {enqueueSnackbar} =  useSnackbar();

  const handleSaveSong = () => {
    const data = {
      name,
      artist,
      songURL,
    };
    setLoading(true);
    axios
      .post('http://localhost:4000/songs',data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Song Added successfully", { variant: 'success'});
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error',{ variant: 'error'});
        console.log(error);
      })
  }
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Add Song</h1>
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
          <label className='text-xl mr-4 text-gray-500'>Upload Song</label>
          <input
            type='text'
            value={songURL}
            onChange={(e) => setsongURL(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveSong}>
          Add
        </button>
      </div>
    </div>
  )
}

export default AddSong
