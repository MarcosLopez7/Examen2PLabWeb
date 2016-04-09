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
    res.render('informacion', {
        title: 'Inteligent Videogame Reviews',
        veces: req.session.views['/'].toString(),
        session: req.session.email
    });
});

module.exports = router;
