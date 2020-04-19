"use strict";
const Jimp = require('jimp');
const bv = require('bvalid');

exports.grayScale = async (ob,cb)=>{
    ob = bv.isObject(ob) ? ob : {};
    var img = ob.img;
    var nxt = bv.isBoolean(ob.next) ? ob.next : false;
    try{
        var JimpIns = ob.prev;
        if(!ob.prev){
            JimpIns = await Jimp.read(img);
        }
        var _img = JimpIns.greyscale();
        if(nxt){
            if(bv.isFunction(cb)) return cb(null,_img);
            return _img;
        }
        if(bv.isFunction(cb)){
            _img.getBuffer(JimpIns._originalMime,(e,r)=>{
                return cb(e,r)
            });
        } else {
            return _img.getBufferAsync(JimpIns._originalMime);
        }
    }catch(err){
        if(bv.isFunction(cb)) return cb(err);
        return err;
    }
}

exports.resize = async (ob,cb)=>{
    ob = bv.isObject(ob) ? ob : {};
    var img = ob.img;
    var h = ob.h;
    var w = ob.w;
    var nxt = bv.isBoolean(ob.next) ? ob.next : false;
    try{
        var JimpIns = ob.prev;
        if(!ob.prev){
            JimpIns = await Jimp.read(img);
        }
        var imsize = JimpIns._exif.imageSize;
        h = !isNaN(h) && h > 0 ? Number(h) : imsize.height;
        w = !isNaN(w) && w > 0 ? Number(w) : imsize.width;
        var _img = JimpIns.resize(w,h,Jimp.RESIZE_NEAREST_NEIGHBOR);
        if(nxt){
            if(bv.isFunction(cb)) return cb(null,_img);
            return _img;
        }
        if(bv.isFunction(cb)){
            _img.getBuffer(JimpIns._originalMime,(e,r)=>{
                return cb(e,r)
            });
        } else {
            return _img.getBufferAsync(JimpIns._originalMime);
        }
    }catch(err){
        if(bv.isFunction(cb)) return cb(err);
        return err;
    }
}

exports.blur = async (ob,cb)=>{
    ob = bv.isObject(ob) ? ob : {};
    var img = ob.img;
    var blr = !isNaN(ob.blur) ? Number(ob.blur) : 1;
    var nxt = bv.isBoolean(ob.next) ? ob.next : false;
    try{
        var JimpIns = ob.prev;
        if(!ob.prev){
            JimpIns = await Jimp.read(img);
        }
        var _img = JimpIns.blur(blr);
        if(nxt){
            if(bv.isFunction(cb)) return cb(null,_img);
            return _img;
        }
        if(bv.isFunction(cb)){
            _img.getBuffer(JimpIns._originalMime,(e,r)=>{
                return cb(e,r)
            });
        } else {
            return _img.getBufferAsync(JimpIns._originalMime);
        }
    }catch(err){
        if(bv.isFunction(cb)) return cb(err);
        return err;
    }
}

exports.opacity = async (ob,cb)=>{
    ob = bv.isObject(ob) ? ob : {};
    var img = ob.img;
    var ops = !isNaN(ob.opacity) && (ob.opacity >= 0 && ob.opacity <= 1) ? Number(ob.opacity) : 1;
    var nxt = bv.isBoolean(ob.next) ? ob.next : false;
    try{
        var JimpIns = ob.prev;
        if(!ob.prev){
            JimpIns = await Jimp.read(img);
        }
        var _img = JimpIns.opacity(ops);
        if(nxt){
            if(bv.isFunction(cb)) return cb(null,_img);
            return _img;
        }
        if(bv.isFunction(cb)){
            _img.getBuffer(JimpIns._originalMime,(e,r)=>{
                return cb(e,r)
            });
        } else {
            return _img.getBufferAsync(JimpIns._originalMime);
        }
    }catch(err){
        if(bv.isFunction(cb)) return cb(err);
        return err;
    }
}

exports.getImgFromInstance = async (ob,cb)=>{
    ob = bv.isObject(ob) ? ob : {};
    try{
        if(bv.isFunction(cb)){
            ob.getBuffer(ob._originalMime,(e,r)=>{
                return cb(e,r)
            });
        } else {
            return ob.getBufferAsync(ob._originalMime);
        }
    }catch(err){
        if(bv.isFunction(cb)) return cb(err);
        return err;
    }
}