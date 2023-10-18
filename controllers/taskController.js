//invoke the DB connection
const conexion = require('../database/db')


/**
 * @param procedure to save and create task with params: id, titulo, descripcion, vencimiento 
 */

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

/**
 * @param procedure to update task for id
 */

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

/**
 * @param procedure to asigned taks for users
 */

exports.asignatedTask = (req, res) => { // modificar el router
    const id= req.params.id
    conexion.query('UPDATE users SET asignada= true WHERE id= ?', [id], (error, results) => {
        if(error){
            throw error;
        } else {
            res.redirect('/taskAsigned')
        }
    })
}

/***
 * @param procedure to asigned taks for users
 */

exports.completedTask = (req, res) => { // modificar el router
    const id= req.params.id
    conexion.query('UPDATE users SET Estado = completado WHERE id= ?', [id], (error, results) => {
        if(error){
            throw error;
        } else {
            res.redirect('/taskCompleted')
        }
    })
}





