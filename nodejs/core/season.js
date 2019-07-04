var express = require('express');

exports.getSeason = function(req, res) {
    console.log(req.body);

    res.send({status: "OK"});
};
