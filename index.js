import express from "express";
import bodyParser from "body-parser";
import axios from "axios";


 const app = express();
 const port = 3000;

 app.use('/public', express.static('public'));
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));
 

app.get("/", async (req, res) => {
    const randomNum = Math.floor(Math.random() * 1025 + 1);
    const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNum}/`)
    res.render("index.ejs", {data: result.data});
})

app.post('/submit', async (req, res) => {
    const pokemon = req.body.pokemon.toLowerCase();
    try{
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
        res.render("index.ejs",  {data: response.data})
    } catch (err) {
        console.log(err);
    }
 
});

app.get('/random', async (req, res) => {
    const randomNum = Math.floor(Math.random() * 1025 + 1);
    const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNum}/`)
    res.render("index.ejs", {data: result.data});
    console.log(result.data.name);
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})