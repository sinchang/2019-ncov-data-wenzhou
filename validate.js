const json = require('./data.json')
const assert = require('assert')

const trend = json.trend

let sum = 0
const date = '2020-01-29'

for (const key in trend) {
  if (trend.hasOwnProperty(key) && key === date) {
    const items = trend[key];
    for (const item of items) {
      console.log(item.confirmedIncr, key, item.areaName)
      sum += item.confirmedIncr
    }
  }
}

assert(sum === 58)