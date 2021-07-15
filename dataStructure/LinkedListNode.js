
/**
 * Nos basamos en el trabajo de https://github.com/trekhleb/javascript-algorithms 
 * para la creacion del algoritmo dijktra.
 */


/**
 * Clase base para los nodos de una linked list.
 */
export default class LinkedListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }

  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
