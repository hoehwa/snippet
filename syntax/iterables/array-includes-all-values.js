const includesAll = (arr, values) => values.every(v => arr.includes(v));

includesAll([1, 2, 3, 4], [1, 4]); // true
includesAll([1, 2, 3, 4], [1, 5]); // false
