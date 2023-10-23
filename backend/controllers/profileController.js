
//invoke the DB connection
const conexion = require('../database/db')

//procedure to update profile

exports.updateProfile = (req, res) => {
    const id = req.body.id
    const image = req.body.image
    const phone = req.body.phone
    const location = req.body.location
    
    conexion.query('UPDATE profiles SET ? WHERE id = 22', [{ image:image, phone:phone, location:location}, id ], (error, results) => {
        if(error) {
            console.error(error)
        } else {
            res.redirect('/');
        }
    })
}

exports.showProfile = (req, res) => {
    const id = req.body.id
    const image = req.body.image
    const phone = req.body.phone
    const location = req.body.location

    let show= `Select * FROM profiles WHERE rol=Subscriber `;
    
    conexion.query(show, [{ image:image, phone:phone, location:location}, id ], (error, results) => {
        if(error) {
            console.error(error)
        } else {
            res.redirect('/');
        }
    })
}

exports.editProfile = (req, res) => {
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
}


exports.Profiles = (req, res) => {
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
}

