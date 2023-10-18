const express = require('express')
const router = express.Router()
const conexion = require('../database/db')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const taskController = require('../controllers/taskController')
const noteController = require('../controllers/noteController')
const agendController = require('../controllers/agendController')
const profileController = require('../controllers/profileController')

/////////////////////////////////////////////////////////////////////////////////////////////> USERS
router.get('/users', authController.isAuthenticated, (req, res) => {  
    conexion.query('SELECT * FROM users', (error, results) => {
        if(error){
            throw error;
        } else {
            if (row.rol=="Admin") { 
                res.render('users', { results: results, titleWeb: "List users" })
            } else {
                res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
            }
        }
    })
})

// ruta usuarios baneados ( list )

router.get('/usersBanned', authController.isAuthenticated, (req, res) => {  
    conexion.query('SELECT * FROM users WHERE bans = 1', (error, results) => {
        if(error){
            throw error;
        } else {
            if (row.rol=="Admin") { 
                res.render('usersBanned', { results: results, titleWeb: "List users banned" })
            } else {
                res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
            }
        }
    })
})

router.get('/createUser', authController.isAuthenticated, (req, res) => {
    if (row.rol=="Admin") {        
        res.render('createUser', { titleWeb: "Create user"})
    } else {
        res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
    }
})
router.get('/editUser/:id', authController.isAuthenticated, (req, res) => {
    const id = req.params.id;
    conexion.query('SELECT * FROM users WHERE id= ?', [id], (error, results) => {
        if(error){
            throw error;
        } else {
            if(row.rol=="Admin") {
                res.render('editUser', { user: results[0], titleWeb: "Edit user" })
            } else {
                res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
            }
        }
    })
})
router.get('/deleteUser/:id', (req, res) => {
    const id = req.params.id
    conexion.query('DELETE FROM users WHERE id= ?', [id], (error, results) => {
        if(error){
            throw error;
        } else {
            res.redirect('/users')
        }
    })
});


//< crear controlador

router.get('/bansUser/:id', (req, res) => {  // modificar, pasar controlador y no la ruta 
    const id = req.params.id
    conexion.query('UPDATE users SET bans = true WHERE id= ?', [id], (error, results) => {
        if(error){
            throw error;
        } else {
            res.redirect('/usersBanned')
        }
    })
});


router.get('/revertBansUser/:id', (req, res) => {  // modificar, pasar controlador y no la ruta 
    const id = req.params.id
    conexion.query('UPDATE users SET bans = false WHERE id= ?', [id], (error, results) => {
        if(error){
            throw error;
        } else {
            res.redirect('/usersBanned')
        }
    })
});

//>

/////////////////////////////////////////////////////////////////////////////////////////////> TASKS

router.get('/taskCompleted', authController.isAuthenticated, (req, res) => {
    conexion.query('SELECT * FROM completed_tasks', (error, results) => {
        if(error){
            throw error;
        } else {
            if (row.rol=="Admin") { // pasar mas roles
                res.render('taskCompleted', { results: results, titleWeb: "List tasks completed" })
            } else {
                res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
            }
        }
    })
})

router.get('/completedTask/:id', (req, res) => { // modificar, pasar controlador y no la ruta 
    const id= req.params.id
    conexion.query('UPDATE users SET Estado = completado WHERE id= ?', [id], (error, results) => {
        if(error){
            throw error;
        } else {
            res.redirect('/taskCompleted')
        }
    })
});


