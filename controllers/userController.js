//invoke the DB connection
const conexion = require('../database/db')

/**
 * @param procedure to create or save user 
 */
exports.saveUser = (req, res) => {
    const email = req.body.email
    const name = req.body.name
    const rol = req.body.rol
    const since = req.body.since
    let insert= `INSERT INTO users SET ?; `;
    conexion.query(insert, {email:email, name:name, rol:rol, since:since}, (error, results) => {
        if(error) {
            console.error(error)
            
        } else {
            res.redirect('/'); // pasar el error
        }
    });
    
};

/**
 * @param procedure to update user set
 */
exports.updateUser = (req, res) => {
    const id = req.body.id
    const name = req.body.name
    const email = req.body.email
    const rol = req.body.rol
    const since = req.body.since
    let update = `UPDATE users SET ? WHERE id = ? `;
    conexion.query(update, [{ name:name, email:email, rol:rol, since:since}, id ], (error, results) => {
        if(error) {
            console.error(error)
        } else {
            res.redirect('/');
        }
    })
}

/**
 * @param procedure to ban for users
 */
exports.bansUser = (req, res) => {
    const id = req.body.id
    let bans= `UPDATE users SET bans = true WHERE id= ? `;
    conexion.query(bans, [ id ], (error, results) => {
        if(error) {
            console.error(error)
        } else {
            res.redirect('/users');
        }
    })
}

/**
 * @param procedure to revert bans for users
 */
exports.revertBansUser = (req, res) => {
    const id = req.body.id
    let revertBans = `UPDATE users SET bans = false WHERE id= ? `;
    conexion.query(revertBans, [ id ], (error, results) => {
        if(error) {
            console.error(error)
        } else {
            res.redirect('/users');
        }
    })
}


