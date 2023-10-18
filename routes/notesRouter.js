module.exports = function(app) {

    const conexion = require('../database/db')
    const noteController = require('../controllers/noteController')

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

    router.post('/saveNote', noteController.saveNote)
    router.post('/updateNote', noteController.updateNote)
}