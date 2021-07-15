'use strict';
/* eslint-disable no-restricted-globals */
/**
 * Módulo del controlador de arboles, historico y bitacora.
 * Este archivo contiene todos los endpoints del controlador de arboles, historico y bitacora.
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

class arbolesController {
    /**
     * Obtener todos los registros de taxonomía de la base de datos de arboles para hacer una lista desplegable.
     * @async
     * @exports bitacoraArbolesGetAll
     * @param {*} req  - No recibe ningun parametro.
     * @param {JSON} res  - Es nuestra respuesta del servidor a mandar.
     */
    async bitacoraArbolesGetAll(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        let stringQuery = "SELECT * FROM `rssy_arboles_bitacora` "
        connection.query(
            stringQuery,
            function (err, results, fields) {
                if (err) {
                    res.status(501)
                    res.json({
                        msg: "Hubo un error en el sistema, intente nuevamente mas tarde."
                    })
                }
                res.status(200)
                res.json(results)
            }
        );
    }

    /**
     * Añadir un nuevo registro de bitacora de los arboles
     * @async
     * @exports bitacoraCreate
     * @param {JSON} req - Debe recibir en el Body un JSON de la forma {"NID" : "Número de placa del arbol","fechaReporte" : "Fecha del reporte","reportadoPor" : "Persona que hace el reporte","tipoReporte" : "Tipo del reporte","descripcion" : "Descripción del reporte",}.
     * @param {string} res - Si se agrego, regresa un JSON con mensaje de correcto, si hubo un error se regresa un error en la petición.
     */
    async bitacoraCreate(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const body = req.body;
        let NID = body.NID;
        let fechaReporte = body.fechaReporte;
        let reportadoPor = body.reportadoPor;
        let tipoReporte = body.tipoReporte;
        let descripcion = body.descripcion;
        let stringQuery = "INSERT INTO `rssy_arboles_bitacora` (`ID_RegBitacora`, `NID`, `fechaReporte`, `reportadoPor`, `tipoReporte`, `descripcion`) VALUES (NULL, '" + NID + "', '" + fechaReporte + "', '" + reportadoPor + "', '" + tipoReporte + "', '" + descripcion + "');"
        connection.query(
            stringQuery,
            function (err, results, fields) {
                if (err) {
                    res.status(501)
                    res.json({
                        msg: "Hubo un error en su petición."
                    })
                }
                if (results.affectedRows == 1) {
                    res.status(200)
                    res.json({
                        msg: "Se agregó correctamente el registro a la bitácora."
                    })
                }
            }
        );
    }
    
    /**
     * Obtener un registro de la bitacora de arboles.
     * @async
     * @exports bitacoraGetSingle
     * @param {*} req - ID que se desea obtener en los parámetros de la petición.
     * @param {JSON} res - Responde con la información correspondiente al identificador ingresado en los parámetros de la petición.
     */
    async bitacoraGetSingle(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const folioID = req.params.folio;
        let stringQuery = "SELECT * FROM `rssy_arboles_bitacora` WHERE `ID_RegBitacora` = " + folioID + ""
        connection.query(
            stringQuery,
            function (err, results, fields) {
                if (err) {
                    res.status(501)
                    res.json({
                        msg: "Hubo un error en su petición."
                    })
                }
                if (results != undefined) {
                    res.status(200)
                    res.json(results)
                }
            }
        );
    }
    
    /**
     * Editar algun registro de bitacora 
     * @async
     * @exports bitacoraEdit
     * @param {JSON} req - Recibe en el URL el ID a editar, con un body sea de la forma {"NID" : "Número de placa del arbol","fechaReporte" : "Fecha del reporte","reportadoPor" : "Persona que hace el reporte","tipoReporte" : "Tipo del reporte","descripcion" : "Descripción del reporte",}.
     * @param {string} res - Si recibe un ID invalido envia un error en msg, envia un error si no puede agregar el texto a la base de datos.
     */
    async bitacoraEdit(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const folioID = req.params.folio;
        const body = req.body;
        let NID = body.NID;
        let fechaReporte = body.fechaReporte;
        let reportadoPor = body.reportadoPor;
        let tipoReporte = body.tipoReporte;
        let descripcion = body.descripcion;
        if (folioID !== undefined) {
            let stringQuery = "UPDATE `rssy_arboles_bitacora` SET `NID` = + NID +, `fechaReporte` = + fechaReporte +, `reportadoPor` = + reportadoPor +, `tipoReporte` = + tipoReporte +, `descripcion` = + descripcion + WHERE `rssy_arboles_bitacora`.`ID_RegBitacora` =" + folioID
            connection.query(
                stringQuery,
                function (err, results, fields) {
                    if (err) {
                        res.status(501)
                        res.json({
                            msg: "Hubo un error en su petición."
                        })
                    }
                    if (results.affectedRows == 1) {
                        res.status(200)
                        res.json({
                            msg: "Se editó el registro correctamente."
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
     * Eliminar algun registro de la bitacora 
     * @async
     * @exports bitacoraDelete
     * @param {*} req - Recibe en el URL solo el Folio necesario.
     * @param {string} res - Si recibe un ID invalido 
     */
    async bitacoraDelete(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const folioID = req.params.folio;
        if (folioID !== undefined) {
            let stringQuery = "DELETE FROM `rssy_arboles_bitacora` WHERE `rssy_arboles_bitacora`.`ID_RegBitacora` = " + folioID + ""
            connection.query(
                stringQuery,
                function (err, results, fields) {
                    if (err) {
                        res.status(501)
                        res.json({
                            msg: "Hubo un error en su petición, favor de intentar mas tarde"
                        })
                    }
                    if (results.affectedRows == 1) {
                        res.status(200)
                        res.json({
                            msg: "Se eliminó correctamente el nombre de la lista actual"
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
     * Obtener todos los registros del historico de la base de datos de arboles para hacer una lista desplegable.
     * @async
     * @exports historicoArbolesGetAll
     * @param {*} req  - No recibe ningun parametro.
     * @param {JSON} res  - Es nuestra respuesta del servidor a mandar.
     */
    async historicoArbolesGetAll(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        let stringQuery = "SELECT * FROM `rssy_arboles_historico` "
        connection.query(
            stringQuery,
            function (err, results, fields) {
                if (err) {
                    res.status(501)
                    res.json({
                        msg: "Hubo un error en el sistema, intente nuevamente mas tarde."
                    })
                }
                res.status(200)
                res.json(results)
            }
        );
    }

    /**
     * Añadir un nuevo registro del historico de los arboles
     * @async
     * @exports historicoCreate
     * @param {JSON} req - Debe recibir en el Body un JSON de la forma {"NID" : "Número de placa del arbol","ID_Historico" : "Consecutivo del arbol que ha llevado el NID","fechaBaja" : "Fecha de la baja","reportadoPor" : "Responsable del reporte","motivoBaja" : "Motivo de la baja","id_taxonomia" : "Identificador de la especie del ejemplar","Plantado" : "Año en el que fue plantado el arbol","Diametro" : "Diametro del ejemplar en centímetros","Altura" : "Altura del ejemplar en metros","Valoracion" : "Salud apreciada del ejemplar en un puntaje del 0 al 100","Latitud" : "Latitud correspondiente a la ubicación del ejemplar","Longitud" : "Longitud correspondiente a la ubicación del ejemplar","id_jardin" : "Identificador correspondiente al jardín del campus donde fue plantado el ejemplar","imagen" : "Nombre de la imagen correspondiente a la especie en la base de datos"}.
     * @param {string} res - Si se agrego, regresa un JSON con mensaje de correcto, si hubo un error se regresa un error en la petición.
     */
    async historicoCreate(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const body = req.body;
        let NID = body.NID;
        let ID_Historico = body.ID_Historico;
        let fechaBaja = body.fechaBaja;
        let reportadoPor = body.reportadoPor;
        let motivoBaja = body.motivoBaja;
        let id_taxonomia = body.id_taxonomia;
        let Plantado = body.Plantado;
        let Diametro = body.Diametro;
        let Altura = body.Altura;
        let Valoracion = body.Valoracion;
        let Latitud = body.Latitud;
        let Longitud = body.Longitud;
        let id_jardin = body.id_jardin;
        let imagen = body.imagen;
        let stringQuery = "INSERT INTO `rssy_arboles_historico` (`ID_RegHistorico`, `NID`, `ID_Historico`, `fechaBaja`, `reportadoPor`, `motivoBaja`, `id_taxonomia`, `Plantado`, `Diametro`, `Altura`, `Valoracion`, `Latitud`, `Longitud`, `id_jardin`, `imagen`) VALUES (NULL, '" + NID + "', '" + ID_Historico + "', '" + fechaBaja + "', '" + reportadoPor + "', '" + motivoBaja + "', '" + id_taxonomia + "', '" + Plantado + "', '" + Diametro + "', '" + Altura + "', '" + Valoracion + "', '" + Latitud + "', '" + Longitud + "', '" + id_jardin + "', '" + imagen + "');"
        connection.query(
            stringQuery,
            function (err, results, fields) {
                if (err) {
                    res.status(501)
                    res.json({
                        msg: "Hubo un error en su petición, favor de verificar los campos de la petición"
                    })
                }
                if (results.affectedRows == 1) {
                    res.status(200)
                    res.json({
                        msg: "Se agregó correctamente el registro al histórico"
                    })
                }
            }
        );
    }
    
    /**
     * Obtener un registro del historico de arboles.
     * @async
     * @exports historicoGetSingle
     * @param {*} req - ID que se desea obtener en los parámetros de la petición.
     * @param {JSON} res - Responde con la información correspondiente al identificador ingresado en los parámetros de la petición.
     */
    async historicoGetSingle(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const folioID = req.params.folio;
        let stringQuery = "SELECT * FROM `rssy_arboles_historico` WHERE `ID_RegHistorico` = " + folioID + ""
        connection.query(
            stringQuery,
            function (err, results, fields) {
                if (err) {
                    res.status(501)
                    res.json({
                        msg: "Hubo un error en su petición"
                    })
                }
                if (results != undefined) {
                    res.status(200)
                    res.json(results)
                }
            }
        );
    }
    
    /**
     * Editar algun registro del historico
     * @async
     * @exports historicoEdit
     * @param {JSON} req - Recibe en el URL el ID a editar, con un body sea de la forma {"NID" : "Número de placa del arbol","ID_Historico" : "Consecutivo del arbol que ha llevado el NID","fechaBaja" : "Fecha de la baja","reportadoPor" : "Responsable del reporte","motivoBaja" : "Motivo de la baja","id_taxonomia" : "Identificador de la especie del ejemplar","Plantado" : "Año en el que fue plantado el arbol","Diametro" : "Diametro del ejemplar en centímetros","Altura" : "Altura del ejemplar en metros","Valoracion" : "Salud apreciada del ejemplar en un puntaje del 0 al 100","Latitud" : "Latitud correspondiente a la ubicación del ejemplar","Longitud" : "Longitud correspondiente a la ubicación del ejemplar","id_jardin" : "Identificador correspondiente al jardín del campus donde fue plantado el ejemplar","imagen" : "Nombre de la imagen correspondiente a la especie en la base de datos"}.
     * @param {string} res - Si recibe un ID invalido envia un error en msg, envia un error si no puede agregar el texto a la base de datos.
     */
    async historicoEdit(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const folioID = req.params.folio;
        const body = req.body;
        let NID = body.NID;
        let ID_Historico = body.ID_Historico;
        let fechaBaja = body.fechaBaja;
        let reportadoPor = body.reportadoPor;
        let motivoBaja = body.motivoBaja;
        let id_taxonomia = body.id_taxonomia;
        let Plantado = body.Plantado;
        let Diametro = body.Diametro;
        let Altura = body.Altura;
        let Valoracion = body.Valoracion;
        let Latitud = body.Latitud;
        let Longitud = body.Longitud;
        let id_jardin = body.id_jardin;
        let imagen = body.imagen;
        if (folioID !== undefined) {
            let stringQuery = "UPDATE `rssy_arboles_historico` SET `NID` = " + NID + ", `ID_Historico` = " + ID_Historico + ", `fechaBaja` = " + fechaBaja + ", `reportadoPor` = " + reportadoPor + ", `motivoBaja` = " + motivoBaja + ", `id_taxonomia` = " + id_taxonomia + ", `Plantado` = " + Plantado + ", `Diametro` = " + Diametro + ", `Altura` = " + Altura + ", `Valoracion` = " + Valoracion + ", `Latitud` = " + Latitud + ", `Longitud` = " + Longitud + ", `id_jardin` = " + id_jardin + ", `imagen` = " + imagen + " WHERE `rssy_arboles_historico`.`ID_RegHistorico` = " + folioID
            connection.query(
                stringQuery,
                function (err, results, fields) {
                    if (err) {
                        res.status(501)
                        res.json({
                            msg: "Hubo un error en su petición."
                        })
                    }
                    if (results.affectedRows == 1) {
                        res.status(200)
                        res.json({
                            msg: "Se editó el registro correctamente."
                        })
                    }
                }
            );
        } else {
            res.status(201).json({
                msg: "No se envió un id valido a nuestra base de datos."
            })
        }

    }

    /**
     * Eliminar algun registro del historico 
     * @async
     * @exports historicoDelete
     * @param {*} req - Recibe en el URL solo el ID a eliminar.
     * @param {string} res - Si recibe un ID invalido 
     */
    async historicoDelete(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const folioID = req.params.folio;
        if (folioID !== undefined) {
            let stringQuery = "DELETE FROM `rssy_arboles_historico` WHERE `rssy_arboles_historico`.`ID_RegHistorico` = " + folioID + ""
            connection.query(
                stringQuery,
                function (err, results, fields) {
                    if (err) {
                        res.status(501)
                        res.json({
                            msg: "Hubo un error en su petición, favor de intetar mas tarde"
                        })
                    }
                    if (results.affectedRows == 1) {
                        res.status(200)
                        res.json({
                            msg: "Se elimino correctamente el nombre de la lista actual"
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
     * Obtener todas las taxonimias de la base de datos de arboles para hacer una lista desplegable.
     * @async
     * @exports taxonomiaArbolesGetAll
     * @param {*} req  - No recibe ningun parametro.
     * @param {JSON} res  - Es nuestra respuesta del servidor a mandar.
     */
    async taxonomiaArbolesGetAll(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        let stringQuery = "SELECT * FROM `rssy_arboles_taxonomias` "
        connection.query(
            stringQuery,
            function (err, results, fields) {
                if (err) {
                    res.status(501)
                    res.json({
                        msg: "Hubo un error en el sistema, intente nuevamente mas tarde."
                    })
                }
                res.status(200)
                res.json(results)
            }
        );
    }

    /**
     * Añadir un nuevo registro de Taxonomia de los arboles
     * @async
     * @exports taxonomiaCreate
     * @param {JSON} req - Debe recibir en el Body un JSON de la forma {"taxonomia" : "Nombre de la taxonomia a insertar"}.
     * @param {string} res - Si se agrego, regresa un JSON con mensaje de correcto, si hubo un error se regresa un error en la petición.
     */

    async taxonomiaCreate(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const body = req.body;
        let taxononimiaName = body.taxonomia;
        let stringQuery = "INSERT INTO `rssy_arboles_taxonomias` (`id_taxonomia`, `nombre`) VALUES (NULL, '" + taxononimiaName + "'); "
        connection.query(
            stringQuery,
            function (err, results, fields) {
                if (err) {
                    res.status(501)
                    res.json({
                        msg: "Hubo un error en su petición, favor de verificar el nombre que agrego"
                    })
                }
                if (results.affectedRows == 1) {
                    res.status(200)
                    res.json({
                        msg: "Se agrego correctamente el nombre a la lista de taxonomias actuales"
                    })
                }
            }
        );
    }
    
    



    /**
     * Obtener un registro de la Taxonomia de arboles.
     * @async
     * @exports taxonomiaGetSingle
     * @param {*} req - No recibe nada en los parametros.
     * @param {JSON} res - Si se agrego, regresa un JSON con mensaje de correcto, si hubo un error se regresa un error en la petición.
     */

    async taxonomiaGetSingle(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const folioID = req.params.folio;
        let stringQuery = "SELECT * FROM `rssy_arboles_taxonomias` WHERE `id_taxonomia` = " + folioID + ""
        connection.query(
            stringQuery,
            function (err, results, fields) {
                if (err) {
                    res.status(501)
                    res.json({
                        msg: "Hubo un error en su petición, favor de checar el folio del arbol"
                    })
                }
                if (results != undefined) {
                    res.status(200)
                    res.json(results)
                }
            }
        );
    }


    /**
     * Editar algun registro de Taxonomia 
     * @async
     * @exports taxonomiaEdit
     * @param {JSON} req - Recibe en el URL el ID a editar, con un body sea de la forma {"taxonomia" : "Nombre de la nueva taxonomia"}
     * @param {string} res - Si recibe un ID invalido envia un error en msg, envia un error si no puede agregar el texto a la base de datos.
     */
    async taxonomiaEdit(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const folioID = req.params.folio;
        const body = req.body;
        let taxononimiaName = body.taxonomia;
        if (folioID !== undefined) {
            let stringQuery = "UPDATE `rssy_arboles_taxonomias` SET `nombre` = ' " + taxononimiaName + " ' WHERE `rssy_arboles_taxonomias`.`id_taxonomia` = " + folioID + ""
            connection.query(
                stringQuery,
                function (err, results, fields) {
                    if (err) {
                        res.status(501)
                        res.json({
                            msg: "Hubo un error en su petición."
                        })
                    }
                    if (results.affectedRows == 1) {
                        res.status(200)
                        res.json({
                            msg: "Se editó el registro correctamente."
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
     * Eliminar algun registro de Taxonomia 
     * @async
     * @exports taxonomiaDelete
     * @param {*} req - Recibe en el URL solo el Folio necesario.
     * @param {string} res - Si recibe un ID invalido 
     */
    async taxonomiaDelete(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const folioID = req.params.folio;
        if (folioID !== undefined) {
            let stringQuery = "DELETE FROM `rssy_arboles_taxonomias` WHERE `rssy_arboles_taxonomias`.`id_taxonomia` = " + folioID + ""
            connection.query(
                stringQuery,
                function (err, results, fields) {
                    if (err) {
                        res.status(501)
                        res.json({
                            msg: "Hubo un error en su petición, favor de intetar mas tarde"
                        })
                    }
                    if (results.affectedRows == 1) {
                        res.status(200)
                        res.json({
                            msg: "Se elimino correctamente el nombre de la lista actual"
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
     * Obtener un registro de la Taxonomia de arboles.
     * @async
     * @exports taxonomiaAndArboles
     * @param {*} req - No recibe nada en los parametros.
     * @param {JSON} res - Si se agrego, regresa un JSON con mensaje de correcto, si hubo un error se regresa un error en la petición.
     */

    async taxonomiaAndArboles(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        let stringQuery = "SELECT NID, `rssy_arboles_inventario`.`id_taxonomia` , `nombre`, `id_jardin` FROM `rssy_arboles_inventario`, `rssy_arboles_taxonomias` WHERE `rssy_arboles_inventario`.`id_taxonomia` = `rssy_arboles_taxonomias`.`id_taxonomia`"
        // let stringQuery = "SELECT * FROM `rssy_arboles_inventario` "
        connection.query(
            stringQuery,
            function (err, results, fields) {
                if (err) {
                    res.status(501)
                    res.json({
                        msg: "Hubo un error en su petición, intente en unos momentos mas"
                    })
                }
                if (results != undefined) {
                        res.status(200)
                        res.send(results);                    
                }


            }
        );
    }




    /**
     * Es para obtener la relacion de los arboles con sus imagenes.
     * @async
     * @exports imagenesArbolesGetAll
     * @param {*} req No recibe nada es un endpoint.
     * @param {JSON} res Responde con toda la base de datos.
     */

    async imagenesArbolesGetAll(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        let stringQuery = "SELECT * FROM `rssy_arboles_imagenes` "
        connection.query(
            stringQuery,
            function (err, results, fields) {
                res.status(200)
                res.json(results)
            }
        );
    }

    /**
     * 
     * Es para añadir una imagen a la Base de datos
     * @async
     * @exports imagenArbolCreate
     * @param {JSON} req Recibe un nombre de imagen e NID en un JSON que hace relacion con el inventario de arboles.{"nombreImagen:"Nombre de la imagen, "NID": #### }
     * @param {string} res  Si se agrego, regresa un JSON con mensaje de correcto, si hubo un error se regresa un error en la petición.
     */

    async imagenArbolCreate(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const body = req.body;
        const imagenArbol = body.nombreImagen;
        const NID = body.NID;
        let stringQuery = "INSERT INTO `rssy_arboles_imagenes` (`id_imagen`, `imagen`, `NID`) VALUES (NULL, '" + imagenArbol + "', '" + NID + "'); "
        connection.query(
            stringQuery,
            function (err, results, fields) {
                if (err) {
                    res.status(501)
                    res.json({
                        msg: "Hubo un error en su petición, favor de verificar el nombre que agrego"
                    })
                }
                if (results.affectedRows == 1) {
                    res.status(200)
                    res.json({
                        msg: "Se agrego correctamente a la base de datos."
                    })
                }
            }
        );
    }

    /**
     * Obtiene un arbol en especifico de la base de datos a través de su folio.
     * @async
     * @exports imagenArbolGetSingle
     * @param {*} req - No recibe nada en el request ya que busca desde el URL.
     * @param {JSON} res - Responde con el ID, nombre de la imagen y su NID(Hace referencia al inventario de arboles).
     */

    async imagenArbolGetSingle(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const folioID = req.params.folio;
        let stringQuery = "SELECT * FROM `rssy_arboles_imagenes` WHERE `id_imagen` = " + folioID + ""
        connection.query(
            stringQuery,
            function (err, results, fields) {
                if (err) {
                    res.status(501)
                    res.json({
                        msg: "Hubo un error en su petición, favor de checar el folio del arbol"
                    })
                }
                if (results != undefined) {
                    res.status(200)
                    res.json(results)
                }
            }
        );
    }

    /**
     * Editar algun registro de Taxonomia 
     * @async
     * @exports imagenArbolEdit
     * @param {JSON} req - Recibe en el URL el ID a editar, con un body con lo que se desea editar en un JSON, los campos son imagen o NID.
     * @param {string} res - Si recibe un ID invalido envia un error en msg, envia un error si no puede agregar el texto a la base de datos y si todo sale correcto manda un mensaje de correcto.
     */
    async imagenArbolEdit(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const folioID = req.params.folio;
        const body = req.body;
        let taxononimiaName = body.taxonomia;

        if (req.params.folio !== undefined) {
            const folioID = req.params.folio;
            if (req.body !== undefined) {
                const bodyActualizaciones = req.body;
                let toUpdate = "";
                let objEntries = Object.keys(bodyActualizaciones);
                let values = Object.keys(bodyActualizaciones).map(e => bodyActualizaciones[e])
                for (let i = 0; i < objEntries.length; i++) {
                    if (i >= 1) {
                        toUpdate = toUpdate + " , ";
                    }
                    if (typeof (values[i]) == 'string') {
                        toUpdate = ` ${toUpdate} \`${Object.keys(bodyActualizaciones)[i]}\` =  "${ values[i]}" `;
                    }
                    if (typeof (values[i]) == 'number') {
                        toUpdate = ` ${toUpdate} \`${Object.keys(bodyActualizaciones)[i]}\` =  ${ values[i]} `;
                    }

                }

                let stringQuery = "UPDATE `rssy_arboles_imagenes` SET " + toUpdate + " WHERE `id_imagen` = " + folioID + ""
                //res.send(stringQuery)
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
                                msg: "Se edito correctamente el folio " + folioID
                            })
                        }
                    }
                );
            }
        } else {
            res.status(201).json({
                msg: "No se envio un id valido a nuestra Base de datos."
            })
        }
    }

    /**
     * Eliminar algun registro de Taxonomia 
     * @async
     * @exports imagenArbolDelete
     * @param {*} req - Recibe en el URL solo el Folio necesario a eliminar.
     * @param {string} res - Si recibe un ID invalido manda error, si se encuentra correcto se elimna y manda un mensaje de que se elimino correctamente.
     */
    async imagenArbolDelete(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const folioID = req.params.folio;
        if (folioID !== undefined) {
            // DELETE FROM `rssy_arboles_imagenes` WHERE `rssy_arboles_imagenes`.`id_imagen` = 7275"
            let stringQuery = "DELETE FROM `rssy_arboles_imagenes` WHERE `rssy_arboles_imagenes`.`id_imagen` = " + folioID + ""
            connection.query(
                stringQuery,
                function (err, results, fields) {
                    if (err) {
                        res.status(501)
                        res.json({
                            msg: "Hubo un error en su petición, favor de intetar mas tarde"
                        })
                    }
                    if (results.affectedRows == 1) {
                        res.status(200)
                        res.json({
                            msg: "Se elimino correctamente la imagen de la base de datos."
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
     * Obtiene los datos con los que se relacionara con el nodo de arboles
     * @async
     * @exports inspeccionArbolesGetAll
     * del semestre que paso.
     * @param {*} req No recibe nada
     * @param {JSON} res Brinda id_captura, id_nodo (Relacionara con la otra BDD), id_red, fecha 
     */

    async inspeccionArbolesGetAll(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        let stringQuery = "SELECT * FROM `rssy_arboles_inspeccion` "
        connection.query(
            stringQuery,
            function (err, results, fields) {
                res.status(200)
                res.json(results)
            }
        );
    }

    /**
     * Obtiene todos los datos referentes al arbol
     * @async
     * @exports inventarioArbolesGetAll
     * @param {*} req No recibe ningun parametro
     * @param {string} res Responde con NID, id_taxonomia, Plantado, diametro, altura, valoracion, latitud, longitud, id_jardin e imagen.
     */

    async inventarioArbolesGetAll(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        let stringQuery = "SELECT * FROM `rssy_arboles_inventario` "
        connection.query(
            stringQuery,
            function (err, results, fields) {
                res.status(200)
                res.json(results)
            }
        );
    }


    /**
     * Crea un nuego registro para la parte de inventario de los arboles.
     * @async
     * @exports inventarioCreate
     * @param {JSON} req - Debe recibir en el Body un JSON de la forma 
     * {"id_taxonomia" : ####, (int 11) , (Hace relacion con la BDD de id taxonomia)
     * "Plantado" : "Año de plantado", (int 11)
     * "Diametro": "Diametro del arbol", (float)
     * "Altura": "Altura del arbol", (float)
     * "Valoracion": "Diametro del arbol", (int 4)
     * "Latitud" : "Donde se encuentra" , (varchar40)
     * "Longitud" : "Donde se encuentra" , (varchar40)
     * "id_jardin" : #### , (int 11)
     * "imagen" : "Ruta de la imagen" , (varchar 200)
     * }.
     * @param {string} res - Si se agrego, regresa un JSON con mensaje de correcto, si hubo un error se regresa un error en la petición.
     */

    async inventarioCreate(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const body = req.body;
        let NID = 1;
        const idTaxonomia = body.id_taxonomia;
        const Plantado = body.Plantado;
        const Diametro = body.Diametro;
        const Altura = body.Altura;
        const Valoracion = body.Valoracion;
        const Latitud = body.Latitud;
        const Longitud = body.Longitud;
        const id_jardin = body.id_jardin;
        const imagen = body.imagen;
        connection.query(
            "SELECT NID FROM `rssy_arboles_inventario` ORDER BY `NID` DESC LIMIT 1 ",
            function (err, results, field) {
                NID = results[0].NID + 1
                // res.send(results[0].NID)
                if (results !== undefined) {
                    //INSERT INTO `rssy_arboles_inventario` (`NID`, `id_taxonomia`, `Plantado`, `Diametro`, `Altura`, `Valoracion`, `Latitud`, `Longitud`, `id_jardin`, `imagen`) VALUES ('3768', '3', '2021', '23.0', '456.1', '15', '454465', '212231321', '1', 'hye.jpg') 
                    let stringQuery = "INSERT INTO `rssy_arboles_inventario` (`NID`, `id_taxonomia`, `Plantado`, `Diametro`, `Altura`, `Valoracion`, `Latitud`, `Longitud`, `id_jardin`, `imagen`) VALUES ('" + NID + "', '" + idTaxonomia + "', '" + Plantado + "'," +
                        "'" + Diametro + "', '" + Altura + "', '" + Valoracion + "', '" + Latitud + "', '" + Longitud + "', '" + id_jardin + "', '" + imagen + "') "
                    connection.query(
                        stringQuery,
                        function (err, results, fields) {
                            if (err) {
                                res.status(501)
                                res.json({
                                    msg: "Hubo un error en su petición, favor de verificar los datos agregados "
                                })

                            }
                            if (results.affectedRows == 1) {
                                res.status(200)
                                res.json({
                                    msg: "Se agrego satisfactoriametne el arbol agregado"
                                })
                            }
                        }
                    );

                } else {
                    res.status(202)
                    res.send("Hubo un error al momento de obtener el ultimo numero de la Base de datos, intente mas tarde.")
                }
            }
        )
    }


    /**
     * Obtiene todos los datos referentes al arbol que se busca
     * @async
     * @exports inventarioArbolGetSingle
     * @param {*} req No recibe ningun parametro
     * @param {JSON} res Responde con NID, id_taxonomia, Plantado, diametro, altura, valoracion, latitud, longitud, id_jardin e imagen.
     */

    async inventarioArbolGetSingle(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const folioID = req.params.folio;
        let stringQuery = "SELECT * FROM `rssy_arboles_inventario` WHERE `NID` = " + folioID
        connection.query(
            stringQuery,
            function (err, results, fields) {
                if (err) {
                    res.status(501)
                    res.json({
                        msg: "Hubo un error en su petición, favor de checar el folio del inventario"
                    })
                }
                if (results != undefined) {
                    res.status(200)
                    res.json(results)
                }
            }
        );
    }


    /**
     * Actualiza todos los datos que se manda en un body al arbol.
     * @async
     * @exports inventarioArbolEdit
     * @param {JSON} req Todo lo que recibe en un JSOn de NID, id_taxonomia, Plantado, diametro, altura, valoracion, latitud, longitud, id_jardin e imagen, es lo que actualiza.
     * @param {string} res Responde un mensaje de error o valdio dependiendo el caso.
     */

    async inventarioArbolEdit(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const folioID = req.params.folio;
        const body = req.body;
        if (req.params.folio !== undefined) {
            const folioID = req.params.folio;
            if (req.body !== undefined) {
                const bodyActualizaciones = req.body;
                let toUpdate = "";
                let objEntries = Object.keys(bodyActualizaciones);
                let values = Object.keys(bodyActualizaciones).map(e => bodyActualizaciones[e])
                for (let i = 0; i < objEntries.length; i++) {
                    if (i >= 1) {
                        toUpdate = toUpdate + " , ";
                    }
                    if (typeof (values[i]) == 'string') {
                        toUpdate = ` ${toUpdate} \`${Object.keys(bodyActualizaciones)[i]}\` =  "${ values[i]}" `;
                    }
                    if (typeof (values[i]) == 'number') {
                        toUpdate = ` ${toUpdate} \`${Object.keys(bodyActualizaciones)[i]}\` =  ${ values[i]} `;
                    }

                }

                let stringQuery = "UPDATE `rssy_arboles_inventario` SET " + toUpdate + " WHERE `NID` = " + folioID + ""
                //res.send(stringQuery)
                connection.query(
                    stringQuery,
                    function (err, results, fields) {
                        if (err) {
                            res.status(501)
                            res.json({
                                msg: "Hubo un error en su petición, favor de verificar los datos que agrego."
                            })
                        }
                        if (results.affectedRows == 1) {
                            res.status(200)
                            res.json({
                                msg: "Se edito correctamente el folio " + folioID + " respecto al inventario de arboles"
                            })
                        }
                    }
                );
            }
        } else {
            res.status(201).json({
                msg: "No se envio un id valido a nuestra Base de datos."
            })
        }
    }


    /**
     * Se plantea borrar un arbol del inventario pero se pidio que no existiera tal opcion.
     * @async
     * @exports inventarioArbolDelete
     * @param {*} req Recibe un folio al cual borrar.
     * @param {string} res Responde con un mensaje que no se puede eliminar un arbol.
     */

    async inventarioArbolDelete(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        let stringQuery = "SELECT * FROM `rssy_arboles_inventario` "
        connection.query(
            stringQuery,
            function (err, results, fields) {
                res.status(200)
                res.json({
                    msg: "Soy delete inventario, por el momento se quedara asi para no borar arboles"
                })
            }
        );
    }

    /**
     * Obtiene la informacion de todos los jardines.
     * @async
     * @exports jardinesArbolesGetAll
     * @param {*} req No recibe ningun parametro.
     * @param {JSON} res Responde con id_jardin y nombre.
     */

    async jardinesArbolesGetAll(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        let stringQuery = "SELECT * FROM `rssy_arboles_jardines` "
        connection.query(
            stringQuery,
            function (err, results, fields) {
                res.status(200)
                res.json(results)
            }
        );
    }

    /**
     * Se utilzia esta funcion como su nombre lo menciona que es para crear un nuevo Jardin.
     * @async
     * @exports jardinCreate
     * @param {JSON} req Recibe en un body todos los datos de jardin necesarios para crearlo 
     * {
     * "id_jardin" : ### (int 11), no es necesario mandarlo ya que se obtiene automaticamente
     * "nombre" : varchar(200)
     * }
     * @param {String} res Responde con un mensaje si salio correcto o cual es el error.
     */

    async jardinCreate(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const body = req.body;
        let idJardin = 1;
        const nombreJardin = body.nombre;
        connection.query(
            "SELECT id_jardin FROM `rssy_arboles_jardines` ORDER BY `id_jardin` DESC LIMIT 1 ",
            function (err, results, field) {
                idJardin = results[0].id_jardin + 1
                let stringQuery = "INSERT INTO `rssy_arboles_jardines` (`id_jardin`, `nombre`) VALUES ('" + idJardin + "', '" + nombreJardin + "');"
                connection.query(
                    stringQuery,
                    function (err, results, fields) {
                        if (err) {
                            res.status(501)
                            res.json({
                                msg: "Hubo un error en su petición, favor de verificar los datos agregados"
                            })

                        }
                        if (results.affectedRows == 1) {
                            res.status(200)
                            res.json({
                                msg: "Se agrego satisfactoriametne el jardin agregado"
                            })
                        }
                    }
                );
            }
        );
    }

    /**
     * Obtiene la informacion de los un jardin que se obtiene a traves del folio que se manda en el URL.
     * @async
     * @exports jardinGetSingle
     * @param {*} req No recibe ningun parametro
     * @param {JSON} res Responde con id_jardin y nombre si lo encuentra.
     */

    async jardinGetSingle(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const folioID = req.params.folio;
        let stringQuery = "SELECT * FROM `rssy_arboles_jardines` WHERE `id_jardin` = " + folioID
        connection.query(
            stringQuery,
            function (err, results, fields) {
                if (err) {
                    res.status(501)
                    res.json({
                        msg: "Hubo un error en su petición, favor de checar el folio del jardin"
                    })
                }
                if (results != undefined) {
                    res.status(200)
                    res.json(results)
                }
            }
        );
    }

    /**
     * Actualiza todos los datos que se manda en un body a jardin.
     * @async
     * @exports jardinEdit
     * @param {JSON} req Recibe en un body tipo JSON los datos a actualizar
     * @param {string} res Responde con mensaje si fue satisfactorio o hubo un error.
     */

    async jardinEdit(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        let stringQuery = "SELECT * FROM `rssy_arboles_jardines` "
        connection.query(
            stringQuery,
            function (err, results, fields) {
                res.status(200)
                res.json({
                    msg: "Es le update de Jardin falta implementar"
                })
            }
        );
    }

    /**
     * Funcion con el fin de eliminar jardines, no se implementara a peticion del profesor.
     * @async
     * @exports jardinDelete
     * @param {*} req No recibe ningun parametro.
     * @param {string} res Responde con un mensaje de que no se implementara.
     */

    async jardinDelete(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        let stringQuery = "SELECT * FROM `rssy_arboles_jardines` "
        connection.query(
            stringQuery,
            function (err, results, fields) {
                res.status(200)
                res.json({
                    msg: "Este es delete de Jardin, no se implementa por peticion del profesor."
                })
            }
        );
    }


    /**
     * Obtiene todos los nodos de los arboles.
     * @async
     * @exports nodosArbolesGetAll
     * @param {*} req No recibe ningun parametro.
     * @param {JSON} res Responde con id_nodo y NID.
     */

    async nodosArbolesGetAll(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        let stringQuery = "SELECT * FROM `rssy_arboles_nodos` "
        connection.query(
            stringQuery,
            function (err, results, fields) {
                res.status(200)
                res.json(results)
            }
        );
    }

    /**
     * Obtiene todas las rutas de los arboles
     * @async
     * @exports rutaArbolesGetAll
     * @param {*} req - No recibe ningun parametro
     * @param {JSON} res - Devuelve todas las rutas de los arboels en la BDD
     */

    async rutaArbolesGetAll(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        let stringQuery = "SELECT * FROM `rssy_arboles_ruta`  "
        connection.query(
            stringQuery,
            function (err, results, fields) {
                res.status(200)
                res.json(results)
            }
        );
    }


    /**
     * Obtiene el ID del ultimo arbol creado (Inventario).
     * @async
     * @exports InventarioLastCreated
     * @param {*} req - No recibe ningun parametro
     * @param {JSON} res - Devuelve el NID del ultimo arbol creado.
     */

    async InventarioLastCreated(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        let stringQuery = "SELECT `NID` FROM `rssy_arboles_inventario` ORDER BY `rssy_arboles_inventario`.`NID` DESC limit 1 "
        connection.query(
            stringQuery,
            function (err, results, fields) {
                if (err) {
                    res.status(500)
                    res.json({
                        msg: "Hubo un error en la base de datos, intente mas tarde."
                    })
                }
                res.status(200)
                res.json(results)
            }
        );
    }

    /**
     * Obtiene el arbol (inventario) buscado y a su vez da otras 3 opciones que le pueden gustar.
     * @async
     * @exports inventario3Random
     * @param {*} req No recibe nada
     * @param {JSON} res Responde con el arbol buscado y a su vez con otros 3 arboles aleatorios.
     */

    async inventario3Random(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const folioID = req.params.folio;
        let stringQuery = "SELECT * FROM `rssy_arboles_inventario` ORDER BY RAND() LIMIT 3"
        connection.query(
            stringQuery,
            function (err, results, fields) {
                if (err) {
                    res.status(501)
                    res.json({
                        msg: "Hubo un error en su petición, favor de checar el folio del inventario"
                    })
                }
                if (results != undefined) {
                    res.status(200)
                    res.json(results)
                }
            }
        );
    }

    /**
     * Obtiene los arboles del inventario segun el jardin que es solicitado.
     * @async
     * @exports inventarioJardin
     * @param {*} req - En el folio/URL viene el id del jardin solicitado
     * @param {JSON} res - Devuelve todas las rutas de los arboels en la BDD
     */
    async inventarioJardin(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const folioID = req.params.folio;
        // let stringQuery = "SELECT * FROM `rssy_arboles_jardines` WHERE `id_jardin` = " + folioID
        let stringQuery = "SELECT * FROM `rssy_arboles_inventario` where `id_jardin` = " + folioID
        connection.query(
            stringQuery,
            function (err, results, fields) {
                res.status(200)
                res.json(results)
            }
        );
    }

    /**
     * Obtiene todas las rutas de los arboles
     * @async
     * @exports inventarioTaxonomia
     * @param {*} req - No recibe ningun parametro
     * @param {JSON} res - Devuelve todas las rutas de los arboels en la BDD
     */

    async inventarioTaxonomia(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const folioID = req.params.folio;
        // let stringQuery = "SELECT * FROM `rssy_arboles_jardines` WHERE `id_jardin` = " + folioID
        let stringQuery = "SELECT * FROM `rssy_arboles_inventario` where `id_taxonomia` = " + folioID
        connection.query(
            stringQuery,
            function (err, results, fields) {
                res.status(200)
                res.json(results)
            }
        );
    }

    /**
     * Obtiene todas las rutas de los arboles
     * @async
     * @exports arbolesyJardinesGet
     * @param {*} req - No recibe ningun parametro
     * @param {JSON} res - Devuelve a petición , NID, id_taxonimia , id_jardin y nombre del jardin donde se encuentra en 1 solo query.
     */

    async arbolesyJardinesGet(req, res) {
        let query = {} // Search by name or uid
        let options = {} // Page or limit
        let projection = ""; // Which fields are wanted
        const folioID = req.params.folio;
        // let stringQuery = "SELECT * FROM `rssy_arboles_jardines` WHERE `id_jardin` = " + folioID
        let stringQuery = "SELECT NID, id_taxonomia, `rssy_arboles_jardines`.id_jardin, nombre  FROM `rssy_arboles_inventario` , `rssy_arboles_jardines`  WHERE `rssy_arboles_inventario`.id_jardin  = `rssy_arboles_jardines`.`id_jardin`"
        connection.query(
            stringQuery,
            function (err, results, fields) {
                res.status(200)
                res.json(results)
            }
        );
    }

}

const arbolesControllerClass = new arbolesController();
module.exports = arbolesControllerClass;