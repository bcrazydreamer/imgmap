var netutil = require('./network.util');

exports.toBase64Image = (mime, data) => {
    return `data:${mime};base64,${data.toString("base64")}`;
};

exports.getUrlImage = netutil.getImageFromUrl;