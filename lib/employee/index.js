'use strict'

import jsonBody from 'body/json'
import { fail, jsonfy } from '../utils/helpers'
import Employee from './model'

class EmployeeController {

  // --  GET /employees --------------------------------------------------------

  getAll(req, res) {

    Employee
      .find({}, 'fullName picture')
      .then((employees) => {
        res.statusCode = 200
        res.end(jsonfy('OK', employees))
      })
  }

  // -- GET /employees/:employeeId ----------------------------------------------

  get(req, res) {
    let employeeId = this.employeeId

    Employee
      .findById(employeeId)
      .then((employee) => {

        if(employee) {
          res.statusCode = 200
          res.end(jsonfy('OK', employee))
        } else {
          res.statusCode = 404
          res.end(jsonfy(`Employee ${employeeId} does not exists`))
        }

      })
  }

  // -- POST /employees --------------------------------------------------------

  save(req, res) {

    jsonBody(req, res, (err, body) => {
      if (err) return fail(err, res)

      Employee
        .create(body)
        .then((employee) => {
          res.statusCode = 201
          res.end(jsonfy('OK', employee))
        })
    })
  }

  // -- DELETE /employees/:employeeId ------------------------------------------

  remove(req, res, next) {
    let employeeId = this.employeeId

    if (!employeeId) {
      res.statusCode = 404
      return next()
    }

    Employee
      .findOneAndRemove({ _id: employeeId })
      .then(() => {
        res.statusCode = 204
        res.end(jsonfy(`Employee ${employeeId} deleted succesfully`))
      })
  }

  // -- PUT /employees/:employeeId ---------------------------------------------

  update(req, res) {
    let employeeId = this.employeeId

    if (!employeeId) {
      res.statusCode = 404
      return next()
    }

    jsonBody(req, res, (err, body) => {
      if (err) return fail(err, res)
      let updatedEmployee = body

      Employee
        .findOneAndUpdate({ _id: employeeId }, updatedEmployee)
        .then((employee) => {
          res.statusCode = 200
          res.end(jsonfy(`Employee ${employeeId} updated succesfully`, employee))
        })
    })
  }
}

export default EmployeeController
