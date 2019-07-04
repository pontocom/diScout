var express = require('express');

exports.getStatistics = function(req, res) {
    console.log(req.body);

    res.send({status: "OK"});
};
