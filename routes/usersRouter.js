module.exports = function(app) {

    const conexion = require('../database/db')
    const userController = require('../controllers/userController')
    const authController = require('../controllers/authController')

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

    router.post('/saveUser', userController.saveUser)
router.post('/updateUser', userController.updateUser)
}
