/**
 * Pattern Detection Tests
 * 
 * Unit tests for pattern.js using Node.js built-in assert module.
 * Run with: node shared/utils/pattern.test.js
 * 
 * Tests all 5 pattern types with explicit test grids and expected outcomes.
 */

import assert from 'assert';
import {
  detectLinear,
  detectScatter,
  detectCluster,
  detectShape,
  detectTransform
} from './pattern.js';

// Test utilities
let testsPassed = 0;
let testsFailed = 0;

function test(description, fn) {
  try {
    fn();
    testsPassed++;
    console.log(`✓ ${description}`);
  } catch (error) {
    testsFailed++;
    console.error(`✗ ${description}`);
    console.error(`  ${error.message}`);
  }
}

// ====================
// Linear Pattern Tests
// ====================

test('detectLinear: horizontal 3-match', () => {
  const grid = [
    ['A', 'A', 'A', 'B'],
    ['C', 'D', 'E', 'F'],
    ['G', 'H', 'I', 'J']
  ];
  const matches = detectLinear(grid, 3);
  assert.strictEqual(matches.length, 1);
  assert.strictEqual(matches[0].type, 'linear-horizontal');
  assert.strictEqual(matches[0].symbol, 'A');
  assert.strictEqual(matches[0].count, 3);
});

test('detectLinear: vertical 3-match', () => {
  const grid = [
    ['A', 'B', 'C'],
    ['A', 'D', 'E'],
    ['A', 'F', 'G']
  ];
  const matches = detectLinear(grid, 3);
  assert.strictEqual(matches.length, 1);
  assert.strictEqual(matches[0].type, 'linear-vertical');
  assert.strictEqual(matches[0].symbol, 'A');
  assert.strictEqual(matches[0].count, 3);
});

test('detectLinear: diagonal 3-match (TL to BR)', () => {
  const grid = [
    ['A', 'B', 'C'],
    ['D', 'A', 'E'],
    ['F', 'G', 'A']
  ];
  const matches = detectLinear(grid, 3);
  assert.strictEqual(matches.length, 1);
  assert.strictEqual(matches[0].type, 'linear-diagonal');
  assert.strictEqual(matches[0].symbol, 'A');
  assert.strictEqual(matches[0].count, 3);
});

test('detectLinear: diagonal 3-match (TR to BL)', () => {
  const grid = [
    ['A', 'B', 'C'],
    ['D', 'C', 'E'],
    ['C', 'F', 'G']
  ];
  const matches = detectLinear(grid, 3);
  assert.strictEqual(matches.length, 1);
  assert.strictEqual(matches[0].type, 'linear-diagonal');
  assert.strictEqual(matches[0].symbol, 'C');
  assert.strictEqual(matches[0].count, 3);
});

test('detectLinear: no match when below minimum', () => {
  const grid = [
    ['A', 'A', 'B'],
    ['C', 'D', 'E'],
    ['F', 'G', 'H']
  ];
  const matches = detectLinear(grid, 3);
  assert.strictEqual(matches.length, 0);
});

test('detectLinear: multiple matches in same grid', () => {
  const grid = [
    ['A', 'A', 'A'],
    ['B', 'B', 'B'],
    ['C', 'D', 'E']
  ];
  const matches = detectLinear(grid, 3);
  assert.strictEqual(matches.length, 2);
  assert.strictEqual(matches[0].symbol, 'A');
  assert.strictEqual(matches[1].symbol, 'B');
});

test('detectLinear: empty grid', () => {
  const grid = [];
  const matches = detectLinear(grid, 3);
  assert.strictEqual(matches.length, 0);
});

// ====================
// Scatter Pattern Tests
// ====================

test('detectScatter: 3 symbols scattered', () => {
  const grid = [
    ['A', 'B', 'C'],
    ['D', 'A', 'E'],
    ['F', 'G', 'A']
  ];
  const matches = detectScatter(grid, 3);
  assert.strictEqual(matches.length, 1);
  assert.strictEqual(matches[0].type, 'scatter');
  assert.strictEqual(matches[0].symbol, 'A');
  assert.strictEqual(matches[0].count, 3);
});

