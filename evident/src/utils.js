export function formatName(obj = {}) {
  let res = ''

  for (let [key, value] of Object.entries(obj)) {
    res += value + ' '
  }

  return res
}

export function formatDOB(time) {
  let res = null
  res = time.split('T')[0]
  return res
}

export function flatObj() {
  let flat = {}
  return function flatten(obj = {}) {
    for (let ele in obj) {
      if (obj.hasOwnProperty(ele)) {
        if (typeof obj[ele] === 'object') {
          flatten(obj[ele])
        } else {
          flat[ele] = obj[ele]
        }
      }
    }
    return flat
  }
}

export const getPropByString = (obj, propString) => {
  if (!propString) return obj

  var prop,
    props = propString.split('.')

  for (var i = 0, iLen = props.length - 1; i < iLen; i++) {
    prop = props[i]

    var candidate = obj[prop]
    if (candidate !== undefined) {
      obj = candidate
    } else {
      break
    }
  }
  return obj && obj[props[i]]
}
