from collections import defaultdict

def frequencies(lst):
  freq = defaultdict(int)
  for val in lst:
    freq[val] += 1
  return dict(freq)

frequencies(['a', 'b', 'a', 'c', 'a', 'a', 'b']) # { 'a': 4, 'b': 2, 'c': 1 }