test('detectScatter: multiple scatter patterns', () => {
  const grid = [
    ['A', 'B', 'A'],
    ['B', 'A', 'B'],
    ['C', 'D', 'E']
  ];
  const matches = detectScatter(grid, 3);
  assert.strictEqual(matches.length, 2);
  const symbolsMatched = matches.map(m => m.symbol).sort();
  assert.deepStrictEqual(symbolsMatched, ['A', 'B']);
});

test('detectScatter: no match when below minimum', () => {
  const grid = [
    ['A', 'B', 'C'],
    ['D', 'A', 'E'],
    ['F', 'G', 'H']
  ];
  const matches = detectScatter(grid, 3);
  assert.strictEqual(matches.length, 0);
});

test('detectScatter: all symbols same', () => {
  const grid = [
    ['A', 'A', 'A'],
    ['A', 'A', 'A']
  ];
  const matches = detectScatter(grid, 3);
  assert.strictEqual(matches.length, 1);
  assert.strictEqual(matches[0].count, 6);
});

// ====================
// Cluster Pattern Tests
// ====================

test('detectCluster: 4-symbol cluster', () => {
  const grid = [
    ['A', 'A', 'B'],
    ['A', 'A', 'C'],
    ['D', 'E', 'F']
  ];
  const matches = detectCluster(grid, 4);
  assert.strictEqual(matches.length, 1);
  assert.strictEqual(matches[0].type, 'cluster');
  assert.strictEqual(matches[0].symbol, 'A');
  assert.strictEqual(matches[0].size, 4);
});

test('detectCluster: L-shaped cluster', () => {
  const grid = [
    ['A', 'B', 'C'],
    ['A', 'D', 'E'],
    ['A', 'A', 'F']
  ];
  const matches = detectCluster(grid, 4);
  assert.strictEqual(matches.length, 1);
  assert.strictEqual(matches[0].symbol, 'A');
  assert.strictEqual(matches[0].size, 4);
});

test('detectCluster: no cluster when isolated', () => {
  const grid = [
    ['A', 'B', 'A'],
    ['B', 'A', 'B'],
    ['A', 'B', 'A']
  ];
  const matches = detectCluster(grid, 4);
  assert.strictEqual(matches.length, 0);
});

test('detectCluster: large cluster', () => {
  const grid = [
    ['A', 'A', 'A'],
    ['A', 'A', 'B'],
    ['A', 'C', 'D']
  ];
  const matches = detectCluster(grid, 4);
  assert.strictEqual(matches.length, 1);
  assert.strictEqual(matches[0].size, 6);
});

test('detectCluster: multiple separate clusters', () => {
  const grid = [
    ['A', 'A', 'B', 'B'],
    ['A', 'A', 'B', 'B']
  ];
  const matches = detectCluster(grid, 4);
  assert.strictEqual(matches.length, 2);
});

// =================
// Shape Pattern Tests
// =================

test('detectShape: L-shape pattern', () => {
  const grid = [
    ['A', 'B', 'C'],
    ['A', 'D', 'E'],
    ['A', 'A', 'F']
  ];
  const matches = detectShape(grid);
  assert.ok(matches.length > 0);
  assert.ok(matches.some(m => m.type === 'shape-L' && m.symbol === 'A'));
});

test('detectShape: T-shape pattern', () => {
  const grid = [
    ['A', 'A', 'A'],
    ['B', 'A', 'C'],
    ['D', 'E', 'F']
  ];
  const matches = detectShape(grid);
  assert.ok(matches.length > 0);
  assert.ok(matches.some(m => m.type === 'shape-T' && m.symbol === 'A'));
});

test('detectShape: no shape patterns', () => {
  const grid = [
    ['A', 'B', 'C'],
    ['D', 'E', 'F'],
    ['G', 'H', 'I']
  ];
  const matches = detectShape(grid);
  assert.strictEqual(matches.length, 0);
});

test('detectShape: grid too small for shapes', () => {
  const grid = [
    ['A', 'A'],
    ['A', 'B']
  ];
  const matches = detectShape(grid);
  assert.strictEqual(matches.length, 0);
});

// ======================
// Transform Pattern Tests
// ======================

