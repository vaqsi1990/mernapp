const express = require('express')
require("dotenv").config()
const authRoute = require("./routes/auth")
const travelRoute = require('./routes/travel')
const savedRoute = require('./routes/saved')
const commentRoute = require('./routes/comment')
const path = require("path")
const multer = require('multer')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const Travel = require('./module/travel')

const app = express();







const DB = process.env.MONGO_URL;
console.log(process.env.MONGO_URL);
const allowedOrigins = ['http://localhost:5173'];




app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = ['http://localhost:5173', 'https://reacttry-09c88ac6dfe8.herokuapp.com/'];
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));


//midlewares
app.use(cookieParser())
app.use(express.json())



app.use((err,req,res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || "wrong"
  return res.status(errorStatus).json(errorMessage)
} )



const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});


const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});



app.post('/add-products', upload.array('photos', 7), async (req, res) => {
  try {
   

    const { name,  dayTwo, dayOne, continent, cuisine, location,rating } = req.body;

    const photos = req.files.map(file => file.filename);

    const newTravel = await Travel.create({
      name,
      photos,
      dayOne,
      continent,
      rating,
      dayTwo,
      location,
      cuisine,
    });

    const savedTravel = await newTravel.save();
    console.log('Saved Game:', savedTravel);

    res.status(200).json(savedTravel);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});




app.use('/uploads', express.static('uploads'));

app.use(express.static(path.join(__dirname, "./client/dist")))

app.use("/api/auth", authRoute)

app.use('/travel', travelRoute)
app.use('/saved', savedRoute)


app.get("*", (req, res) => {
res.sendFile(path.join(__dirname, "./client/dist/index.html"))
})

const PORT = process.env.PORT || 4500;

mongoose
  .connect(DB)
  .then(result => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });