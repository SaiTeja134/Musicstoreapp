import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import {Link} from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';



import '../css_files/Home.css';

const Home = () => {
    const [songs, setSongs] = useState([]); // State for songs
    const [loading, setLoading] = useState(false);
    
    // create a useeffect
    useEffect(() => {
        setLoading(true);
        axios  // call axios.get() with backend route for songs list
            .get('http://localhost:4000/songs')
            .then((response) => { // we receive response
                setSongs(response.data.data); // response.data is the object of our response result 
                // in response.data we have count and data, so we sava data using .data
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    },[]);
    return (
        <div className='p-4'>
            <div className="flex-container">
            <h1 className="text-3xl">Songs List</h1>
            <Link to="/songs/add">
          <MdOutlineAddBox className="text-4xl" />
        </Link>
        </div>
        {loading ? (<Spinner />) : (
            <table className="table">
                <thead>
                   <tr>
                <th className="th">Song</th>
              <th className="th max-md:hidden">Artists</th>
              <th className="th max-md:hidden">Player</th>
              <th className="th">Operations</th>
                    </tr> 
                </thead>
                <tbody>
                {songs.map((song, index) => (
              <tr key={song._id} className='h-8'>
                <td className="td">{song.name}</td>
                <td className="td max-md:hidden">{song.artist}</td>
                <td className="td max-md:hidden">
                  {song.songURL}
                <audio controls>
                  <source src= {song.songURL} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio> 
                </td>
                <td className="td">
                  <div className="flex-container">
                    <Link to={`/songs/details/${song._id}`}>
                      <BsInfoCircle className="icon text-green-800" />
                    </Link>
                    <Link to={`/songs/edit/${song._id}`}>
                      <AiOutlineEdit className="icon text-yellow-600" />
                    </Link>
                    <Link to={`/songs/delete/${song._id}`}>
                      <MdOutlineDelete className="icon text-red-600" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
                </tbody>
            </table>
        )
        }
        </div>
    )
}

export default Home;
