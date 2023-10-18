//invoke the DB connection
const conexion = require('../database/db')

/**
 * @param procedure to create and save notes
 */
exports.saveNote = (req, res) => {
    const descripcion = req.body.descripcion
    const date = req.body.date
    conexion.query('INSERT INTO notes SET ?', {descripcion:descripcion, date:date},  (error, results) => {
        if(error) {
            console.error(error)
        } else {
            res.redirect('/');
        }
    });
};

/**
 * @param procedure to update note
 */
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

/**
 * @param procedure to deleted note
 */
exports.deletedNote = (req, res) => {
    const id = req.body.id
    conexion.query('DELETE FROM notes WHERE id= ?', [id], (error, results) => {
        if(error) {
            console.error(error)
        } else {
            res.redirect('/');
        }
    })
}

