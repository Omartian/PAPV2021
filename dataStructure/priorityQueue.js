import MinHeap from './MinHeap.js';
import Comparator from '../comparator/Comparator.js';

/**
 * Nos basamos en el trabajo de https://github.com/trekhleb/javascript-algorithms 
 * para la creacion del algoritmo dijktra.
 */

/**
 * Es parecido a minimun heap, excpeto que toma la prioridad del elemento
 * en vez de su valor
 */

export default class PriorityQueue extends MinHeap {
  constructor() {
    super();

    // Mapa de prioridades
    this.priorities = new Map();

    // Se utiliza el comparador para comparar prioridades en vez del elemento.
    this.compare = new Comparator(this.comparePriority.bind(this));
  }

  /**
   * Agregamos el item a la cola
   * @param {*} item - el item a agregar
   * @param {number} [priority] - Su prioridad, por default es 0
   * @return {PriorityQueue}
   */
  add(item, priority = 0) {
    this.priorities.set(item, priority);
    super.add(item);
    return this;
  }

  /**
   * Remueve el item
   * @param {*} item - 
   * @param {Comparator} [customFindingComparator] - funcion comparadora
   * @return {PriorityQueue}
   */
  remove(item, customFindingComparator) {
    super.remove(item, customFindingComparator);
    this.priorities.delete(item);
    return this;
  }

  /**
   * Cambia la prioridad del item
   * @param {*} item - item que vamos a cambiar su prioridad
   * @param {number} priority - La nueva prioridad
   * @return {PriorityQueue}
   */
  changePriority(item, priority) {
    this.remove(item, new Comparator(this.compareValue));
    this.add(item, priority);
    return this;
  }

  /**
   * Busca un arreglo de items que comple
   * @param {*} item
   * @return {Number[]}
   */
  findByValue(item) {
    return this.find(item, new Comparator(this.compareValue));
  }

  /**
   * Checa si el item existe actualmente
   * @param {*} item
   * @return {boolean}
   */
  hasValue(item) {
    return this.findByValue(item).length > 0;
  }

  /**
   * Comapra la prioridad e los items
   * @param {*} a
   * @param {*} b
   * @return {number}
   */
  comparePriority(a, b) {
    if (this.priorities.get(a) === this.priorities.get(b)) {
      return 0;
    }
    return this.priorities.get(a) < this.priorities.get(b) ? -1 : 1;
  }

  /**
   * Comapra los valores de los items.
   * @param {*} a
   * @param {*} b
   * @return {number}
   */
  compareValue(a, b) {
    if (a === b) {
      return 0;
    }
    return a < b ? -1 : 1;
  }
}
