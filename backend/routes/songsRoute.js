import express from 'express';
import { Song } from '../models/songModel.js';

const router = express.Router();


// Route for saving a new song - we use POST method
router.post('/', async(request,response) => {
    try{
        //checks validation of input which comes from req.body
        if(!request.body.name ||
            !request.body.artist ||
            !request.body.songURL
        ) {return response.status(400).send({
            message: 'Send all required fields: name, artist, songURL', // sending message to client
        })}

        // create a variable for new song
        const newSong = { // using request.body for name, artist, and songURL
            name: request.body.name,
            artist: request.body.artist,
            songURL: request.body.songURL,
        }
        
        const song = await Song.create(newSong); // creates a new instance in the database

        return response.status(201).send(song); // sends back the created song as json format

    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});


// Route to get all songs from database
router.get('/', async (request,response) => {
    try{
        const  songs = await Song.find(); // find all data in the Songs collection
        
        response.status(200).json({
            count: songs.length,
            data: songs
        }); // sends all songs to the client
    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})


// Route to get single song from the database
router.get('/:id', async (request,response) => {
    try{

        // deconstructing id from params
        const { id } = request.params;

        const  song = await Song.findById(id); // find all data in the Songs collection
        
        response.status(200).json(song); // send the particular song to the client
    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route to update a song
router.put('/:id', async (request, response) => {
    try{
        //validation
        if(!request.body.name ||
            !request.body.artist ||
            !request.body.songURL
        ) {return response.status(400).send({
            message: 'Send all required fields: name, artist, songURL', // sending message to client
        })}

        const { id } = request.params;

        const result = await  Song.findByIdAndUpdate(id, request.body); 
        
    
        if(!result) {
            return response.status(404).send({message:'Song not found'});
        }

        return response.status(200).send({ message: 'Song updated successfully'}); // sending updated song information

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route to delete a song by its ID
router.delete('/:id', async (request, response) => {
    try{
        const { id } = request.params;

        const result = await Song.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message: 'Song not found'});
        }

        return response.status(200).send({message: 'Song deleted successfully'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

export default router;