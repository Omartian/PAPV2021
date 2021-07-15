import Heap from './Heap.js';

/**
 * Nos basamos en el trabajo de https://github.com/trekhleb/javascript-algorithms 
 * para la creacion del algoritmo dijktra.
 */

export default class MinHeap extends Heap {
  /**
   * 
   * Checa si el par es correcto, con nosotros en minheap
   * es bueno recordar que el item root siempre es el menor.
   *
   * @param {*} firstElement
   * @param {*} secondElement
   * @return {boolean}
   */
  pairIsInCorrectOrder(firstElement, secondElement) {
    return this.compare.lessThanOrEqual(firstElement, secondElement);
  }
}
