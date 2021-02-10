const minMax = (min, value, max) => {
  return Math.max(min, Math.min(value, max))
}

const pctComplete = (value, maxValue) => {
  return Number(Math.round(minMax(0, value / maxValue, 1) + 'e2') + 'e-2')
}

const quantizeValue = (value, step) => {
  return Number(Math.round(value / step) * step)
}

const convertValueToPx = (value, min, max, width) => {
  return minMax(0, Math.round((value - min) / (max - min) * width), width)
}

const singleUnitValue = (step, min, max, width) => {
  return minMax(0, Math.round((step) / (max - min) * width), width)
}

const convertToValue = (percentComplete, min, max) => {
  return min + percentComplete * (max - min)
}

export { quantizeValue, pctComplete, minMax, convertValueToPx, singleUnitValue, convertToValue }
