//invoke the DB connection
const conexion = require('../database/db')

/**
 * @param procedure subir imagen para usuario 
 */
exports.uploadImage = async (req, res) => {   
    try {
        const id = req.params.id
        const image = req.file.filename
        conexion.query('UPDATE users SET ? WHERE id= ?', [{image:image}, id], (error, results) => {
        if(err) {  
                res.render('error', { errorMessage: err.message})
            } else {   
                res.redirect('/users')
            }
        }) 
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error)
        res.render('error', { errorMessage: 'Error en la consulta a la base de datos:' });
    }
}
