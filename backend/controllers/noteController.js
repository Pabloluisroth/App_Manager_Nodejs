//invoke the DB connection
const conexion = require('../database/db')

/**
 * @param procedure to create and save notes
 */
exports.createNote = async (req, res) => {   
    try {
        const descripcion = req.body.descripcion
        const date = req.body.date
        conexion.query('INSERT INTO notes SET ?', {descripcion:descripcion, date:date},  (err, results)=> {
            if(err) {  
                res.render('error', { errorMessage: err.message });
            } else {   
                res.redirect('/notes')
            }
        }) 
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error)
        res.render('error', { errorMessage: 'Error en la consulta a la base de datos:' });
    }
}

exports.saveNote = async (req, res) => {   
    try {
        const descripcion = req.body.descripcion
        const date = req.body.date
        conexion.query('INSERT INTO notes SET ?', {descripcion:descripcion, date:date},  (err, results)=> {
            if(err) {  
                res.render('error', { errorMessage: err.message });
            } else {   
                res.redirect('/notes')
            }
        }) 
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error)
        res.render('error', { errorMessage: 'Error en la consulta a la base de datos:' });
    }
}

/**
 * @param procedure to update note
 */
exports.updateNote = async (req, res) => {   
    try {
        const id = req.body.id
        const descripcion = req.body.descripcion
        const date = req.body.date
        conexion.query('UPDATE notes SET ? WHERE id = ?', [{ descripcion:descripcion, date:date}, id ], (err, results)=> {
            if(err) {  
                res.render('error', { errorMessage: err.message });
            } else {   
                res.render('notes',{note: results[0], titleWeb: "Notes"})
            }
        }) 
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error)
        res.render('error', { errorMessage: 'Error en la consulta a la base de datos:' });
    }
}

/**
 * @param procedure to deleted note
 */
exports.deletedNote = async (req, res) => {   
    try {
        const id = req.body.id
        conexion.query('DELETE FROM notes WHERE id= ?', [ id ], (err, results) => {
            if(err) {  
                res.render('error', { errorMessage: err.message });
            } else {   
                res.render('notes', {results: results, titleWeb: "Notes"})
            }
        }) 
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error)
        res.render('error', { errorMessage: 'Error en la consulta a la base de datos:' });
    }
}

exports.editNote = async (req, res) => {   
    try {
        const id = req.body.id
        conexion.query('SELECT * FROM notes WHERE id= ?', [ id ], (err, results) => {
            if(err) {  
                res.render('error', { errorMessage: err.message });
            } else {   
                res.render('notes', {agend: results[0], titleWeb: "Notes"})
            }
        }) 
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error)
        res.render('error', { errorMessage: 'Error en la consulta a la base de datos:' });
    }
}

exports.notes = async (req, res) => {   
    try {
        conexion.query('SELECT * FROM notes', (err, results) => {
            if(err) {  
                res.render('error', { errorMessage: err.message });
            } else {   
                res.render('notes', { results: results, titleWeb: "List notes",})
            }
        }) 
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error)
        res.render('error', { errorMessage: 'Error en la consulta a la base de datos:' });
    }
}

