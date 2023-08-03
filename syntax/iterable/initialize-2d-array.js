const initialize2DArray = (w, h, val = null) =>
  Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));

initialize2DArray(2, 2, 0); // [[0, 0], [0, 0]]
