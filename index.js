const http = require('http');
const {creatFilm, getAllFilms, 
    getFilmByName, updateFilm, deleteFilm} = require('./controller/film.controller');
const {creatGenre, getAllGenre, getGenreById, updateGenre, 
    deleteGenre} = require('./controller/genre.controller')
const server = http.createServer((req, res) => {
    if (req.url === '/api/film' && req.method === 'GET') {
        getAllFilms(req, res);
    } else if (req.url.match(/\/api\/film\/\S+/) && req.method === 'GET') {
        const name = req.url.split('/')[3];
        getFilmByName(req, res, name);
    } else if (req.url === '/api/film' && req.method === 'POST') {
        creatFilm(req, res);
    } else if (req.url === '/api/film' && req.method === 'PUT') {
        updateFilm(req,res);
    } else if (req.url.match(/\/api\/film\/\S+/) && req.method === 'DELETE') {
        const name = req.url.split('/')[3];
        deleteFilm(req, res, name);
    } else if (req.url === '/api/genre' && req.method === 'GET') {
        getAllGenre(req, res);
    } else if (req.url.match(/\/api\/genre\/\w+/) && req.method === 'GET') {
        const id = req.url.split('/')[3];
        getGenreById(req, res, id);
    } else if (req.url === '/api/genre' && req.method === 'POST') {
        creatGenre(req, res);
    } else if (req.url === '/api/genre' && req.method === 'PUT') {
        updateGenre(req,res);
    } else if (req.url.match(/\/api\/genre\/\S+/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3];
        deleteGenre(req, res, id);
    }
});

const PORT = 3010;


server.listen(PORT, () => console.log(`started on ${PORT}`));;



