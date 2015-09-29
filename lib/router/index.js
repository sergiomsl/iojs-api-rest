'use strict'

import course from 'course'
import EmployeeController from '../employee'

const router = course()
const employeeCtrl = new EmployeeController()

router.all((req, res, next) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('x-ver', '1.0')
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
