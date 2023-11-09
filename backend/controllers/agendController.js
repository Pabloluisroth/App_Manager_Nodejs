//invoke the DB connection
const conexion = require('../database/db')

/**
 * @param {*} procedure to create and save agend
 */
exports.saveAgend = async (req, res) => {   
    try {
        const image = req.body.image
        const name = req.body.name
        const rol = req.body.rol
        const phone = req.body.phone
        const email = req.body.email
        const location = req.body.location
        conexion.query('INSERT INTO users SET ?', { image:image, name:name, rol:rol,phone:phone, location:location, email:email}, (err, results) => {
            if(err) {  
                res.render('error', { errorMessage: err.message });
            } else {   
                res.redirect('/agends')
            }
        }) 
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error)
        res.render('error', { errorMessage: 'Error en la consulta a la base de datos:' });
    }
}

/**
 * @param procedure to update agend
 */
exports.updateAgend = async (req, res) => {   
    try {
        const id = req.body.id
        const image = req.body.image
        const name = req.body.name
        const rol = req.body.rol
        const phone = req.body.phone
        const email = req.body.email
        const location = req.body.location
        conexion.query('UPDATE agends SET ? WHERE id = ?', [{ image:image, name:name, rol:rol, phone:phone, location:location, email:email}, id ], (err, results) => {
            if(err) {  
                res.render('error', { errorMessage: err.message });
            } else {   
                res.render('agends',{agend: results[0], titleWeb: "Agends"})
            }
        }) 
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error)
        res.render('error', { errorMessage: 'Error en la consulta a la base de datos:' });
    }
}

/**
 * @param procedure to deleted agend
 */
exports.deletedAgend = async (req, res) => {   
    try {
        const id = req.body.id
        conexion.query('DELETE FROM agends WHERE id= ?', [ id ], (err, results) => {
            if(err) {  
                res.render('error', { errorMessage: err.message });
            } else {   
                res.render('agends', { results: results, titleWeb: "Agends"})
            }
        }) 
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error)
        res.render('error', { errorMessage: 'Error en la consulta a la base de datos:' });
    }
}

/**
 * @param procedure to edit agend
 */
exports.editAgend = async (req, res) => {   
    try {
        const id = req.body.id
        conexion.query('SELECT * FROM agends WHERE id= ?', [ id ], (err, results) => {
            if(err) {  
                res.render('error', { errorMessage: err.message });
            } else {   
                res.render('agends', {agend: results[0], titleWeb: "Agends"})
            }
        }) 
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error)
        res.render('error', { errorMessage: 'Error en la consulta a la base de datos:' });
    }
}

/**
 * @param procedure show details agend at view agendDetails.ejs
 */
exports.agendDetails = async (req, res) => {   
    try {
        const id = req.body.id
        conexion.query('SELECT * FROM agends WHERE id= ?', [ id ], (err, results) => {
            if(err) {  
                res.render('error', { errorMessage: err.message });
            } else {   
                res.render('agendDetails', { results: results, titleWeb: "List agend details",})
            }
        }) 
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error)
        res.render('error', { errorMessage: 'Error en la consulta a la base de datos:' });
    }
}

/**
 * @param procedure show agend at view agends.ejs
 */
exports.agends = async (req, res) => {   
    try {
        conexion.query('SELECT * FROM agends', (err, results) => {
            if(err) {  
                res.render('error', { errorMessage: err.message });
            } else {   
                res.render('agends', { results: results, titleWeb: "Agends",})
            }
        }) 
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error)
        res.render('error', { errorMessage: 'Error en la consulta a la base de datos:' });
    }
}








