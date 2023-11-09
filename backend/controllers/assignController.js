
 const conexion = require('../database/db')

/***
 * @param procedure asignar tarea por el usuario
 */
exports.assingTask = async (req, res) => {   
    try {
        const taskId = req.body.taskId
        const userId = req.body.userId
        const consulta = 'INSERT INTO asigned (taskId, userId) VALUES (?, ?)';
        conexion.query(consulta, [taskId, userId], (err, results) => {
            if(err) {  
                res.render('error', { errorMessage: err.message });
            } else {   
                res.render('asigned', { results: results, titleWeb: "Assign Task"})
            }
        }) 
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error)
    }
}

/***
 * @param procedure mostrar tabla de tareas asignadas en: views/asigned.ejs
 */
exports.showAssignedTasks = async (req, res) => {   
    try {
        const taskId = req.body.taskId
        const userId = req.body.userId
        const consulta = 'SELECT * FROM asigned ';
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

/***
 * @param procedure update evento ( modificar ) /:id
 */
exports.updateAssignedTask = async (req, res) => {   
    try {
        const id = req.body.id
        const taskId = req.body.taskId
        const userId = req.body.userId
        conexion.query('UPDATE asigned SET ? WHERE id = ?', [{ taskId:taskId, userId:userId}, id ], (err, results) => {
        if(err) {  
                res.render('error', { errorMessage: err.message });
            } else {   
                res.render('asigned', { asigned: results, titleWeb: "List tasks asigned"})
            }
        }) 
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error)
        res.render('error', { errorMessage: 'Error en la consulta a la base de datos:' });
    }
}

/***
 * @param procedure editar asignacion de usuario en tarea /:id
 */
exports.editTaskAssignment = async (req, res) => {   
    try {
        const id = req.body.id
        conexion.query('SELECT * FROM asigned WHERE id= ?', [ id ], (err, results) => {
            if(err) {  
                res.render('error', { errorMessage: err.message})
            } else {   
                res.render('editAssign', {asigned: results[0], titleWeb: "Edit Assign"})
            }
        }) 
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error)
        res.render('error', { errorMessage: 'Error en la consulta a la base de datos:' });
    }
}


/***
 * @param procedure delete evento ( eliminar ) /:id
 */
exports.deleteTaskAssignment = async (req, res) => {   
    try {
        const id = req.body.id
        conexion.query(`DELETE FROM asigned WHERE id= ?`, [ id ], (err, results) => {
            if(err) {  
                res.render('error', { errorMessage: err.message})
            } else {   
                res.render('asigned', { asigned: results, titleWeb: "Edit Asignement"})
            }
        }) 
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error)
        res.render('error', { errorMessage: 'Error en la consulta a la base de datos:' });
    }
}