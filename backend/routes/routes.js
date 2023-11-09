const express = require('express');
const router = express.Router();
const agendController = require('../controllers/agendController')
const noteController = require('../controllers/noteController')
const profileController = require('../controllers/profileController')
const taskController = require('../controllers/taskController')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const eventController = require('../controllers/eventController')
const assignController = require('../controllers/assignController')

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// routes notes
router.post('/saveNote', noteController.saveNote)
router.post('/updateNote', noteController.updateNote)
router.get('/editdNote/:id', noteController.editNote, authController.isAuthenticated, (req, res) => { 
    if (row.rol=="Admin") {        
        res.render('notes', { titleWeb: "notes"})
    } else {
        res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
    }
})
router.get('/deletedNote/:id', noteController.deletedNote, authController.isAuthenticated, (req, res) => { 
    if (row.rol=="Admin") {        
        res.render('notes', { titleWeb: "notes"})
    } else {
        res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
    }
})
router.get('/notes', noteController.notes)
router.get('/createNote',noteController.createNote, authController.isAuthenticated, (req, res) => { // acceso a views --> createNote.ejs
    if (row.rol=="Admin") {        
        res.render('createNote', { titleWeb: "Create note"})
    } else {
        res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
    }
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// routes Agends
router.post('/updateAgend', agendController.updateAgend)

router.get('/deleteAgend/:id', agendController.deletedAgend,authController.isAuthenticated, (req, res) => { 
    if (row.rol=="Admin") {        
        res.render('agends', { titleWeb: "Agends"})
    } else {
        res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
    }
})

router.get('/editAgend/:id', agendController.editAgend, authController.isAuthenticated, (req, res) => { 
    if (row.rol=="Admin") {        
        res.redirect('/editAgend')
    } else {
        res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
    }
})

router.get('/agendDetails/:id', agendController.agendDetails)

router.get('/agends', agendController.agends)

router.get('/saveAgend',agendController.saveAgend, authController.isAuthenticated, (req, res) => { 
    if (row.rol=="Admin") {        
        res.render('agends', { titleWeb: "Agends"})
    } else {
        res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
    }
})

router.get('/createAgend', authController.isAuthenticated, (req, res) => { // acceso a views --> createAgend.ejs
    if (row.rol=="Admin") {        
        res.render('createAgend', { titleWeb: "Create agend"})
    } else {
        res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
    }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// routes profile
router.post('/showProfile', profileController.showProfile)
router.post('/updateProfile', profileController.updateProfile)

router.get('/editProfile/:id',profileController.editProfile,authController.isAuthenticated, (req, res) => { // acceso a views --> createAgend.ejs
    if (row.rol=="Admin") {        
        res.render('profiles', { titleWeb: "Profiles"})
    } else {
        res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
    }
})

router.get('/profiles', profileController.Profiles)

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// routes taks
router.post('/saveTask', taskController.saveTask)
router.post('/updateTask', taskController.updateTask)

router.get('/deleteTask/:id', authController.isAuthenticated,taskController.deleteTask, (req, res) => {
    if (row.rol=="Admin") {        
        res.render('tasks', { titleWeb: "tasks"})
    } else {
        res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
    }
})

router.get('/editTask/:id', authController.isAuthenticated,taskController.editTask, (req, res) => { 
    if (row.rol=="Admin") {        
        res.render('editTask', { titleWeb: "Edit tasks"})
    } else {
        res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
    }
})

router.get('/tasks', taskController.tasks)
router.get('/completedTask/:id',taskController.completedTask);

router.get('/taskCompleted', authController.isAuthenticated, taskController.taskCompleted, (req, res) => { 
    if (row.rol=="Admin") {        
        res.render('tasks', { titleWeb: "tasks"})
    } else {
        res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
    }
})

router.get('/taskDetails/:id', taskController.taskDetails) 
router.get('/tasks/:id', taskController.taskDetails) 

router.get('/createTask', authController.isAuthenticated,taskController.saveTask, (req, res) => { 
    if (row.rol=="Admin") {        
        res.render('createTask', { titleWeb: "Create task"})
    } else {
        res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard", }) // pasar error --> alert: true, alertMessage: 'ha ocurrido un error'
    }
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// routes for assign

router.post('/assignTask/:id', assignController.assingTask );
router.get('/asigned', assignController.showAssignedTasks) 

router.get('/editAssig/:id', authController.isAuthenticated,assignController.editTaskAssignment, (req, res) => { 
    if (row.rol=="Admin") {        
        res.render('editAssign', { titleWeb: "Edit Assignment"})
    } else {
        res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
    }
})

router.get('/deleteAssign/:id',authController.isAuthenticated,assignController.deleteTaskAssignment , (req, res) => { 
    if (row.rol=="Admin") {        
        res.render('assign', { titleWeb: "Assign"})
    } else {
        res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
    }
})

router.post('/updateAssignedTask', assignController.updateAssignedTask)

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// routes for events

router.get('/calendar', eventController.getAllEvents);
router.post('/calendar', eventController.createEvent);
router.put('/calendar/:id', eventController.updateEvent);    // updateEvent
router.delete('/calendar/:id', eventController.deleteEvent); // deleteEvent

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// routes for users

router.post('/saveUser',authController.isAuthenticated,userController.saveUser , (req, res) => { 
    if (row.rol=="Admin") {        
        res.render('users', {titleWeb: "users", alert:false })
    } else {
        res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
    }
})

router.get('/updateUser/:id',authController.isAuthenticated,userController.updateUser , (req, res) => { // acceso a views --> createUser.ejs
    if (row.rol=="Admin") {        
        res.render('users', { titleWeb: "users", alert:false})
    } else {
        res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
    }
})

router.get('/bansUser/:id',authController.isAuthenticated,userController.bansUser , (req, res) => { // acceso a views --> createUser.ejs
    if (row.rol=="Admin") {        
        res.render('users', { titleWeb: "users"})
    } else {
        res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
    }
})

router.post('/revertBansUser/:id', userController.revertBansUser)

router.get('/deleteUser/:id',authController.isAuthenticated,userController.deleteUser , (req, res) => { // acceso a views --> createUser.ejs
    if (row.rol=="Admin") {        
        res.render('users', { titleWeb: "users"})
    } else {
        res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
    }
})
router.get('/editUser/:id',authController.isAuthenticated,userController.editUser, (req, res) => { // acceso a views --> createUser.ejs
    if (row.rol=="Admin") {        
        res.render('editUser', { titleWeb: "Edit user"})
    } else {
        res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
    }
})

router.get('/usersBanned',authController.isAuthenticated,userController.usersBanned , (req, res) => { // acceso a views --> createUser.ejs
    if (row.rol=="Admin") {        
        res.render('usersBanned', { titleWeb: "Edit user"})
    } else {
        res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
    }
})

router.get('/users', userController.users) // mostrar todos usuarios

router.get('/createUser',authController.isAuthenticated , (req, res) => { // acceso a views --> createUser.ejs
    if (row.rol=="Admin") {        
        res.render('createUser', { titleWeb: "Create user"})
    } else {
        res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
    }
})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// EVENTOS



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// router for view
router.get('/', authController.isAuthenticated, (req, res) => { res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})}) 
router.get('/contact', authController.isAuthenticated, (req, res) => { res.render('contact', { userName: row.name, image: row.image, titleWeb: "Control Contact"})})
router.get('/logout', authController.logout)
router.get('/login', (req, res) => { res.render('login', { alert:false })})
router.get('/register', (req, res) => { res.render('register', { alert:false })})
router.post('/register', authController.register)
router.post('/login', authController.login)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// others routes
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


// rouer.post(./uploadImage)

module.exports = router;