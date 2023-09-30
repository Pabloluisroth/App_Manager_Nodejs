//invoke the DB connection
const conexion = require('../database/db')

//procedure to save
exports.saveNote = (req, res) => {
    const descripcion = req.body.descripcion
    const date = req.body.date

    conexion.query('INSERT INTO notes SET ?', {descripcion:descripcion, date:date}, (error, results) => {
        if(error) {
            console.error(error)
        } else {
            res.redirect('/');
        }
    });
};

//procedure to update
exports.updateNote = (req, res) => {
    const id = req.body.id
    const descripcion = req.body.descripcion
    const date = req.body.date

    conexion.query('UPDATE notes SET ? WHERE id = ?', [{ descripcion:descripcion, date:date}, id ], (error, results) => {
        if(error) {
            console.error(error)
        } else {
            res.redirect('/');
        }
    })
}

