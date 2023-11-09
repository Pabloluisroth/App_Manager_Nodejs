const mysql = require('mysql')

const conexion = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE,
    multipleStatements: true,
})

conexion.connect ((err) => {
    if(err) {
        console.error('The connection error is:' + err)
        return
    }

    let createTables = `create table if not exists users(
        id int(11) primary key auto_increment,
        name varchar(50) not null,
        email varchar(100) not null unique key,
        rol varchar(100) default 'Subscriber',
        pass varchar(255) not null,
        image varchar(100) default 'random.png');

        create table if not exists tasks(
        id int(11) primary key auto_increment,
        titulo varchar(50) not null,
        descripcion varchar(100) not null unique key,
        vencimiento TIMESTAMP DEFAULT CURRENT_TIMESTAMP); 

         

        create table if not exists notes(
        id int(11) primary key auto_increment,
        descripcion varchar(100) not null unique key,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP); `; 

        conexion.query(createTables,[1, 2, 3, 4, 5], function(err, results, fields) {
        if (err) {
            console.log(err.message);
        }else{
            console.log('Connected to the database MySQL!')
            }
        });
})

module.exports = conexion

/*
        create table if not exists profiles(
        id int(11) primary key auto_increment,
        image varchar(100) default 'random.png'),
        name varchar(50) not null,
        rol varchar(100) default 'Subscriber',
        phone varchar(50) not null,
        email varchar(100) not null unique key,
        location varchar (100) default 'Sevilla');
                
        create table if not exists agends(
        id int(11) primary key auto_increment,
        image varchar(100) default 'random.png'),
        name varchar(50) not null,
        lastname varchar(100)not null,
        rol varchar(100) default 'Subscriber',
        phone varchar(50) not null,
        email varchar(100) not null unique key,
        location varchar(100) default 'Sevilla',
        province varchar(50) not null,
        address varchar(50) not null,
        since TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
*/




