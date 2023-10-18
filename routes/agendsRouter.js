module.exports = function(app) {

    const conexion = require('../database/db')
    const agendController = require('../controllers/agendController')

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

    router.post('/updateAgend', agendController.updateAgend)
}