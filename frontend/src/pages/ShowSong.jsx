import React from 'react';
import { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

import '../css_files/ShowSong.css';

const ShowSong = () => {
  const [song, setSong] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    // GET request for song data at the given `id` from the backend server.
    axios
      .get(`http://localhost:4000/songs/${id}`)
      .then((response) => {
        setSong(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id])
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Song Info</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='song-info'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Id</span>
            <span>{song._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Song Name</span>
            <span>{song.name}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Artists</span>
            <span>{song.artist}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Added Time</span>
            <span>{new Date(song.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
            <span>{new Date(song.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowSong
