//invoke the DB connection
const conexion = require('../database/db')




/**
 * @param {*} procedure to create and save agend
 */
/*
exports.saveAgend = (req, res) => {
    const id = req.body.id
    const image = req.body.image
    const name = req.body.name
    const rol = req.body.rol
    const phone = req.body.phone
    const email = req.body.email
    const location = req.body.location

    let insert= `INSERT INTO agends SET ?; `;

    conexion.query(insert, {id:id, image:image, name:name, rol:rol,phone:phone, location:location, email:email}, (error, results) => {
        if(error) {
            console.error(error)
        } else {
            res.redirect('/');
        }
    });
};
*/

/**
 * @param procedure to update agend
 */
exports.updateAgend = (req, res) => {
    const id = req.body.ids
    const image = req.body.image
    const name = req.body.name
    const rol = req.body.rol
    const phone = req.body.phone
    const email = req.body.email
    const location = req.body.location
    conexion.query('UPDATE agends SET ? WHERE id = ?', [{ image:image, name:name, rol:rol, phone:phone, location:location, email:email}, id ], (error, results) => {
        if(error) {
            console.error(error)
        } else {
            res.redirect('/');
        }
    })
}

/**
 * @param procedure to deleted agend
 */
exports.deletedAgend = (req, res) => {
    const id = req.body.ids
    conexion.query('DELETE FROM agends WHERE id= ?', [id],(error, results) => {
        if(error) {
            console.error(error)
        } else {
            res.redirect('/');
        }
    })
}


    