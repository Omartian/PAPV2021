'use strict';
/* eslint-disable no-restricted-globals */
/**
 * Módulo del rutas de arboles, historico y bitacora.
 * Este archivo contiene todas las rutas para arboles, historico y bitacora.
 * @author Omar Perez Cano <is718089@iteso.mx>
 */

const router = require('express').Router();
const arbolesController = require('../controllers/arboles.controllers');

router.route('/tiposArboles')
    .get(arbolesController.taxonomiaArbolesGetAll)
    .post(arbolesController.taxonomiaCreate)

router.route('/tiposArboles/:folio')
    .get(arbolesController.taxonomiaGetSingle)
    .put(arbolesController.taxonomiaEdit)
    .delete(arbolesController.taxonomiaDelete)
    
router.route('/bitacoraArboles')
    .get(arbolesController.bitacoraArbolesGetAll)
    .post(arbolesController.bitacoraCreate)

router.route('/bitacoraArboles/:folio')
    .get(arbolesController.bitacoraGetSingle)
    .put(arbolesController.bitacoraEdit)
    .delete(arbolesController.bitacoraDelete)
    
router.route('/historicoArboles')
    .get(arbolesController.historicoArbolesGetAll)
    .post(arbolesController.historicoCreate)

router.route('/historicoArboles/:folio')
    .get(arbolesController.historicoGetSingle)
    .put(arbolesController.historicoEdit)
    .delete(arbolesController.historicoDelete)

    router.route('/tiposArboles/jadines/completo')
    .get(arbolesController.taxonomiaAndArboles)

router.route('/imagenes')
    .get(arbolesController.imagenesArbolesGetAll)
    .post(arbolesController.imagenArbolCreate)

router.route('/imagenes/:folio')
    .get(arbolesController.imagenArbolGetSingle)
    .put(arbolesController.imagenArbolEdit)
    .delete(arbolesController.imagenArbolDelete)

router.route('/inspeccion')
    .get(arbolesController.inspeccionArbolesGetAll)

router.route('/inventario')
    .get(arbolesController.inventarioArbolesGetAll)
    .post(arbolesController.inventarioCreate)

router.route('/inventario/:folio')
    .get(arbolesController.inventarioArbolGetSingle)
    .put(arbolesController.inventarioArbolEdit)
    .delete(arbolesController.inventarioArbolDelete)

router.route('/jardines')
    .get(arbolesController.jardinesArbolesGetAll)
    .post(arbolesController.jardinCreate)

router.route('/jardines/:folio')
    .get(arbolesController.jardinGetSingle)
    .put(arbolesController.jardinEdit)
    .delete(arbolesController.jardinDelete)

router.route('/getAllNodosArboles')
    .get(arbolesController.nodosArbolesGetAll)

router.route('/rutas')
    .get(arbolesController.rutaArbolesGetAll)

router.route('/lastCreated')
    .get(arbolesController.InventarioLastCreated)

router.route('/InventarioSearch')
    .get(arbolesController.inventario3Random)

router.route('/InventarioFilter/jardin/:folio')
    .get(arbolesController.inventarioJardin)

router.route('/InventarioFilter/taxonomia/:folio')
    .get(arbolesController.inventarioTaxonomia)

router.route('/arbolesyjardines')
    .get(arbolesController.arbolesyJardinesGet)

module.exports = router;