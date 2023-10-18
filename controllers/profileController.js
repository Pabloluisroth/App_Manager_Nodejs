
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

    