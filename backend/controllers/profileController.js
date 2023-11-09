
//invoke the DB connection
const conexion = require('../database/db')

//procedure to update profile

exports.updateProfile = async (req, res) => {   
    try {
        const id = req.body.id
        const image = req.body.image
        const phone = req.body.phone
        const location = req.body.location
        conexion.query('UPDATE agends SET ? WHERE id = ?', [{ image:image, phone:phone, location:location, }, id ], (err, results) => {
        if(err) {  
                res.render('error', { errorMessage: err.message });
            } else {   
                res.render('profiles', {profile: results[0], titleWeb: " MY profile"})
            }
        }) 
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error)
        res.render('error', { errorMessage: 'Error en la consulta a la base de datos:' });
        
    }
}

exports.showProfile = async (req, res) => {   
    try {
        const id = req.body.id
        const image = req.body.image
        const phone = req.body.phone
        const location = req.body.location
        conexion.query(`SELECT * FROM profiles WHERE rol=Admin `,[{ image:image, phone:phone, location:location}, id ], (err, results) => {
            if(err) {  
                res.render('error', { errorMessage: err.message });
            } else {   
                res.render('profiles', {results: results, titleWeb: "Profiles"})
            }
        }) 
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error)
        res.render('error', { errorMessage: 'Error en la consulta a la base de datos:' });
    }
}

exports.editProfile = async (req, res) => {   
    try {
        const id = req.body.id
        conexion.query('SELECT * FROM profiles WHERE id= ?', [ id ], (err, results) => {
            if(err) {  
                res.render('error', { errorMessage: err.message });
            } else {   
                res.render('editProfile', {profiles: results[0], titleWeb: "My profile"})
            }
        }) 
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error)
        res.render('error', { errorMessage: 'Error en la consulta a la base de datos:' });
    }
}

exports.Profiles = async (req, res) => {   
    try {
        const id = req.params.id;
        conexion.query('SELECT * FROM profiles WHERE id = 1',[id], (err, results) => {
            if(err) {  
                res.render('error', { errorMessage: err.message });
            } else {   
                res.render('profiles', { results: results, titleWeb: "Profiles", })
            }
        }) 
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error)
        res.render('error', { errorMessage: 'Error en la consulta a la base de datos:' });
    }
}

