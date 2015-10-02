'use strict'

import course from 'course'
import EmployeeController from '../employee'

const router = course()
const employeeCtrl = new EmployeeController()

router.all((req, res, next) => {
  res.statusCode = 200
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*')
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)
  // Pass to next layer of middleware
  next()
})

router.get('/', (req, res) => {
  res.end('Welcome to Employee API REST')
})

router.get('/employees',                employeeCtrl.getAll)
router.get('/employees/:employeeId',    employeeCtrl.get)
router.post('/employees',               employeeCtrl.save)
router.delete('/employees/:employeeId', employeeCtrl.remove)
router.put('/employees/:employeeId',    employeeCtrl.update)

function onRequest (req, res) {
  router(req, res, (err) => {
    if (err) return fail(err, res)

    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end(`404 Not Found: ${req.url}`)
  })
}

export default onRequest
