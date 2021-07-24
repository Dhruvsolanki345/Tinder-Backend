const mongoose = require("mongoose");
const express = require("express");
const Cors = require("cors");
const Cards = require("./mongodb/dbCards")

//App Config
const app = express();
const port = process.env.PORT || 80;
const connection_url = `mongodb+srv://admin:JA01iK2LQFWRWqyA@cluster0.h26og.mongodb.net/tinderdb?retryWrites=true&w=majority`

//Middlewares
app.use(express.json());
app.use(Cors());

// DB Config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

//API Endpoint
app.get("/", (req, res) => {
    res.redirect('https://tinder-clone-9470d.web.app/')
})

app.post("/tinder/cards", (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.get("/tinder/cards", (req, res) => {
    Cards.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

// Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`))
