'use strict'

const R = require('ramda')

const func = R.curry((a, b) => [a, b])

// console.log(func(1, 2))
// console.log(func(1)(2))
// console.log(func(R.__, 2)(1))

function curry(fn, args) {
  const length = fn.length
  args = args || []

  return (...arg) => {
    args = args.concat(arg)
    console.log('args', args)
    if (args.length >= length) {
      return fn(...args)
    }
    return curry.call(null, fn, args)
  }
}

const func2 = curry((a, b, c) => [a, b, c])

console.log(func2(1, 2, 3))
// console.log(func2(1)(2)(3))
// console.log(func2(R.__, 2)(1)(3))

const check = (obj, key) => {
  if (typeof obj[key] === 'undefined') {
    return false
  }
  return true
}

const compose = (...fns) => (...args) =>
  fns.reduceRight((acc, val) => val(acc), fns[fns.length - 1](...args))

const composeTwoArgs = (a, b) => x => a(b(x))

const checkCurry = R.curry(check)

const fn = compose(R.not, checkCurry(global))

console.log(fn('use'))
console.log(global.use)

console.log(R.last([1, 2, 3]))
