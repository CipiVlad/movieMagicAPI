const express = require('express');
const app = express();
const PORT = 3000;
const axios = require('axios');
const api_key='';

app.set('view engine', 'ejs');

app.use((req, _, next) => {
    console.log("new request", req.method, req.url)
    next()
})
app.use(express.static("public"))

// ----------------------------------------------------------------
// movie list

const baseUrl = 'https://api.themoviedb.org/3';

app.get('/', (req, res) => {
  
    axios
    .get(`${baseUrl}/discover/movie?api_key=${api_key}&sort_by=upcoming.desc&with_genres=28&page=1`)
    .then(function (response) {
        const movies = response.data;
        // console.log(movies)
        res.render('home', {movies});
    })
    
    })
    

 //movie detail   
    app.get('/detail/:movie_id', (req, res) => {
        const movie_id = req.params.movie_id
        
        // ${movie_id}
    axios
    .get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=&language=en-US&page=1`)
    .then((movie_idResponse) => {
    
        const userChooseDetail=movie_idResponse.data;
        res.render('detail', {userChooseDetail})
    
    })
    
    
    
    });
    

app.listen(PORT);