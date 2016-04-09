var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');

var auth = {
  auth: {
    api_key: 'key-bc3fc74a0194b1c7737292934e562968',
    domain: 'sandbox54f7765db7f94c3183147c6799191b52.mailgun.org'
  }
}

var nodemailerMailgun = nodemailer.createTransport(mg(auth));


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2664300191",
  database: "Labwebapps"
});

/* GET home page. */
router.get('/', function(req, res, next) {


  res.render('index', {
    title: 'Inteligent Videogame Reviews',
    veces: req.session.views['/'].toString(),
    session: req.session.email,
    guardado: false
  });
  /*console.log(req.cookies);
  console.log('================');
  console.log(req.session);*/
});

router.post('/login', function(req, res, next){

  var usu = {
    email: req.body.username,
    pass: req.body.pass
  };

  var usuario = null;

  con.query('SELECT * FROM Usuario WHERE email = ? AND pass = ?', [usu.email, usu.pass],function(err,rows){
    if(err) throw err;

    usuario = rows[0];

    if (usuario != null) {
      if (req.body.rem) {
        req.session.save();
      }
      req.session.email = usuario.email;
      res.redirect('/');
    } else {
      res.render('login', {
        title: 'Inteligent Videogame Reviews' ,
        veces: req.session.views['/login'].toString(),
        session: req.session.email,
        errores: true
      });
    };

  });

});

router.post('/registro', function(req, res, next){

  var dataUser = {
    id: 0,
    nombre: req.body.nombre,
    ap1: req.body.ap1,
    ap2: req.body.ap2,
    fechaNac: req.body.fecha,
    genero: req.body.gen,
    noCel: req.body.cel,
    noTel: req.body.tel,
    ext: req.body.ext,
    email: req.body.email,
    pass: req.body.pass
  };

  req.checkBody('nombre', 'El nombre es requerido').notEmpty();
  req.checkBody('ap1', 'El Apellido paterno es requerido').notEmpty();
  req.checkBody('cel', 'Numero celular es requerido').notEmpty();
  req.checkBody('tel', 'Numero fijo es requerido').notEmpty();
  req.checkBody('email', 'Inserte un formato valido de email').notEmpty();
  req.checkBody('pass', 'El password es requerido').notEmpty();

  var errors = req.validationErrors();

  if(errors) {
    console.log(errors);
    res.render('registro', {
      title: 'Inteligent Videogame Reviews' ,
      veces: req.session.views['/registro'].toString(),
      session: req.session.email,
      errores: errors
    });
  } else {

    con.query('INSERT INTO Usuario SET ?', dataUser, function (err, res) {
      if (err) throw err;

      console.log("insertado id: " + res.insertId);
    });

    nodemailerMailgun.sendMail({
      from: 'A01020023@itesm.mx',
      to: req.body.email, // An array if you have multiple recipients.
      subject: 'Bienvenido al sistema de Inteligent Videogame Reviews',
      text: 'Gracias ' + dataUser.nombre + ' por apoyar nuestro proyecto',
    }, function (err, info) {
      if (err) {
        console.log('Error: ' + err);
      }
      else {
        console.log('Response: ' + info);
      }
    });

    res.render('index', {
      title: 'Inteligent Videogame Reviews',
      veces: req.session.views['/'].toString(),
      session: req.session.email,
      guardado: true
    });
  }
});

module.exports = router;
