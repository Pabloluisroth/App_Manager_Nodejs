const mysql = require('mysql')

const conexion = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE,
    multipleStatements: true,
})

conexion.connect ((error) => {
    if(error) {
        console.error('The connection error is:' + error)
        return
    }

    let consultas = `create table if not exists users(
        id int primary key auto_increment,
        name varchar(50) not null,
        email varchar(100) not null unique key,
        rol varchar (100) default 'Subscriber',
        pass varchar (255) not null,
        image varchar(100) default 'random.png');

        create table if not exists tasks(
        id int primary key auto_increment,
        titulo varchar(50) not null,
        descripcion varchar(100) not null unique key,
        vencimiento TIMESTAMP DEFAULT CURRENT_TIMESTAMP); 

        create table if not exists notes(
        id int primary key auto_increment,
        descripcion varchar(100) not null unique key,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP); `; 

        // profiles

        // agends
    
        conexion.query(consultas,[1, 2, 3], function(err, results, fields) {
        if (err) {
            console.log(err.message);
        }else{
            console.log('Connected to the database MySQL!')
            }
        });
})

module.exports = conexion