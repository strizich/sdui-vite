const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x)

const curry = fn => (...args) => fn.bind(null, ...args)

const toLowerCase = str => str.toLowerCase()

const map = curry((fn, arr) => arr.map(fn))

const join = curry((str, arr) => arr.join(str))

const split = curry((splitOn, str) => str.split(splitOn))

const toSlug = compose(
  encodeURIComponent,
  join('-'),
  map(toLowerCase),
  split(' ')
)

export { toSlug, compose, curry, map, toLowerCase, split, join }
