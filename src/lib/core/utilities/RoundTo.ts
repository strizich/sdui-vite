// https://stackoverflow.com/questions/15762768/javascript-math-round-to-two-decimal-places

export const roundTo = (n: any, digits: number): number => {
  let negative = false
  if (digits === undefined) {
    digits = 0
  }
  if (n < 0) {
    negative = true
    n = n * -1
  }
  const multiplicator = Math.pow(10, digits)
  n = parseFloat((n * multiplicator).toFixed(11))
  n = (Math.round(n) / multiplicator).toFixed(digits)
  if (negative) {
    n = parseFloat((n * -1).toFixed(digits))
  }
  return n;
}
