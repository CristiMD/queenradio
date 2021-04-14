var router = require('express').Router();
const Song = require('../models/Songs');
var path = require('path')


// Home page route.
router.get('/song/:songId', async (req, res) => {
    const id = req.params.songId;
    let song;
    try {
        song = await Song.findById(id);
    } catch (err) {
        return res.status(404).send('Song not found');
    }
    return res.json(song);
})

// GET Sons
router.get('/songs', async (req, res) => {
    const id = req.params.songId;
    let song;
    Song.find({}, function(err, result) {
        if (err) {
            console.log(err);
            return res.status(500).send('There was an error processing songs');
        } else {
            return res.json(result);
        }
    });
})

// About page route.
router.post('/song', async (req, res) => {
    const name = req.body.name;
    const parsedName = name.replace(/[^a-zA-Z0-9]/g,'').toLowerCase();

    let songFile;
    let uploadSongPath;
    let coverFile;
    let uploadCoverPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    songFile = req.files.songFile;
    coverFile = req.files.coverFile;
    const fileBaseName = parsedName + '-' +Date.now();

    const songName = fileBaseName + path.extname(songFile.name);
    uploadSongPath = __dirname + '/../public/songs/' + songName;
    console.log(songName)
    // Use the mv() method to place the file somewhere on your server
    songFile.mv(uploadSongPath, function(err) {
        if (err)
        return res.status(500).send(err);
    });

    const coverName = fileBaseName + path.extname(coverFile.name);
    uploadCoverPath = __dirname + '/../public/covers/' + coverName;
    console.log(songName)
    // Use the mv() method to place the file somewhere on your server
    coverFile.mv(uploadCoverPath, function(err) {
        if (err)
        return res.status(500).send(err);
    });

    const song = new Song({
        name,
        url: songName,
        cover: coverName
    })

    try {
        const savedSong = await song.save();
        return res.send(savedSong);
    } catch (err) {
        console.log(err);
        return res.send('There was an error while saveing the song');
    }
    return res.send('File uploaded!');
})

module.exports = router;