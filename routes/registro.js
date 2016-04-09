/**
 * Created by marcoslopez7 on 8/04/16.
 */
var express = require('express');
var router = express.Router();

/* GET registro page. */
router.get('/', function(req, res, next) {
    res.render('registro', {
        title: 'Inteligent Videogame Reviews' ,
        veces: req.session.views['/registro'].toString(),
        session: req.session.email,
        errores: []
    });

    /*console.log(req.cookies);
    console.log('================');
    console.log(req.session);*/
});

module.exports = router;