test('detectTransform: simple transformation chain', () => {
  const grid = [
    ['A', 'B', 'C', 'D'],
    ['E', 'F', 'G', 'H']
  ];
  const transformRules = { 'A': 'B', 'B': 'C', 'C': 'D' };
  const matches = detectTransform(grid, transformRules);
  // Detects overlapping chains: A->B->C->D, B->C->D, C->D
  assert.strictEqual(matches.length, 3);
  assert.strictEqual(matches[0].type, 'transform');
  assert.strictEqual(matches[0].startSymbol, 'A');
  assert.strictEqual(matches[0].endSymbol, 'D');
  assert.strictEqual(matches[0].length, 4);
});

test('detectTransform: partial transformation', () => {
  const grid = [
    ['A', 'B', 'X'],
    ['D', 'E', 'F']
  ];
  const transformRules = { 'A': 'B', 'B': 'C' };
  const matches = detectTransform(grid, transformRules);
  assert.strictEqual(matches.length, 1);
  assert.strictEqual(matches[0].startSymbol, 'A');
  assert.strictEqual(matches[0].endSymbol, 'B');
  assert.strictEqual(matches[0].length, 2);
});

test('detectTransform: no transformation rules', () => {
  const grid = [
    ['A', 'B', 'C'],
    ['D', 'E', 'F']
  ];
  const matches = detectTransform(grid, {});
  assert.strictEqual(matches.length, 0);
});

test('detectTransform: no matching transformations', () => {
  const grid = [
    ['A', 'C', 'E'],
    ['B', 'D', 'F']
  ];
  const transformRules = { 'A': 'B', 'C': 'D' };
  const matches = detectTransform(grid, transformRules);
  assert.strictEqual(matches.length, 0);
});

test('detectTransform: multiple transformation chains', () => {
  const grid = [
    ['A', 'B', 'C'],
    ['X', 'Y', 'Z']
  ];
  const transformRules = { 'A': 'B', 'B': 'C', 'X': 'Y', 'Y': 'Z' };
  const matches = detectTransform(grid, transformRules);
  // Detects overlapping chains in both rows: A->B->C, B->C, X->Y->Z, Y->Z
  assert.strictEqual(matches.length, 4);
});

// ======================
// Edge Cases and Integration
// ======================

test('detectLinear: null grid', () => {
  const matches = detectLinear(null, 3);
  assert.strictEqual(matches.length, 0);
});

test('detectScatter: grid with null symbols', () => {
  const grid = [
    ['A', null, 'A'],
    [null, 'A', null],
    ['B', 'B', 'C']
  ];
  const matches = detectScatter(grid, 3);
  assert.strictEqual(matches.length, 1);
  assert.strictEqual(matches[0].symbol, 'A');
});

test('detectCluster: grid with empty strings', () => {
  const grid = [
    ['A', '', 'A'],
    ['A', 'A', ''],
    ['', '', 'B']
  ];
  const matches = detectCluster(grid, 4);
  // Empty strings are treated as null/falsy and break adjacency
  // Only 3 A's are adjacent (positions [1,0], [1,1], [0,0]), not enough for minSize 4
  assert.strictEqual(matches.length, 0);
});

test('integration: grid with multiple pattern types', () => {
  const grid = [
    ['A', 'A', 'A', 'B'],
    ['A', 'C', 'D', 'E'],
    ['A', 'F', 'G', 'H']
  ];
  
  const linear = detectLinear(grid, 3);
  const scatter = detectScatter(grid, 3);
  const cluster = detectCluster(grid, 4);
  
  // Should detect horizontal line AND vertical line AND scatter AND cluster
  assert.ok(linear.length >= 2, 'Should detect multiple linear patterns');
  assert.ok(scatter.length >= 1, 'Should detect scatter pattern');
  assert.ok(cluster.length >= 1, 'Should detect cluster pattern');
});

// Run summary
console.log('\n' + '='.repeat(50));
console.log(`Tests completed: ${testsPassed + testsFailed}`);
console.log(`Passed: ${testsPassed}`);
console.log(`Failed: ${testsFailed}`);
console.log('='.repeat(50));

if (testsFailed > 0) {
  process.exit(1);
}
