module.exports = function(app) {

    const conexion = require('../database/db')
    const taskController = require('../controllers/taskController')

    router.get('/taskCompleted', authController.isAuthenticated, (req, res) => {
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
    })
    
    router.get('/completedTask/:id', (req, res) => { 
        const id= req.params.id
        conexion.query('UPDATE users SET Estado = completado WHERE id= ?', [id], (error, results) => {
            if(error){
                throw error;
            } else {
                res.redirect('/taskCompleted')
            }
        })
    });
        
    router.get('/asignatedTask/:asignada', (req, res) => { 
        const asignada= req.params.asignada
        conexion.query('INSERT INTO tasks set asignada = asignada', [asignada], (error, results) => {
            if(error){
                throw error;
            } else {
                res.redirect('/taskDetails')
            }
        })
    });
 
    router.get('/tasks', authController.isAuthenticated, (req, res) => {
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
    })
    
    router.get('/taskDetails/:id', authController.isAuthenticated, (req, res) => {
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
    })
    
    router.get('/createTask', authController.isAuthenticated, (req, res) => {
        if (row.rol=="Admin") {        
            res.render('createTask', { titleWeb: "Create task"})
        } else {
            res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
        }
    })

    router.get('/editTask/:id', authController.isAuthenticated, (req, res) => {
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
    })

    router.get('/deleteTask/:id', (req, res) => {
        const id = req.params.id
        conexion.query('DELETE FROM tasks WHERE id= ?', [id], (error, results) => {
            if(error){
                throw error;
            } else {
                res.redirect('/tasks')
            }
        })
    });

    router.post('/saveTask', taskController.saveTask)
    router.post('/updateTask', taskController.updateTask)
}