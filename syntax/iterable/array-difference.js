const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};

difference([1, 2, 3, 3], [1, 2, 4]); // [3, 3]
