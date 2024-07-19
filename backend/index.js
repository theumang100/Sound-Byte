const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const UserModel = require('./models/User')
const RoomModel = require('./models/Room')
const bwipjs = require('bwip-js');
const QRCode = require('qrcode');

const app = express()
app.use(express.json())
app.use(cors({
    origin: 'http://127.0.0.1:5173',
    credentials: true
}));
app.use(cookieParser())

mongoose.connect('mongodb://localhost:27017/SoundByte');

app.get('/home', (req, res) => {
    res.json("Success")
})

app.post('/createroom', (req, res) => {
    function generateRandomNumber() {
        return crypto.randomBytes(5).toString('hex')
    }
    const randomNumber = generateRandomNumber()
    const { roomName } = req.body;
    console.log(roomName, randomNumber)

    const newRoom = new RoomModel({
        id: randomNumber,
        name: roomName
    });
    newRoom.save()
        .then(() => {
            res.status(201).json({ message: 'Room created successfully', roomId: randomNumber });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to create room' });
        });
})


app.post('/register', (req, res) => {
    UserModel.create(req.body)
        .then(users => res.json(users))
        .catch(err => res.json(err))
})


app.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success")
                } else {
                    res.json("the password is incorrect :)")
                }
            } else {
                res.json("no user exist")
            }
        })

})

app.get('/show_barcode/:id', (req, res) => {
    const uniqueId = req.params.id;

    // Generate the QR code using the qrcode library
    QRCode.toDataURL(uniqueId, function (err, url) {
        if (err) {
            res.status(500).send('Error generating QR code');
        } else {
            // Remove the Data URL prefix and send the base64-encoded PNG
            const base64Data = url.replace(/^data:image\/png;base64,/, '');
            const imgBuffer = Buffer.from(base64Data, 'base64');

            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': imgBuffer.length
            });
            res.end(imgBuffer);
        }
    });
});
app.listen(3001, () => {
    console.log("Server is Running")
})
