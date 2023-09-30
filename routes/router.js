const express = require('express')
const router = express.Router()

//to invoke the methods for the CRUD of users / tasks / notes
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const taskController = require('../controllers/taskController')
const noteController = require('../controllers/noteController')
const { Router } = require('express')

//path to send the data in json format
const { json } = require('express');

//Invoke the database connection
const conexion = require('../database/db')

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
router.post('/saveUser', userController.saveUser)
router.post('/updateUser', userController.updateUser)

/////////////////////////////////////////////////////////////////////////////////////////////> TASKS

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
                res.render('editTask', { user: results[0], titleWeb: "Edit task" })
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

/////////////////////////////////////////////////////////////////////////////////////////////> NOTES

router.get('/notes', authController.isAuthenticated, (req, res) => {  
    conexion.query('SELECT * FROM notes', (error, results) => {
        if(error){
            throw error;
        } else {
            if (row.rol=="Admin" , "Subscriber") { 
                res.render('notes', { results: results, titleWeb: "List notes" })
            } else {
                res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
            }
        }
    })
})

router.get('/createNote', authController.isAuthenticated, (req, res) => {
    if (row.rol=="Admin" , "Subscriber") {        
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
            if(row.rol=="Admin" , "Subscriber") {
                res.render('editNote', { user: results[0], titleWeb: "Edit note" })
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

router.post('/saveNote', noteController.saveNote)
router.post('/updateNote', noteController.updateNote)

//router for views
router.get('/contact', authController.isAuthenticated, (req, res) => {
    res.render('contact', { userName: row.name, image: row.image, titleWeb: "Control Contact"})
})

router.get('/', authController.isAuthenticated, (req, res) => {
    res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
})

router.get('/logout', authController.logout)

router.get('/login', (req, res) => {
    res.render('login', { alert:false })
})

router.get('/register', (req, res) => {
    res.render('register', { alert:false })
})

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