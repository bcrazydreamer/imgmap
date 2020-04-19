"use strict";
const {isFunction} = require('bvalid');
const axios = require('axios');

exports.getImageFromUrl = async (url,cb)=>{
    try{
        var response = await axios.get(url, {responseType: 'arraybuffer'});
        const buffer = Buffer.from(response.data, 'base64');
        if(isFunction(cb)) return cb(null,buffer);
        return buffer;
    }catch(err){
        if(isFunction(cb)) return cb(err);
        return err;
    }
}