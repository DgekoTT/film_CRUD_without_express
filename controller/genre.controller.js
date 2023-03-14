
const db = require('../db');
const {getPostData} = require('../helper')


async function creatGenre(req, res) {
    const body = await getPostData(req); 
    
    const {genre} = JSON.parse(body);
    
    let fail = checkNameforString(genre);
    if (fail) {
        res.end(JSON.stringify(fail));
    } else {
        const newGenre = await db.query(`INSERT INTO 
        genre (genre) values ($1) RETURNING *`, [genre]);
    
        res.end(JSON.stringify(newGenre.rows[0]));
    }
}


    async function getAllGenre(req, res) {
        let AllGenre = await db.query('SELECT * FROM genre');

        res.end(JSON.stringify(AllGenre.rows));
    }

    async function getGenreById(req, res, id) {

        let result = await fingIdGenre(id);
    
        res.end(JSON.stringify(result));
    }

    async function updateGenre(req, res) {
        const body = await getPostData(req); 
    
        const {genre_id, genre} = JSON.parse(body);
        
        let fail = checkNameforString(genre);
        if (fail) {
            res.end(JSON.stringify(fail));
        } else {
            let checkId = await fingIdGenre(genre_id);

            if (typeof checkId == 'string') {
                res.end(JSON.stringify(checkId));
            } else {

                let genreNew = await db.query(`UPDATE genre SET genre = $2
                WHERE genre_id = $1 RETURNING *`,
                [genre_id, genre]);
                    
                res.end(JSON.stringify(genreNew.rows[0]));
            }
        }
    };

async function deleteGenre(req, res, id) {

    let worning = await fingIdGenre(id);

    if (typeof worning == "string") {
        res.end(JSON.stringify(worning));
    } else {
        const genreDel = await db.query(`DELETE FROM genre WHERE 
        genre_id = $1`, [id]);

        res.end(JSON.stringify(genreDel.rows[0]));
    }
}




function checkNameforString(genre) {
    if (typeof genre != 'string') {
        return `Имя сценария должно быть строкой!`;
    } 
};


async function fingIdGenre(genre_id) {
    if (!Number.isInteger(+genre_id)) {
        return `Id должен быть числом`;
    } else {
        let genre = await db.query(`SELECT * FROM genre
        WHERE genre_id = $1`, [genre_id]);

        if (!genre.rows.length) {
            return `Сценарий с Id ${genre_id} не найден в базе!`;
        } else {
           return genre.rows[0];
        }
    }
};

module.exports = {creatGenre, getAllGenre, getGenreById, updateGenre, 
    deleteGenre}

