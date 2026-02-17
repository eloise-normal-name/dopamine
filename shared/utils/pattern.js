/**
 * Pattern Detection Module
 * 
 * Provides functions to detect winning patterns in slot machine grids.
 * Supports 5 pattern types: linear, scatter, cluster, shape, transform.
 * 
 * Grid format: 2D array where grid[row][col] = symbol
 * Example: [['A','B','C'], ['A','A','C'], ['B','A','C']]
 */

/**
 * Detects linear patterns (horizontal, vertical, diagonal)
 * @param {string[][]} grid - 2D array of symbols
 * @param {number} minMatch - Minimum consecutive symbols required (default: 3)
 * @returns {Object[]} Array of pattern matches with type, positions, symbol
 */
export function detectLinear(grid, minMatch = 3) {
  if (!grid || grid.length === 0 || grid[0].length === 0) {
    return [];
  }

  const matches = [];
  const rows = grid.length;
  const cols = grid[0].length;

  // Check horizontal lines
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col <= cols - minMatch; col++) {
      const symbol = grid[row][col];
      if (!symbol) continue;

      let matchCount = 1;
      const positions = [[row, col]];

      for (let i = col + 1; i < cols; i++) {
        if (grid[row][i] === symbol) {
          matchCount++;
          positions.push([row, i]);
        } else {
          break;
        }
      }

      if (matchCount >= minMatch) {
        matches.push({
          type: 'linear-horizontal',
          symbol,
          positions,
          count: matchCount
        });
      }
    }
  }

  // Check vertical lines
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row <= rows - minMatch; row++) {
      const symbol = grid[row][col];
      if (!symbol) continue;

      let matchCount = 1;
      const positions = [[row, col]];

      for (let i = row + 1; i < rows; i++) {
        if (grid[i][col] === symbol) {
          matchCount++;
          positions.push([i, col]);
        } else {
          break;
        }
      }

      if (matchCount >= minMatch) {
        matches.push({
          type: 'linear-vertical',
          symbol,
          positions,
          count: matchCount
        });
      }
    }
  }

  // Check diagonal lines (top-left to bottom-right)
  for (let row = 0; row <= rows - minMatch; row++) {
    for (let col = 0; col <= cols - minMatch; col++) {
      const symbol = grid[row][col];
      if (!symbol) continue;

      let matchCount = 1;
      const positions = [[row, col]];

      for (let i = 1; i < Math.min(rows - row, cols - col); i++) {
        if (grid[row + i][col + i] === symbol) {
          matchCount++;
          positions.push([row + i, col + i]);
        } else {
          break;
        }
      }

      if (matchCount >= minMatch) {
        matches.push({
          type: 'linear-diagonal',
          symbol,
          positions,
          count: matchCount
        });
      }
    }
  }

  // Check diagonal lines (top-right to bottom-left)
  for (let row = 0; row <= rows - minMatch; row++) {
    for (let col = minMatch - 1; col < cols; col++) {
      const symbol = grid[row][col];
      if (!symbol) continue;

      let matchCount = 1;
      const positions = [[row, col]];

      for (let i = 1; i < Math.min(rows - row, col + 1); i++) {
        if (grid[row + i][col - i] === symbol) {
          matchCount++;
          positions.push([row + i, col - i]);
        } else {
          break;
        }
      }

      if (matchCount >= minMatch) {
        matches.push({
          type: 'linear-diagonal',
          symbol,
          positions,
          count: matchCount
        });
      }
    }
  }

  return matches;
}

/**
 * Detects scatter patterns (symbol appears N times anywhere on grid)
 * @param {string[][]} grid - 2D array of symbols
 * @param {number} minCount - Minimum occurrences required (default: 3)
 * @returns {Object[]} Array of scatter matches with symbol, positions, count
 */
export function detectScatter(grid, minCount = 3) {
  if (!grid || grid.length === 0 || grid[0].length === 0) {
    return [];
  }

  const symbolCounts = {};
  const rows = grid.length;
  const cols = grid[0].length;

  // Count all symbol occurrences
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const symbol = grid[row][col];
      if (!symbol) continue;

      if (!symbolCounts[symbol]) {
        symbolCounts[symbol] = {
          count: 0,
          positions: []
        };
      }
      symbolCounts[symbol].count++;
      symbolCounts[symbol].positions.push([row, col]);
    }
  }

  // Find symbols that meet minimum count
  const matches = [];
  for (const [symbol, data] of Object.entries(symbolCounts)) {
    if (data.count >= minCount) {
      matches.push({
        type: 'scatter',
        symbol,
        positions: data.positions,
        count: data.count
      });
    }
  }

  return matches;
}

/**
 * Detects cluster patterns (adjacent symbols forming groups)
 * @param {string[][]} grid - 2D array of symbols
 * @param {number} minSize - Minimum cluster size (default: 4)
 * @returns {Object[]} Array of cluster matches with symbol, positions, size
 */
