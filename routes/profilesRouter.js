module.exports = function(app) {

    const conexion = require('../database/db')
    const profileController = require('../controllers/profileController')

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
    
    router.post('/updateProfile', profileController.updateProfile)
}