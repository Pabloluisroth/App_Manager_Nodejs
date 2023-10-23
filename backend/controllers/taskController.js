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

exports.tasks = (req, res) => { 
    conexion.query('SELECT * FROM tasks', (error, results) => {
        if(error){
            throw error;
        } else {
            if (row.rol=="Admin") { 
                res.render('tasks', { results: results, titleWeb: "List tasks" })
            } else {
                res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
            }
        }
    })
}

/***
 * @param procedure show tasks completed 
 */
exports.taskCompleted = (req, res) => { 
    conexion.query('SELECT * FROM completed_tasks', (error, results) => {
        if(error){
            throw error;
        } else {
            if (row.rol=="Admin") { 
                res.render('taskCompleted', { results: results, titleWeb: "List tasks completed" })
            } else {
                res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
            }
        }
    })
}

/***
 * @param procedure deleted task for id
 */
exports.deleteTask = (req, res) => { 
    const id = req.params.id
    conexion.query('DELETE FROM tasks WHERE id= ?', [id], (error, results) => {
        if(error){
            throw error;
        } else {
            res.redirect('/tasks')
        }
    })
}

/***
 * @param procedure completed tasks
 */
exports.completedTask = (req, res) => { 
    const id= req.params.id
    conexion.query('UPDATE users SET Estado = completado WHERE id= ?', [id], (error, results) => {
        if(error){
            throw error;
        } else {
            res.redirect('/taskCompleted')
        }
    })
}

/***
 * @param procedure asignated tasks a user
 */
exports.completedTask = (req, res) => { 
    const asignada= req.params.asignada
    conexion.query('INSERT INTO tasks set asignada = asignada', [asignada], (error, results) => {
        if(error){
            throw error;
        } else {
            res.redirect('/taskDetails')
        }
    })
}

/***
 * @param procedure edit task 
 */
exports.editTask = (req, res) => { 
    const id = req.params.id;
    conexion.query('SELECT * FROM tasks WHERE id= ?', [id], (error, results) => {
        if(error){
            throw error;
        } else {
            if(row.rol=="Admin") {
                res.render('editTask', { task: results[0], titleWeb: "Edit task" })
            } else {
                res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
            }
        }
    })
}

/***
 * @param procedure tasks details 
 */
exports.taskDetails = (req, res) => { 
    const id = req.params.id;
    conexion.query('SELECT * FROM tasks WHERE id= ?', [id], (error, results) => {
        if(error){
            throw error;
        } else {
            if (row.rol=="Admin") { 
                res.render('taskDetails', { results: results, titleWeb: "List task completed details" })
            } else {
                res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
            }
        }
    })
}







