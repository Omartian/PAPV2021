import GraphVertex from '../dataStructure/GraphVertex.js';
import GraphEdge from '../dataStructure/GraphEdge.js';
import Graph from '../dataStructure/Graph.js';
import dijkstra from './dijkstra.js';

let vertexA = new GraphVertex('A');
let vertexB = new GraphVertex('B');
let vertexC = new GraphVertex('C');
let vertexD = new GraphVertex('D');
let vertexE = new GraphVertex('E');
let vertexF = new GraphVertex('F');
let vertexG = new GraphVertex('G');
let vertexH = new GraphVertex('H');

let edgeAB = new GraphEdge(vertexA, vertexB, 4);
let edgeAE = new GraphEdge(vertexA, vertexE, 7);
let edgeAC = new GraphEdge(vertexA, vertexC, 3);
let edgeBC = new GraphEdge(vertexB, vertexC, 6);
let edgeBD = new GraphEdge(vertexB, vertexD, 5);
let edgeEC = new GraphEdge(vertexE, vertexC, 8);
let edgeED = new GraphEdge(vertexE, vertexD, 2);
let edgeDC = new GraphEdge(vertexD, vertexC, 11);
let edgeDG = new GraphEdge(vertexD, vertexG, 10);
let edgeDF = new GraphEdge(vertexD, vertexF, 2);
let edgeFG = new GraphEdge(vertexF, vertexG, 3);
let edgeEG = new GraphEdge(vertexE, vertexG, 5);

const graph = new Graph();
graph
  .addVertex(vertexH)
  .addEdge(edgeAB)
  .addEdge(edgeAE)
  .addEdge(edgeAC)
  .addEdge(edgeBC)
  .addEdge(edgeBD)
  .addEdge(edgeEC)
  .addEdge(edgeED)
  .addEdge(edgeDC)
  .addEdge(edgeDG)
  .addEdge(edgeDF)
  .addEdge(edgeFG)
  .addEdge(edgeEG);

let { distances, previousVertices } = dijkstra(graph, vertexA);

console.log(distances);




//  let vertexS = new GraphVertex('S');
// vertexE = new GraphVertex('E');
// vertexA = new GraphVertex('A');
//  vertexD = new GraphVertex('D');
//  vertexB = new GraphVertex('B');
//  vertexC = new GraphVertex('C');
//  vertexH = new GraphVertex('H');
// let edgeSE = new GraphEdge(vertexS, vertexE, 8);
// let edgeSA = new GraphEdge(vertexS, vertexA, 10);
// edgeED = new GraphEdge(vertexE, vertexD, 1);
// let edgeDA = new GraphEdge(vertexD, vertexA, -4);
// edgeDC = new GraphEdge(vertexD, vertexC, -1);
// edgeAC = new GraphEdge(vertexA, vertexC, 2);
// let edgeCB = new GraphEdge(vertexC, vertexB, -2);
// let edgeBA = new GraphEdge(vertexB, vertexA, 1);

// console.log(distances);

