export function add(numbers: Array<number>) {
  let result = 0
  for (const number of numbers) {
    result += number
  }
  return result
}