router.get('/asignatedTask/:asignada', (req, res) => { // modificar, pasar controlador y no la ruta 
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
            if (row.rol=="Admin") { // pasar mas roles
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
            if (row.rol=="Admin") { // pasar mas roles
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

/////////////////////////////////////////////////////////////////////////////////////////////> NOTES

router.get('/notes', authController.isAuthenticated, (req, res) => {  
    conexion.query('SELECT * FROM notes', (error, results) => {
        if(error){
            throw error;
        } else {
            if (row.rol=="Admin") { 
                res.render('notes', { results: results, titleWeb: "List notes" })
            } else {
                res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
            }
        }
    })
})
router.get('/createNote', authController.isAuthenticated, (req, res) => {
    if (row.rol=="Admin") {        
        res.render('createNote', { titleWeb: "Create note"})
    } else {
        res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
    }
})


router.get('/editNote/:id', authController.isAuthenticated, (req, res) => {
    const id = req.params.id;
    conexion.query('SELECT * FROM notes WHERE id= ?', [id], (error, results) => {
        if(error){
            throw error;
        } else {
            if(row.rol=="Admin") { 
                res.render('editNote', { note: results[0], titleWeb: "Edit note" })
            } else {
                res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
            }
        }
    })
})

router.get('/deleteNote/:id', (req, res) => {
    const id = req.params.id
    conexion.query('DELETE FROM notes WHERE id= ?', [id], (error, results) => {
        if(error){
            throw error;
        } else {
            res.redirect('/notes')
        }
    })
});

/////////////////////////////////////////////////////////////////////////////////////////////> AGENDS

router.get('/agends', authController.isAuthenticated, (req, res) => {  
    conexion.query('SELECT * FROM agends', (error, results) => {
        if(error){
            throw error;
        } else {
            if (row.rol=="Admin") { // crear campo en tabla para poder comparar por otro parametro
                res.render('agends', { results: results, titleWeb: "List agends" })
            } else {
                res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
            }
        }
    })
})

router.get('/agendDetails/:id', authController.isAuthenticated, (req, res) => {
    const id = req.params.id;
    conexion.query('SELECT * FROM agends WHERE id= ?', [id], (error, results) => {
        if(error){
            throw error;
        } else {
            if (row.rol=="Admin") { 
                res.render('agendDetails', { results: results, titleWeb: "List agend details" })
            } else if (row.rol=="Subscriber") { 
                res.render('agendDetails', { results: results, titleWeb: "List agend details" })
            } else{
                res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
            }
        }
    })
})

router.get('/createAgend', authController.isAuthenticated, (req, res) => {
    if (row.rol=="Admin") {        
        res.render('createAgend', { titleWeb: "Create agend"})
    } else {
        res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
    }
})
router.get('/editAgend/:id', authController.isAuthenticated, (req, res) => {
    const id = req.params.id;
    conexion.query('SELECT * FROM agends WHERE id= ?', [id], (error, results) => {
        if(error){
            throw error;
        } else {
            if(row.rol=="Admin") {
                res.render('editAgend', { agend: results[0], titleWeb: "Edit agend" })
            } else {
                res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
            }
        }
    })
})
router.get('/deleteAgend/:id', (req, res) => {
    const id = req.params.id
    conexion.query('DELETE FROM agends WHERE id= ?', [id], (error, results) => {
        if(error){
            throw error;
        } else {
            res.redirect('/agends')
        }
    })
});

/////////////////////////////////////////////////////////////////////////////////////////////> PROFILES

router.get('/profiles', authController.isAuthenticated, (req, res) => {  
    conexion.query('SELECT * FROM profiles WHERE id = 22', (error, results) => { // aqui habra que filtrar
        if(error){
            throw error;
        } else {
            if (row.rol=="Admin") { // crear campo en tabla para poder comparar por otro parametro
                res.render('profiles', { results: results, titleWeb: "my profile" })
            } else {
                res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
            }
        }
    })
})

router.get('/editProfile/:id', authController.isAuthenticated, (req, res) => {
    const id = req.params.id;
    conexion.query('SELECT * FROM profiles WHERE id= ?', [id], (error, results) => {
        if(error){
            throw error;
        } else {
            if(row.rol=="Admin") {
                res.render('editProfile', { profile: results[0], titleWeb: "My profile" })
            } else {
                res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
            }
        }
    })
})

/////////////////////////////////////////////////////////////////////////////////////> SAVE - UPDATE CRUD 

router.post('/updateAgend', agendController.updateAgend)
router.post('/saveNote', noteController.saveNote)
router.post('/updateNote', noteController.updateNote)
router.post('/saveTask', taskController.saveTask)
router.post('/updateTask', taskController.updateTask)
router.post('/saveUser', userController.saveUser)
router.post('/updateUser', userController.updateUser)
router.post('/updateProfile', profileController.updateProfile)

/////////////////////////////////////////////////////////////////////////////////////> VIEWS

router.get('/', authController.isAuthenticated, (req, res) => {
    res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
})

router.get('/contact', authController.isAuthenticated, (req, res) => {
    res.render('contact', { userName: row.name, image: row.image, titleWeb: "Control Contact"})
})

router.get('/logout', authController.logout)
router.get('/login', (req, res) => { res.render('login', { alert:false })})
router.get('/register', (req, res) => { res.render('register', { alert:false })})

router.post('/register', authController.register)
router.post('/login', authController.login)


router.post('/upload/:id', (req, res) => {

    // añadir consulta para que tambien actualize en otras tablas
    const id = req.params.id
    const image = req.file.filename
    conexion.query('UPDATE users SET ? WHERE id= ?', [{image:image}, id], (error, results) => {
        if(error){
            console.error(error);
        } else {
            res.redirect('/users')
        }
    })
})

module.exports = router;