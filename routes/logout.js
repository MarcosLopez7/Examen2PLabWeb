/**
 * Created by marcoslopez7 on 8/04/16.
 */
/**
 * Created by marcoslopez7 on 8/04/16.
 */
var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
    req.session.destroy(function(err) {
        if(err) {
            console.log(err);
        } else {
            res.send('<h1>Sesión terminada</h1><br><a href="/">Regresar a home</a>');
        }
    });
});

module.exports = router;
