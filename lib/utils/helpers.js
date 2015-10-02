'use strict'

function fail (err, res) {
  res.statusCode = 500
  res.setHeader('Content-Type', 'text/plain')
  res.end(err.message)
}

function jsonfy (data) {
  return JSON.stringify({
    data    : data
  })
}

export {fail, jsonfy}
