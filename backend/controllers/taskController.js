//invoke the DB connection
const conexion = require('../database/db')

/**
 * @param procedure crear nueva tarea
 */
exports.saveTask = async (req, res) => {   
    try {
        const titulo = req.body.titulo
        const descripcion = req.body.descripcion
        const vencimiento = req.body.vencimiento
        conexion.query('INSERT INTO tasks SET ?', {titulo:titulo, descripcion:descripcion, vencimiento:vencimiento}, (err, results) => {
            if(err) {  
                res.render('error', { errorMessage: err.message });
            } else {   
                res.redirect('/tasks')
            }
        }) 
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error)
        res.render('error', { errorMessage: 'Error en la consulta a la base de datos:' });
    }
}

/**
 * @param procedure actualizar tarea
 */
exports.updateTask = async (req, res) => {   
    try {
        const id = req.body.id
        const titulo = req.body.titulo
        const descripcion = req.body.descripcion
        const vencimiento = req.body.vencimiento
        conexion.query('UPDATE tasks SET ? WHERE id = ?', [{ titulo:titulo, descripcion:descripcion, vencimiento:vencimiento}, id ], (err, results) => {
        if(err) {  
                res.render('error', { errorMessage: err.message });
            } else {   
                res.render('tasks',{results: results[0], titleWeb: "Tasks"})
            }
        }) 
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error)
        res.render('error', { errorMessage: 'Error en la consulta a la base de datos:' });
    }
}

/***
 * @param procedure mostrar todas las tareas
 */
exports.tasks = async (req, res) => {   
    try {
        conexion.query('SELECT * FROM tasks', (err, results) => {
            if(err) {  
                res.render('error', { errorMessage: err.message });
            } else {   
                res.render('tasks', { results: results, titleWeb: "List Tasks"})
            }
        }) 
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error)
    }
}

/***
 * @param procedure mostrar tareas completadas
 */
exports.taskCompleted = async (req, res) => {   
    try {
        conexion.query('SELECT * FROM tasks WHERE estado = 1', (err, results) => {
            if(err) {  
                res.render('error', { errorMessage: err.message });
            } else {   
                res.render('taskCompleted', { results: results, titleWeb: "List tasks completed"})
            }
        }) 
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error)
    }
}

/***
 * @param procedure deleted task for id
 */
exports.deleteTask = async (req, res) => {   
    try {
        const id = req.body.id
        conexion.query('DELETE FROM tasks WHERE id= ?', [ id ], (err, results) => {
            if(err) {  
                res.render('error', { errorMessage: err.message });
            } else {   
                res.render('tasks', {results: results, titleWeb: "List tasks"})
            }
        }) 
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error)
    }
}

/***
 * @param procedure marcar como tarea completada por el usuario
 */
exports.completedTask = async (req, res) => {   
    try {
        const id = req.body.id
        conexion.query('UPDATE users SET Estado = completado WHERE id= ?', [id], (err, results) => {
            if(err) {  
                res.render('error', { errorMessage: err.message });
            } else {   
                res.render('taskCompleted', {results: results[0], titleWeb: "List tasks completed"})
            }
        }) 
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error)
    }
}

/***
 * @param procedure edit tarea en particular
 */
exports.editTask = async (req, res) => {   
    try {
        const id = req.body.id
        conexion.query('SELECT * FROM tasks WHERE id= ?', [ id ], (err, results) => {
            if(err) {  
                res.render('error', { errorMessage: err.message });
            } else {   
                res.render('editTask', {results: results[0], titleWeb: "Edit tasks"})
            }
        }) 
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error)
    }
}

/***
 * @param procedure mostrar todos los detalles de las tareas en vista: taskDetails.ejs 
 */
exports.taskDetails = async (req, res) => {   
    try {
        const id = req.params.id;
        conexion.query('SELECT * FROM tasks WHERE id= ?', [id], (err, results) => {
            if(err) {  
                res.render('error', { errorMessage: err.message });
            } else {   
                res.render('taskDetails', { results: results, titleWeb: "Task details"})
            }
        }) 
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error)
    }
}

/***
 * @param procedure asignar tarea por el usuario
 */
exports.asignarTarea = async (req, res) => {   
    try {
        const taskId = req.body.taskId
        const userId = req.body.userId
        const consulta = 'INSERT INTO asignated (taskId, userId) VALUES (?, ?)';
        conexion.query(consulta, [taskId, userId], (err, results) => {
            if(err) {  
                res.render('error', { errorMessage: err.message });
            } else {   
                res.render('asigned', { results: results, titleWeb: "Assigned tasks for users"})
            }
        }) 
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error)
    }
}


/***
 * @param procedure mostrar tabla de tareas asignadas en: views/asigned.ejs
 */
exports.mostrarTareaAsignada = async (req, res) => {   
    try {
        const taskId = req.body.taskId
        const userId = req.body.userId
        const consulta = 'SELECT * FROM asignated WHERE id= ?';
        conexion.query(consulta, [taskId, userId], (err, results) => {
            if(err) {  
                res.render('error', { errorMessage: err.message });
            } else {   
                res.render('asigned', { results: results, titleWeb: "List tasks asigned"})
            }
        }) 
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error)
    }
}




