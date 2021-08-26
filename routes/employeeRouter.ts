import express from 'express'
import  query  from '../modules/query';
import excelExport from 'excel-export'
var router = express.Router();

let queryAllSQL = `SELECT employee.*, level.level, department.department
    FROM employee, level, department
    WHERE
        employee.levelId = level.id AND
        employee.departmentId = department.id
    `
/**
 * @swagger
 * definitions:
 *   employee:
 *     properties:
 *       name:
 *         type: string
 *       levelId:
 *         type: string
 *       departmentId:
 *         type: string
 *       hiredate:
 *         type: string
 */

/**
 * @swagger
 * /api/employee/getEmployee:
 *   get:
 *     tags:
 *       - Puppies
 *     description: Returns all puppies
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: employsee's name
 *         in: query
 *         required: false
 *         type: string
 *       - name: departmentId
 *         description: employsee's departmentId
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: An array of puppies
 *         schema:
 *           $ref: '#/definitions/employee'
 */
router.get('/getEmployee', async function(req, res, next) {
  let { name = '', departmentId } = req.query
  let conditions = `AND employee.name LIKE '%${name}%'`
  if(departmentId) {
    conditions += ` AND employee.departmentId=${departmentId}`
  }
  let sql = `${queryAllSQL} ${conditions} ORDER BY employee.id DESC`
  try {
    let result = await query(sql)
    result.forEach((i: any) => {
      i.key = i.id
    })
    res.json({
      flag: 0,
      data: result
    })
  } catch(e) {
    res.json({
      flag: 1,
      msg: e.toString()
    })
  }
  
});
/**
 * @swagger
 * /api/employee/createEmployee:
 *   post:
 *     tags:
 *       - employee
 *     description: Creates a new employee
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: employee
 *         description: employee object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/employee'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/createEmployee', async function(req, res, next) {
  let { name, departmentId, hiredate, levelId } = req.body
  let sql = `INSERT INTO employee (name, departmentId, hiredate, levelId)
      VALUES ('${name}', '${departmentId}', '${hiredate}', '${levelId}')
  `
  try {
    let result = await query(sql)
    
    res.json({
      flag: 0,
      data: {
        key: result.insertId,
        id: result.insertId
      }
    })
  } catch(e) {
    res.json({
      flag: 1,
      msg: e.toString()
    })
  }
});


let conf: excelExport.Config = {
  cols: [
    { caption: '员工ID', type: 'number' },
    { caption: '姓名', type: 'string' },
    { caption: '部门', type: 'string' },
    { caption: '入职时间', type: 'string' },
    { caption: '职级', type: 'string' }
  ],
  rows: []
}

/**
 * @swagger
 * /api/employee/downloadEmployee:
 *   get:
 *     tags:
 *       - Puppies
 *     description: downloadEmployee
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 */
router.get('/downloadEmployee', async (req, res) => {
  try{
    let result = await query(queryAllSQL)
    conf.rows = result.map((i: any) => {
      return [ i.id, i.name, i.department, i.hiredate, i.level]
    })
    let excel = excelExport.execute(conf)
    res.setHeader('Content-Type', 'application/vnd.openxmlformats')
    res.setHeader('Content-Disposition', 'attachment;filename=Employee.xlsx')
    res.end(excel, 'binary')
  }catch(e){
    res.send(e.toString())
  }
})

export default router