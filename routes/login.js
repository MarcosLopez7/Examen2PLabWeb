/**
 * Created by marcoslopez7 on 8/04/16.
 */
var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('login', {
        title: 'Inteligent Videogame Reviews' ,
        veces: req.session.views['/login'].toString(),
        session: req.session.email,
        errores: false
    });

    /*console.log(req.cookies);
    console.log('================');
    console.log(req.session);*/
});

module.exports = router;
