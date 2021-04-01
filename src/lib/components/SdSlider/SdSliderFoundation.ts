import { roundTo } from '../../core/utilities/RoundTo'

const minMax = (min: number, value: number, max: number): number => {
  return Math.max(min, Math.min(value, max))
}

const pctComplete = (value: number, maxValue: number) => {
  return roundTo(minMax(0, value / maxValue, 1), 2)
}

const quantizeValue = (value: number, step:number) => {
  return Number(Math.round(value / step) * step)
}

const convertValueToPx = (value: number, min: number, max:number, width:number): number => {
  return minMax(0, Math.round((value - min) / (max - min) * width), width)
}

const singleUnitValue = (step: number, min:number, max:number, width: number): number => {
  return minMax(0, Math.round((step) / (max - min) * width), width)
}

const convertToValue = (percentComplete: number, min: number, max: number) => {
  return min + percentComplete * (max - min)
}

export { quantizeValue, pctComplete, minMax, convertValueToPx, singleUnitValue, convertToValue }
