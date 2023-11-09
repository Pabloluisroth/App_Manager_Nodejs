//invoke the DB connection
const conexion = require('../database/db')

/**
 * @param procedure to create or save user 
 */
exports.saveUser = async (req, res) => {   
    try {
        const name = req.body.name
        const email = req.body.email
        const rol = req.body.rol
        const since = req.body.since
        conexion.query(`INSERT INTO users SET ?`, { name:name, email:email, rol:rol, since:since}, (err, results) => {
            if(err) {  
                res.render('error', { errorMessage: err.message})
            } else {   
                res.redirect('/users');
            }
        }) 
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error)
        res.render('error', { errorMessage: 'Error en la consulta a la base de datos:' });
    }
}

/**
 * @param procedure to update user set
 */
exports.updateUser = async (req, res) => {   
    try {
        const id = req.body.id
        const name = req.body.name
        const email = req.body.email
        const rol = req.body.rol
        const since = req.body.since
        conexion.query(`UPDATE users SET ? WHERE id = ? `, [{  name:name, email:email, rol:rol, since:since}, id ], (err, results) => {
        if(err) {  
            res.render('error', { errorMessage: err.message})
            } else {   
                res.render('users',{user: results[0], titleWeb: "User"})
            }
        }) 
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error)
        res.render('error', { errorMessage: 'Error en la consulta a la base de datos:' });
    }
}

exports.editUser = async (req, res) => {   
    try {
        const id = req.body.id
        conexion.query('SELECT * FROM users WHERE id= ?', [ id ], (err, results) => {
            if(err) {  
                res.render('error', { errorMessage: err.message})
            } else {   
                res.render('users', {users: results[0], titleWeb: "Edit User"})
            }
        }) 
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error)
        res.render('error', { errorMessage: 'Error en la consulta a la base de datos:' });
    }
}

/**
 * @param procedure to ban for users
 */
exports.bansUser = async (req, res) => {   
    try {
        const id = req.body.id
        conexion.query('UPDATE users SET bans = true WHERE id= ? ', [ id ], (err, results) => {
            if(err) {  
                res.render('error', { errorMessage: err.message})
            } else {   
                res.render('users', { user: results[0], titleWeb: "users",})
            }
        }) 
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error)
        res.render('error', { errorMessage: 'Error en la consulta a la base de datos:' });
    }
}

/**
 * @param procedure to revert bans for users
 */
exports.revertBansUser = async (req, res) => {   
    try {
        const id = req.body.id
        conexion.query('UPDATE users SET bans = false WHERE id= ? ', [ id ], (err, results) => {
            if(err) {  
                res.render('error', { errorMessage: err.message})
            } else {   
                res.render('usersBanned', { user: results[0], titleWeb: "Users baned",})
            }
        }) 
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error)
        res.render('error', { errorMessage: 'Error en la consulta a la base de datos:' });
    }
}

exports.deleteUser = async (req, res) => {   
    try {
        const id = req.body.id
        conexion.query(`DELETE FROM users WHERE id= ?`, [ id ], (err, results) => {
            if(err) {  
                res.render('error', { errorMessage: err.message})
            } else {   
                res.render('users', { users: results, titleWeb: "Users"})
            }
        }) 
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error)
        res.render('error', { errorMessage: 'Error en la consulta a la base de datos:' });
    }
}

exports.users = async (req, res) => {   
    try {
        conexion.query('SELECT * FROM users', (err, results) => {
            if(err) {  
                res.render('error', { errorMessage: err.message})
            } else {   
                res.render('users', { results: results, titleWeb: "Users"})
            }
        }) 
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error)
        res.render('error', { errorMessage: 'Error en la consulta a la base de datos:' });
    }
}

exports.usersBanned = async (req, res) => {   
    try {
        conexion.query('SELECT * FROM users WHERE bans = 1', (err, results) => {
            if(err) {  
                res.render('error', { errorMessage: err.message})
            } else {   
                res.render('usersBanned', {results: results, titleWeb: "Users Banned"})
            }
        }) 
    } catch (error) {
        console.error('Error en la consulta a la base de datos:', error)
        res.render('error', { errorMessage: 'Error en la consulta a la base de datos:' });
    }
}








