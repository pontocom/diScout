var express = require('express');

exports.setEvent = function(req, res) {
    console.log(req.body);

    res.send({status: "OK"});
};
