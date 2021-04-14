const express = require('express');
const app = express();
const port = 8000;
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const path = require('path')
const fileUpload = require('express-fileupload');
var cors = require('cors')

dotenv.config();

mongoose.connect(process.env.MONGOOSE_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, ()=> {
    console.log('connected');
});

//
app.use(cors())
app.use(fileUpload());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))
app.use('/covers',express.static(path.join(__dirname, 'public/covers')));
app.use('/songs',express.static(path.join(__dirname, 'public/songs')));

//Import collections routes 

const collectionRoutes  = require('./routes/collection');


app.use('/collection', collectionRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});