const takeRightUntil = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

takeRightUntil([1, 2, 3, 4], n => n < 3); // [3, 4]
