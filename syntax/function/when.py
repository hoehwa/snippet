def when(predicate, when_true):
  return lambda x: when_true(x) if predicate(x) else x

double_even_numbers = when(lambda x: x % 2 == 0, lambda x : x * 2)
double_even_numbers(2) # 4
double_even_numbers(1) # 1
