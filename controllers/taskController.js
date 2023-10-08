//invoke the DB connection
const conexion = require('../database/db')

//procedure to save
exports.saveTask = (req, res) => {
    const titulo = req.body.titulo
    const descripcion = req.body.descripcion
    const vencimiento = req.body.vencimiento

    conexion.query('INSERT INTO tasks SET ?', {titulo:titulo, descripcion:descripcion, vencimiento:vencimiento}, (error, results) => {
        if(error) {
            console.error(error)
        } else {
            res.redirect('/');
        }
    });
};

//procedure to update
exports.updateTask = (req, res) => {
    const id = req.body.id
    const titulo = req.body.titulo
    const descripcion = req.body.descripcion
    const vencimiento = req.body.vencimiento

    conexion.query('UPDATE tasks SET ? WHERE id = ?', [{ titulo:titulo, descripcion:descripcion, vencimiento:vencimiento}, id ], (error, results) => {
        if(error) {
            console.error(error)
        } else {
            res.redirect('/');
        }
    })
}