export function detectCluster(grid, minSize = 4) {
  if (!grid || grid.length === 0 || grid[0].length === 0) {
    return [];
  }

  const matches = [];
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = Array(rows).fill(null).map(() => Array(cols).fill(false));

  // Flood fill to find clusters
  function floodFill(row, col, symbol) {
    if (row < 0 || row >= rows || col < 0 || col >= cols) {
      return [];
    }
    if (visited[row][col] || grid[row][col] !== symbol) {
      return [];
    }

    visited[row][col] = true;
    let positions = [[row, col]];

    // Check all 4 adjacent cells (not diagonal)
    positions = positions.concat(floodFill(row - 1, col, symbol));
    positions = positions.concat(floodFill(row + 1, col, symbol));
    positions = positions.concat(floodFill(row, col - 1, symbol));
    positions = positions.concat(floodFill(row, col + 1, symbol));

    return positions;
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const symbol = grid[row][col];
      if (!symbol || visited[row][col]) continue;

      const cluster = floodFill(row, col, symbol);
      if (cluster.length >= minSize) {
        matches.push({
          type: 'cluster',
          symbol,
          positions: cluster,
          size: cluster.length
        });
      }
    }
  }

  return matches;
}

/**
 * Detects shape patterns (L-shape, T-shape, etc.)
 * @param {string[][]} grid - 2D array of symbols
 * @returns {Object[]} Array of shape matches with type, symbol, positions
 */
export function detectShape(grid) {
  if (!grid || grid.length === 0 || grid[0].length === 0) {
    return [];
  }

  const matches = [];
  const rows = grid.length;
  const cols = grid[0].length;

  // L-shape patterns (4 orientations)
  const lShapes = [
    [[0, 0], [1, 0], [2, 0], [2, 1]], // L
    [[0, 0], [0, 1], [0, 2], [1, 0]], // Γ (rotated L)
    [[0, 0], [0, 1], [1, 1], [2, 1]], // ⌐ (flipped L)
    [[0, 2], [1, 0], [1, 1], [1, 2]]  // ⌙ (upside-down L)
  ];

  // T-shape patterns (4 orientations)
  const tShapes = [
    [[0, 0], [0, 1], [0, 2], [1, 1]], // T
    [[0, 1], [1, 0], [1, 1], [2, 1]], // ⊢ (rotated T)
    [[0, 1], [1, 0], [1, 1], [1, 2]], // ⊥ (upside-down T)
    [[0, 0], [1, 0], [1, 1], [2, 0]]  // ⊣ (rotated T)
  ];

  // Check L-shapes
  for (let row = 0; row < rows - 2; row++) {
    for (let col = 0; col < cols - 1; col++) {
      for (const shape of lShapes) {
        const positions = shape.map(([r, c]) => [row + r, col + c]);
        if (positions.every(([r, c]) => r < rows && c < cols)) {
          const symbols = positions.map(([r, c]) => grid[r][c]);
          if (symbols.every(s => s && s === symbols[0])) {
            matches.push({
              type: 'shape-L',
              symbol: symbols[0],
              positions
            });
          }
        }
      }
    }
  }

  // Check T-shapes
  for (let row = 0; row < rows - 2; row++) {
    for (let col = 0; col < cols - 2; col++) {
      for (const shape of tShapes) {
        const positions = shape.map(([r, c]) => [row + r, col + c]);
        if (positions.every(([r, c]) => r < rows && c < cols)) {
          const symbols = positions.map(([r, c]) => grid[r][c]);
          if (symbols.every(s => s && s === symbols[0])) {
            matches.push({
              type: 'shape-T',
              symbol: symbols[0],
              positions
            });
          }
        }
      }
    }
  }

  return matches;
}

/**
 * Detects transform patterns (symbol evolution across reels/columns)
 * @param {string[][]} grid - 2D array of symbols
 * @param {Object} transformRules - Map of symbol transformations, e.g., {'A': 'B', 'B': 'C'}
 * @returns {Object[]} Array of transform matches
 */
export function detectTransform(grid, transformRules = {}) {
  if (!grid || grid.length === 0 || grid[0].length === 0) {
    return [];
  }

  const matches = [];
  const rows = grid.length;
  const cols = grid[0].length;

  // Check for transformation chains across columns (reels)
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols - 1; col++) {
      const symbol = grid[row][col];
      if (!symbol || !transformRules[symbol]) continue;

      const positions = [[row, col]];
      let currentSymbol = symbol;

      // Follow transformation chain
      for (let nextCol = col + 1; nextCol < cols; nextCol++) {
        const expectedSymbol = transformRules[currentSymbol];
        if (grid[row][nextCol] === expectedSymbol) {
          positions.push([row, nextCol]);
          currentSymbol = expectedSymbol;
        } else {
          break;
        }
      }

      if (positions.length >= 2) {
        matches.push({
          type: 'transform',
          startSymbol: symbol,
          endSymbol: currentSymbol,
          positions,
          length: positions.length
        });
      }
    }
  }

  return matches;
}
