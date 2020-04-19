const express = require('express');
const router = express.Router();
const util = require('../utils');
const bv = require('bvalid');

const {
  compress,
  fx
} = require('../controller/index');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * Get image optimal way
 */
router.get('/img',async function(req,res,next){
  var qu = req.query;
  var url = qu.u;
  var img = await util.getUrlImage(url);
  try{
    var yo = await compress.quality({
      img : img,
      qual : !isNaN(qu.qual) ? qu.qual : 100,
      next : true
    });
    if(yo && (qu.bw === true || qu.bw === "true")){
      yo = await fx.grayScale({
        prev : yo,
        next : true
      })
    }
    if(yo && (!isNaN(qu.h) || !isNaN(qu.w))){
      yo = await fx.resize({
        prev : yo,
        h : qu.h,
        w : qu.w,
        next : true
      });
    }
    if(yo && (!isNaN(qu.blur) && (qu.blur > 0))){
      yo = await fx.blur({
        prev : yo,
        blur : qu.blur,
        next : true
      });
    }
    if(yo && (!isNaN(qu.opacity))){
      yo = await fx.opacity({
        prev : yo,
        opacity : qu.opacity
      });
    }
    var STATUS_CODE = 404;
    if(bv.isBuffer(yo) === false){
      try{
        yo = await fx.getImgFromInstance(yo);
        STATUS_CODE = 200;
      } catch(err) {yo = "Not found";}
    } else {
      STATUS_CODE = 200;
    }
    res.writeHead(STATUS_CODE);
    return res.end(yo);
  } catch(err) {
    return res.send(err);
  }
});

module.exports = router;