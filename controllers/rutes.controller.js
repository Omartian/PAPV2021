'use strict';
/* eslint-disable no-restricted-globals */
/**
 * Módulo del controlador de rutas.
 * Este archivo contiene todas las funciones para los endpoints marcados en rutas.
 * @author Erick Cardona Soto Maynez <cardona.erick@hotmail.com>
 */
const express = require('express');
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DB
});

connection.connect();

class rutesController {

    async nearestRoute (req, res){
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const body = req.body;
        let start = body.start;
        let finish = body.finish;
        let stringQuery = "SELECT * FROM `rssy_arboles_ruta` "
        connection.query(
            stringQuery,
            function (err, results, fields) {
                res.status(200)
                res.send(results)
                // res.send("Ruta basica para rutas")
            }
        );
    }
}


const rutesControllerClass = new rutesController();
module.exports = rutesControllerClass;