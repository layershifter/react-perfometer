function swap(data: number[], i, j) {
  if (i === j) {
    return;
  }
  const tmp = data[j];
  data[j] = data[i];
  data[i] = tmp;
}

function partition(data: number[], start, end) {
  let i, j;
  for (i = start + 1, j = start; i < end; i++) {
    if (data[i] < data[start]) {
      swap(data, i, ++j);
    }
  }
  swap(data, start, j);
  return j;
}

function findK(data: number[], start, end, k) {
  while (start < end) {
    const pos = partition(data, start, end);
    if (pos === k) {
      return data[k];
    }
    if (pos > k) {
      end = pos;
    } else {
      start = pos + 1;
    }
  }
}

// Calculate n-th percentile of 'data' using Nearest Rank Method
// http://en.wikipedia.org/wiki/Percentile#The_Nearest_Rank_method
export function percentile(data: number[], n: number): number {
  return findK(
    data.slice(),
    0,
    data.length,
    Math.ceil((data.length * n) / 100) - 1
  ) as number;
}
