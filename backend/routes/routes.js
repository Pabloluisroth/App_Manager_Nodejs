const express = require('express');
const router = express.Router();
const agendController = require('../controllers/agendController')
const noteController = require('../controllers/noteController')
const profileController = require('../controllers/profileController')
const taskController = require('../controllers/taskController')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

// routes notes
router.post('/saveNote', noteController.saveNote)
router.post('/updateNote', noteController.updateNote)
router.get('/deletedNote/:id', noteController.deletedNote)
router.get('/editdNote/:id', noteController.editNote)
router.get('/notes', noteController.notes)
router.get('/createNote', authController.isAuthenticated, (req, res) => { // acceso a views --> createNote.ejs
    if (row.rol=="Admin") {        
        res.render('createNote', { titleWeb: "Create note"})
    } else {
        res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
    }
})

// routes Agends
router.post('/updateAgend', agendController.updateAgend)
router.get('/deleteAgend/:id', agendController.deletedAgend)
router.get('/editAgend/:id', agendController.deletedAgend)
router.get('/agendDetails/:id', agendController.updateAgend)
router.get('/agends', agendController.updateAgend)
router.get('/saveAgend', agendController.saveAgend)
router.get('/createAgend', authController.isAuthenticated, (req, res) => { // acceso a views --> createAgend.ejs
    if (row.rol=="Admin") {        
        res.render('createAgend', { titleWeb: "Create agend"})
    } else {
        res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
    }
})

// routes profile
router.post('/showProfile', profileController.showProfile)
router.post('/updateProfile', profileController.updateProfile)
router.get('/editProfile/:id', profileController.editProfile)
router.get('/profiles', profileController.Profiles)

// routes taks
router.post('/saveTask', taskController.saveTask)
router.post('/updateTask', taskController.updateTask)
router.get('/deleteTask/:id', taskController.deleteTask);
router.get('/editTask/:id', taskController.editTask,authController.isAuthenticated) // controlado el acceso mediente el rol del usuario
router.get('/asignatedTask/:id',taskController.asignatedTask );
router.get('/tasks', authController.isAuthenticated, taskController.updateTask)
router.get('/completedTask/:id',taskController.updateTask);
router.get('/taskCompleted', authController.isAuthenticated, taskController.taskCompleted ) // controlado el acceso mediente el rol del usuario
router.get('/taskDetails/:id', authController.isAuthenticated, taskController.taskDetails) // controlado el acceso mediente el rol del usuario
router.get('/createTask', authController.isAuthenticated, (req, res) => { // acceso a views --> createTask.ejs
    if (row.rol=="Admin") {        
        res.render('createTask', { titleWeb: "Create task"})
    } else {
        res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
    }
})

// routes for users
router.post('/saveUser', userController.saveUser)
router.post('/updateUser', userController.updateUser)
router.post('/bansUser/:id', userController.bansUser)
router.post('/revertBansUser/:id', userController.revertBansUser)
router.post('/deleteUser/:id', userController.deleteUser)
router.get('/editUser/:id', userController.editUser) // acceso segun rol a edicion de usuario 
router.get('/usersBanned', userController.usersBanned) // mostrar baneados
router.get('/users', userController.users) // mostrar todos usuarios
router.get('/createUser',authController.isAuthenticated , (req, res) => { // acceso a views --> createUser.ejs
    if (row.rol=="Admin") {        
        res.render('createUser', { titleWeb: "Create user"})
    } else {
        res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
    }
})

// router for view
router.get('/', authController.isAuthenticated, (req, res) => { res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})})
router.get('/contact', authController.isAuthenticated, (req, res) => { res.render('contact', { userName: row.name, image: row.image, titleWeb: "Control Contact"})})
router.get('/logout', authController.logout)
router.get('/login', (req, res) => { res.render('login', { alert:false })})
router.get('/register', (req, res) => { res.render('register', { alert:false })})
router.post('/register', authController.register)
router.post('/login', authController.login)

router.post('/upload/:id', (req, res) => {
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