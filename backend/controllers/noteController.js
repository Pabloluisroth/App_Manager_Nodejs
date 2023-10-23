//invoke the DB connection
const conexion = require('../database/db')

/**
 * @param procedure to create and save notes
 */
exports.createNote = (req, res) => {
    const descripcion = req.body.descripcion
    const date = req.body.date
    conexion.query('INSERT INTO notes SET ?', {descripcion:descripcion, date:date},  (error, results) => {
        if (row.rol=="Admin") {        
            res.render('createNote', { titleWeb: "Create note"})
        } else {
            res.render('index', { userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
        }
    });
};

exports.saveNote = (req, res) => {
    exports.saveNote = (req, res) => {
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
    
};


/**
 * @param procedure to update note
 */
exports.updateNote = (req, res) => {
    const id = req.body.id
    const descripcion = req.body.descripcion
    const date = req.body.date
    conexion.query('UPDATE notes SET ? WHERE id = ?', [{ descripcion:descripcion, date:date}, id ], (error, results) => {
        if(error) {
            console.error(error)
        } else {
            res.redirect('/');
        }
    })
}

/**
 * @param procedure to deleted note
 */
exports.deletedNote = (req, res) => {
    const id = req.body.id
    conexion.query('DELETE FROM notes WHERE id= ?', [id], (error, results) => {
        if(error) {
            console.error(error)
        } else {
            res.redirect('/');
        }
    })
}

exports.editNote = (req, res) => {
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
}

exports.notes = (req, res) => {
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
}

exports.saveNote = (req, res) => {
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





