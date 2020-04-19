"use strict";
const Jimp = require('jimp');
const bv = require('bvalid');

exports.quality = async (ob,cb)=>{
    ob = bv.isObject(ob) ? ob : {};
    var img = ob.img;
    var _q = !isNaN(ob.qual) && (ob.qual > 0 && ob.qual <= 100) ? Number(ob.qual) : 100;
    var nxt = bv.isBoolean(ob.next) ? ob.next : false;
    try{
        var JimpIns = ob.prev;
        if(!ob.prev){
            JimpIns = await Jimp.read(img);
        }
        var _img = JimpIns.quality(_q);
        if(nxt){
            if(bv.isFunction(cb)) return cb(null,_img);
            return _img;
        }
        var _bfr = _img.getBufferAsync(JimpIns._originalMime);
        if(bv.isFunction(cb)){
            _img.getBuffer(JimpIns._originalMime,(e,r)=>{
                return cb(e,r)
            });
        } else {
            return _bfr;
        }
    }catch(err){
        if(bv.isFunction(cb)) return cb(err);
        return err;
    }
}