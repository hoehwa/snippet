const any = (arr, fn = Boolean) => arr.some(fn);

any([0, 1, 2, 0], x => x >= 2); // true
any([0, 0, 1, 0]); // true
