'use strict';
/* eslint-disable no-restricted-globals */
/**
 * Módulo del controlador de arboles.
 * Este archivo contiene todos los endpoints del controlador de arboles.
 * @author Omar Perez Cano <is718089@iteso.mx>
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

class userController {

    /**
     * Funcion que checa el login del usuario, dependiendo de los datos internos del Body.
     * @param {*} req Recibe en el cuerpo un body.
     * @param {*} res Responde si encuentra la informacion del usuario, sino mensajes de error.
     */
    async usuarioLogin(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const searchedUsuarioBody = req.body;
        const email = searchedUsuarioBody.email;
        const pass = searchedUsuarioBody.password;
        connection.query(
            "SELECT * FROM `arboles_usuarios` WHERE `Email` = " + "\'" + email + "\'",
            // "SELECT id_UserClient,Nombre , Usuario , id_Empresa , Empresa , email , rol  FROM `usuarios_cliente` WHERE `email` = " + "\'" + email + "\'" ,
            function (err, results, fields) {
                if (results.length > 0) {
                    if (results[0].Password == pass) {
                        res.status(200)
                        res.json({
                            id_UserClient: results[0].id_UserClient,
                            Nombre: results[0].Nombre,
                            id_Empresa: results[0].id_Empresa,
                            Empresa: results[0].Empresa,
                            email: results[0].email,
                            rol: results[0].rol
                        });
                    } else {
                        res.status(200)
                        res.json({
                            mensaje: "Usuario y/o contraseña incorrecta"
                        })
                    }
                } else {
                    res.status(200);
                    res.json({
                        mensaje: "Usuario y/o contraseña incorrecta"
                    })
                }
            }
        );
    }

    /**
     * Añadir un nuevo usuario a la base de datos
     * @async
     * @exports addUser
     * @param {JSON} req - Debe recibir en el Body un JSON de la forma {"name" : "Nombre del usuario a insertar",
     *                                                                  "last_name : Apellidos del usuario a insertar",
     *                                                                  "rol : ID del rol a insertar",
     *                                                                  "email : Correo del usuario a insertar",
     *                                                                  "password : Contraseña del usuario a insertar"}.
     * @param {string} res - Si se agrego, regresa un JSON con mensaje de correcto, si hubo un error se regresa un error en la petición.
     */
     async addUser(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const body = req.body;
        let name = body.name;
        let last_name = body.last_name;
        let rol = body.rol;
        let email = body.email;
        let password = body.password;

        let stringQuery = "INSERT INTO `arboles_usuarios` (`id_taxonomia`, `Name`, `LastName`, `Password`, `Rol`, `Email`) VALUES (NULL, '" + name + "', '" + last_name + "', '" + rol + "', '" + email + "', '" + password + "'); "
        connection.query(
            stringQuery,
            function (err, results, fields) {
                if (err) {
                    res.status(501)
                    res.json({
                        msg: "Hubo un error en su petición, favor de verificar los campos ingresados"
                    })
                }
                if (results.affectedRows == 1) {
                    res.status(200)
                    res.json({
                        msg: "Se agrego el usuario correctamente"
                    })
                }
            }
        );
    }

    /**
     * Editar algun usuario
     * @async
     * @exports patchSingleUserByID
     * @param {JSON} req - Recibe en el URL el ID a editar, con un body sea de la forma {"name" : "Nombre del usuario a editar",
     *                                                                                   "last_name : Apellidos del usuario a editar",
     *                                                                                   "rol : ID del rol a editar",
     *                                                                                   "email : Correo del usuario a editar",
     *                                                                                   "password : Contraseña del usuario a editar"}.
     * @param {string} res - Si recibe un ID invalido envia un error en msg, envia un error si no puede agregar el texto a la base de datos.
     */
     async patchSingleUserByID(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const id = req.params.id;
        const body = req.body;
        let name = body.name;
        let last_name = body.last_name;
        let rol = body.rol;
        let email = body.email;
        let password = body.password;
        if (folioID !== undefined) {
            let stringQuery = "UPDATE `arboles_usuarios` SET `Name` = ' " + name + " ', `LastName` = ' " + last_name + " ', `Password` = ' " + password + " ', `Rol` = ' " + rol + " ', `Email` = ' " + email + " ' WHERE `arboles_usuarios`.`idUser` = " + "\'" + id + "\'"
            connection.query(
                stringQuery,
                function (err, results, fields) {
                    if (err) {
                        res.status(501)
                        res.json({
                            msg: "Hubo un error en su petición, favor de verificar el nombre que agrego."
                        })
                    }
                    if (results.affectedRows == 1) {
                        res.status(200)
                        res.json({
                            msg: "Se agrego edito el nombre correctamente en la lista actual."
                        })
                    }
                }
            );
        } else {
            res.status(201).json({
                msg: "No se envio un id valido a nuestra Base de datos."
            })
        }

    }

    /**
     * Lista de todos los usuarios para que los administradores puedan tener control de ellos.
     * @param {*} req No recibe nada.
     * @param {*} res Responde con idUser, Name, LastName, Rol, Email.
     */
    async getAllUsers(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        connection.query(
            "SELECT `idUser`, `Name` ,`LastName`,`Rol`,`Email`  FROM `arboles_usuarios` ",
            function (err, results, fields) {
                res.status(200)
                res.json(results)
            }
        );
    }

    /**
     * Obtener los datos de un usuario en particular.
     * @param {*} req Necesita el id del usuario para obtenerlo.
     * @param {*} res Responde con idUser, Name, LastName, Rol, Email.
     */
     async singleUserByID(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const idUser = req.params.id;
        connection.query(
            "SELECT `idUser`, `Name` ,`LastName`,`Rol`,`Email`  FROM `arboles_usuarios` WHERE `idUser` = " + "\'" + idUser + "\'",
            function (err, results, fields) {
                res.status(200)
                res.json(results)
            }
        );

    }


    /**
     * Eliminar un usuario
     * @async
     * @exports deleteSingleUserByID
     * @param {JSON} req - Recibe en el URL el ID a borrar
     * @param {string} res - Si recibe un ID invalido envia un error en msg, envia un error si no puede agregar el texto a la base de datos.
     */
    async deleteSingleUserByID(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const id = req.params.id;
        connection.query(
            "DELETE FROM `arboles_usuarios` WHERE `arboles_usuarios`.`idUser` = " + "\'" + id + "\'",
            function (err, results, fields) {
                res.status(200)
                res.json(results)
            }
        );

    }

}

const userControllerClass = new userController();
module.exports = userControllerClass;